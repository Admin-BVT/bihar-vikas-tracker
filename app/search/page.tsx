'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { supabasePublic } from "@/lib/supabasePublic"





export default function SearchPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Fetch projects from Supabase
  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabasePublic
    .from("projects")
      .select('*')

      if (!error && data) {
        setProjects(data)
      }
    }

    fetchProjects()
  }, [])

  // Unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(projects.map(p => p.category))]
    return cats.sort()
  }, [projects])

  // Unique districts
  const districts = useMemo(() => {
    const d = [...new Set(projects.map(p => p.district))]
    return d.sort()
  }, [projects])

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        searchQuery === '' ||
        project.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description ?? '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
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

      return (
        matchesSearch &&
        matchesDistrict &&
        matchesCategory &&
        matchesStatus
      )
    })
  }, [projects, searchQuery, selectedDistrict, selectedCategory, selectedStatus])

  return (
    <div className="min-h-screen bg-black">

      {/* Header */}
      <section className="bg-gradient-to-br from-[#1B263B] to-[#415A77] py-16">
        <div className="container mx-auto px-6">
          <p className="text-[#B3AF8F] font-bold text-sm mb-3 uppercase tracking-wider">
            Discover Projects
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Search & Filter
          </h1>
          <p className="text-slate-200 text-lg max-w-2xl">
            Search publicly available development project data using structured filtering options
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-black border-b border-slate-700 ">
        <div className="container mx-auto px-6">

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by project name, description, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 border-2 border-slate-700 rounded-xl text-lg bg-[#1B263B] text-white placeholder:text-slate-400 focus:border-[#60a5fa] focus:outline-none transition-colors"
            />
          </div>

          <div className="sticky top-0 bg-black py-4 z-10"></div>
          <div className="grid md:grid-cols-3 gap-4">

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-3 border-2 border-slate-700 rounded-lg font-semibold bg-[#1B263B] text-white"
            >
              <option value="all">All Districts</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border-2 border-slate-700 rounded-lg font-semibold bg-[#1B263B] text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border-2 border-slate-700 rounded-lg font-semibold bg-[#1B263B] text-white"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Delayed">Delayed</option>
            </select>

          </div>

          <div className="mt-4 text-sm text-slate-300 font-semibold">
            Showing {filteredProjects.length} Projects from current dataset
          </div>

        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-6">

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-black text-white mb-2">
                No projects found
              </h2>
              <p className="text-slate-300">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredProjects.map(project => (
                <Link key={project.id} href={`/projects/p/${project.id}`}>
                  <div className="group bg-[#1B263B] border border-slate-700 rounded-xl p-6 hover:shadow-xl hover:border-[#60a5fa] transition-all cursor-pointer">

                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-black text-white">
                        {project.name}
                      </h3>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-700 text-white">
                        {project.status}
                      </span>
                    </div>

                    <p className="text-slate-300 mb-2">
                      {project.description}
                    </p>

                    <div className="text-sm text-slate-400">
                      {project.district} • {project.category}
                    </div>

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
