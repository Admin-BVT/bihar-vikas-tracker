'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

type Project = {
  id: string
  name: string
  district: string
  category: string
  status: string
  description?: string | null
}

export default function SearchClient({ projects }: { projects: Project[] }) {

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const categories = useMemo(() => {
    return [...new Set(projects.map(p => p.category).filter(Boolean))].sort()
  }, [projects])

  const districts = useMemo(() => {
    return [...new Set(projects.map(p => p.district).filter(Boolean))].sort()
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        searchQuery === '' ||
        project.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.district?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDistrict =
        selectedDistrict === 'all' ||
        project.district === selectedDistrict

      const matchesCategory =
        selectedCategory === 'all' ||
        project.category === selectedCategory

      const matchesStatus =
        selectedStatus === 'all' ||
        project.status === selectedStatus

      return matchesSearch && matchesDistrict && matchesCategory && matchesStatus
    })
  }, [projects, searchQuery, selectedDistrict, selectedCategory, selectedStatus])

  return (
    <div className="min-h-screen bg-black">

      {/* HEADER */}
      <section className="bg-gradient-to-br from-[#1B263B] to-[#415A77] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="text-4xl font-black text-white mb-4">
            Search & Filter
          </h1>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-8 bg-black border-b border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <input
            type="text"
            placeholder="Search by name, description or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 border-2 border-slate-700 rounded-xl bg-[#1B263B] text-white mb-6"
          />

          <div className="grid md:grid-cols-3 gap-4">

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-3 border-2 border-slate-700 rounded-lg bg-[#1B263B] text-white"
            >
              <option value="all">All Districts</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border-2 border-slate-700 rounded-lg bg-[#1B263B] text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border-2 border-slate-700 rounded-lg bg-[#1B263B] text-white"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Delayed">Delayed</option>
            </select>

          </div>

          <div className="mt-4 text-sm text-slate-300 font-semibold">
            Showing {filteredProjects.length} Projects
          </div>

        </div>
      </section>

      {/* RESULTS */}
      <section className="py-12 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 text-white">
              No projects found
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredProjects.map(project => (
                <Link key={project.id} href={`/projects/p/${project.id}`}>
                  <div className="bg-[#1B263B] border border-slate-700 rounded-xl p-6 hover:border-[#60a5fa] transition-all cursor-pointer">
                    <h3 className="text-xl font-black text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {project.district} • {project.category} • {project.status}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  )
}