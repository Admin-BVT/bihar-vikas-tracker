'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabasePublic } from "@/lib/supabasePublic"


export default function HomePage() {
 supabasePublic.from("projects")
 const [projects, setProjects] = useState<any[]>([])

useEffect(() => {
  async function fetchProjects() {
    const { data, error } = await supabasePublic
    .from("projects")
      .select('*')

    if (!error && data) setProjects(data)
  }

  fetchProjects()
}, [])

const totalProjects = projects.length
const completedProjects = projects.filter(p => p.status === 'Completed').length
const totalBudget = projects.reduce((sum, p) => sum + (p.budget ?? 0), 0)
const totalBeneficiaries = projects.reduce((sum, p) => sum + (p.beneficiaries ?? 0), 0)

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1B263B] via-[#415A77] to-[#1B263B] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#B3AF8F] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <p className="text-[#B3AF8F] font-bold text-sm mb-4 uppercase tracking-wider">WELCOME TO BIHAR’S INDEPENDENT DEVELOPMENT TRACKER</p>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Track Bihar's Development Journey
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed max-w-3xl">
              Bringing structure and visibility to Bihar’s publicly available development projects — enabling progress, spending, and reported impact to be explored with confidence.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105">
                <span className="flex items-center gap-2">
                  Explore Dashboard
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
              
              <Link href="/search" className="group px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#1B263B] transition-all hover:shadow-xl hover:scale-105">
                <span className="flex items-center gap-2">
                  Search Projects
                  <span className="text-xl">🔍</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-[#1B263B] to-[#415A77] rounded-2xl p-8 border border-slate-700 hover:border-blue-500 transition-all hover:scale-105 shadow-lg">
              <div className="text-5xl mb-4">📊</div>
              <div className="text-4xl font-black text-white mb-2">{totalProjects}</div>
              <div className="text-slate-300 font-semibold">Total Projects</div>
            </div>

            <div className="bg-gradient-to-br from-[#1B263B] to-[#415A77] rounded-2xl p-8 border border-slate-700 hover:border-emerald-500 transition-all hover:scale-105 shadow-lg">
              <div className="text-5xl mb-4">✅</div>
              <div className="text-4xl font-black text-white mb-2">{completedProjects}</div>
              <div className="text-slate-300 font-semibold">Completed</div>
            </div>

            <div className="bg-gradient-to-br from-[#1B263B] to-[#415A77] rounded-2xl p-8 border border-slate-700 hover:border-yellow-500 transition-all hover:scale-105 shadow-lg">
              <div className="text-5xl mb-4">💰</div>
              <div className="text-4xl font-black text-white mb-2">₹{(totalBudget / 10000000000).toFixed(1)}K Cr</div>
              <div className="text-slate-300 font-semibold">Reported Total Investment</div>
            </div>

            <div className="bg-gradient-to-br from-[#1B263B] to-[#415A77] rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all hover:scale-105 shadow-lg">
              <div className="text-5xl mb-4">👥</div>
              <div className="text-4xl font-black text-white mb-2">{(totalBeneficiaries / 1000000).toFixed(1)}M</div>
              <div className="text-slate-300 font-semibold">Beneficiaries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement - NEW! */}
      <section className="py-16 bg-black border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
             Independent Infrastructure for Public Access to Bihar’s Development Data
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-4">
               A structured effort to make publicly available development data easier to access, understand, and track across projects and districts.
            </p>
            <p className="text-lg text-[#B3AF8F] font-bold">
              Made by Biharis, for Bihar. This is our story of progress.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why Bihar Vikas Tracker?</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">Promoting transparency and informed public awareness in development initiatives</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1B263B] rounded-2xl p-8 border border-slate-700 hover:border-blue-500 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
                🎯
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Regularly Updated Data</h3>
              <p className="text-slate-300 leading-relaxed">
                Project status, budget figures, and progress information compiled from publicly available government sources and updated periodically.
              </p>
            </div>

            <div className="bg-[#1B263B] rounded-2xl p-8 border border-slate-700 hover:border-emerald-500 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
                🔍
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Public Data Visibility</h3>
              <p className="text-slate-300 leading-relaxed">
                Structured visibility into available project budgets, timelines, and reported beneficiaries across districts.
              </p>
            </div>

            <div className="bg-[#1B263B] rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
                📱
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Easy Access</h3>
              <p className="text-slate-300 leading-relaxed">
                User-friendly interface with powerful search and filtering to find exactly what you're looking for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1B263B] to-[#415A77]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Explore?</h2>
          <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto">
            Explore how development projects are shaping districts across Bihar.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
  href="/districts" 
  className="group px-8 py-4 border-2 border-white text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-transparent hover:bg-gradient-to-r hover:from-[#1B263B] hover:to-[#415A77]"
>
  <span className="flex items-center gap-2">
    Browse Districts
    <span className="group-hover:translate-x-1 transition-transform">→</span>
  </span>
</Link>

<Link 
  href="/categories" 
  className="group px-8 py-4 border-2 border-white text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-transparent hover:bg-gradient-to-r hover:from-[#1B263B] hover:to-[#415A77]"
>
  <span className="flex items-center gap-2">
    View Categories
    <span className="group-hover:translate-x-1 transition-transform">→</span>
  </span>
</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
