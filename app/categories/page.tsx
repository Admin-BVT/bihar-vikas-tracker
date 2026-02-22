import Link from 'next/link'
import { supabasePublic } from '@/lib/supabasePublic'

// SMART AUTO-SLUG GENERATOR - Works with ANY category name
function getCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, '')          // Remove "&"
    .replace(/\s+/g, '-')       // Replace spaces with "-"
    .replace(/-+/g, '-')        // Replace multiple dashes with single dash
    .replace(/^-|-$/g, '')      // Remove leading/trailing dashes
}
function formatBudgetINR(amount: number) {
  if (amount >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toFixed(1)} Cr`
  }

  if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toFixed(1)} L`
  }

  return `₹${amount.toLocaleString('en-IN')}`
}

export default async function CategoriesPage() {
 const supabase = supabasePublic

const { data: projects, error } = await supabasePublic
  .from('projects')
  .select('category, budget, status')

if (error) {
  throw error
}

const categoryStats: Record<string, {
  count: number
  totalBudget: number
  completed: number
  ongoing: number
  delayed: number
}> = {}

projects.forEach(project => {
  if (!project.category) return

  if (!categoryStats[project.category]) {
    categoryStats[project.category] = {
      count: 0,
      totalBudget: 0,
      completed: 0,
      ongoing: 0,
      delayed: 0
    }
  }

  const stats = categoryStats[project.category]
  stats.count++
  stats.totalBudget += project.budget ?? 0

  if (project.status === 'Completed') stats.completed++
  else if (project.status === 'Ongoing') stats.ongoing++
  else if (project.status === 'Delayed') stats.delayed++
})

  const categories = Object.keys(categoryStats).sort()

  const categoryIcons: Record<string, string> = {
    'Transport & Infrastructure': '🚇',
    'Rural Development': '🌾',
    'Education': '📚',
    'Healthcare': '🏥',
    'Tourism & Culture': '🏛️',
    'Water Supply': '💧',
    'Energy & Power': '⚡',
    'Agriculture': '🌱',
    'Agriculture & Rural Development': '🌾',
    'Urban Development': '🏙️',
    'Social Welfare': '🤝',
    'Water & Sanitation': '💧'
  }

  const categoryColors: Record<string, string> = {
    'Transport & Infrastructure': 'from-blue-900 to-blue-800 border-blue-700',
    'Rural Development': 'from-green-900 to-green-800 border-green-700',
    'Education': 'from-purple-900 to-purple-800 border-purple-700',
    'Healthcare': 'from-red-900 to-red-800 border-red-700',
    'Tourism & Culture': 'from-amber-900 to-amber-800 border-amber-700',
    'Water Supply': 'from-cyan-900 to-cyan-800 border-cyan-700',
    'Energy & Power': 'from-yellow-900 to-yellow-800 border-yellow-700',
    'Agriculture': 'from-lime-900 to-lime-800 border-lime-700',
    'Agriculture & Rural Development': 'from-green-900 to-green-800 border-green-700',
    'Urban Development': 'from-indigo-900 to-indigo-800 border-indigo-700',
    'Social Welfare': 'from-pink-900 to-pink-800 border-pink-700',
    'Water & Sanitation': 'from-cyan-900 to-cyan-800 border-cyan-700'
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B263B] to-[#415A77] py-20">
        <div className="container mx-auto px-6">
          <p className="text-[#B3AF8F] font-bold text-sm mb-3 uppercase tracking-wider">Browse by Type</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Project Categories
          </h1>
          <p className="text-slate-200 text-xl max-w-3xl leading-relaxed">
            Explore development projects organized by sector and category across Bihar.
          </p>
        </div>
      </section>
<div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1 break-words leading-tight"></div>
      {/* Overview Stats */}
      <section className="py-12 bg-black border-b border-slate-700">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[#1B263B] rounded-xl p-6 border border-slate-700">
              <div className="text-4xl font-black text-[#60a5fa] mb-2">{categories.length}</div>
              <div className="text-sm text-slate-300 font-semibold">Total Categories</div>
            </div>
            <div className="bg-[#1B263B] rounded-xl p-6 border border-slate-700">
              <div className="text-4xl font-black text-[#60a5fa] mb-2">{projects.length}</div>
              <div className="text-sm text-slate-300 font-semibold">Total Projects</div>
            </div>
            <div className="bg-[#1B263B] rounded-xl p-6 border border-slate-700">
              <div className="text-3xl font-black text-[#60a5fa] mb-1 break-words leading-tight">
             {formatBudgetINR(
  projects.reduce((sum, p) => sum + (p.budget ?? 0), 0)
)}
              </div>
              <div className="text-sm text-slate-300 font-semibold">Reported Investment</div>
            </div>
            <div className="bg-[#1B263B] rounded-xl p-6 border border-slate-700">
              <div className="text-4xl font-black text-emerald-400 mb-2">
               {projects.filter(p => p.status === 'Completed').length}
              </div>
              <div className="text-sm text-slate-300 font-semibold">Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const stats = categoryStats[category]
              const icon = categoryIcons[category] || '📁'
              const color = categoryColors[category] || 'from-slate-800 to-slate-900 border-slate-700'
              const completionRate = stats.count > 0 ? ((stats.completed / stats.count) * 100).toFixed(0) : '0'

              return (
                <Link key={category} href={`/categories/${getCategorySlug(category)}`}>
                  <div className={`group bg-gradient-to-br ${color} border-2 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{icon}</div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-white">{stats.count}</div>
                        <div className="text-xs text-slate-300 font-semibold">Projects</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-white mb-4 group-hover:text-[#60a5fa] transition-colors">
                      {category}
                    </h3>

                    <div className="mb-4 pb-4 border-b border-slate-600">
                      <div className="text-xs text-slate-300 mb-1">Reported Budget</div>
                      <div className="text-2xl font-black text-white">
                       {formatBudgetINR(stats.totalBudget)}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-300 font-semibold">Completion (Based on Available Data)</span>
                        <span className="font-black text-white">{completionRate}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 shadow-inner overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 text-xs flex-wrap">
                      <div>
                        <span className="text-emerald-400 font-bold">{stats.completed}</span>
                        <span className="text-slate-400 ml-1">Done</span>
                      </div>
                      <div>
                        <span className="text-blue-400 font-bold">{stats.ongoing}</span>
                        <span className="text-slate-400 ml-1">Ongoing</span>
                      </div>
                      <div>
                        <span className="text-red-400 font-bold">{stats.delayed}</span>
                        <span className="text-slate-400 ml-1">Delayed</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-600 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-300">View Projects</span>
                      <span className="text-[#60a5fa] group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Looking for Something Specific?</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Use our advanced search to filter projects by district, status, and category.
          </p>
          <Link href="/search" className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-[#60a5fa] text-[#60a5fa] font-bold rounded-xl hover:bg-gradient-to-r hover:from-[#1B263B] hover:to-[#415A77] hover:text-white hover:border-transparent transition-all hover:shadow-xl hover:scale-105">
            <span className="text-xl">🔍</span>
            Search All Projects
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
