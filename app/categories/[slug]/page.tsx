import Link from 'next/link'
import { supabasePublic } from '@/lib/supabasePublic'
import { notFound } from 'next/navigation'
  
import { fromSlug } from "@/lib/slug"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = fromSlug(slug)

  return {
    title: `${category} Projects in Bihar | Bihar Vikas Tracker`,
    description: `Explore all ${category.toLowerCase()} related development projects across Bihar districts with budgets and status.`,
  }
}

function formatBudgetINR(amount: number | null | undefined) {
  if (amount === null || amount === undefined) return "—"

  if (amount >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toFixed(1)} Cr`
  }

  if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toFixed(1)} L`
  }

  return `₹${amount.toLocaleString('en-IN')}`
}
export const dynamic = "force-dynamic";
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const supabase = supabasePublic

  if (!slug) {
    notFound()
  }
const normalizedSlug = slug
  .toLowerCase()
  .replace(/-/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const { data: allProjects, error } = await supabasePublic
  .from('projects')
  .select('*')

if (error) throw error

const categoryProjects =
  allProjects?.filter(project =>
    project.category
      ?.toLowerCase()
      .replace(/&/g, '')
      .replace(/\s+/g, ' ')
      .trim() === normalizedSlug
  ) ?? []

const categoryName =
  categoryProjects.length > 0
    ? categoryProjects[0].category
    : slug.replace(/-/g, ' ')

  if (categoryProjects.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-4xl font-black text-white mb-4">{categoryName}</h1>
          <p className="text-slate-400 text-lg">No projects found in this category yet.</p>
          <Link href="/categories" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all">
            ← Back to Categories
          </Link>
        </div>
      </div>
    )
  }


  const totalBudget = categoryProjects.reduce((sum, p) => sum + (p.budget ?? 0), 0)
  const completedCount = categoryProjects.filter(p => p.status === 'Completed').length
  const ongoingCount = categoryProjects.filter(p => p.status === 'Ongoing').length
  const delayedCount = categoryProjects.filter(p => p.status === 'Delayed').length

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#1B263B] to-[#415A77] py-16">
        <div className="container mx-auto px-6">
          <Link href="/categories" className="inline-flex items-center gap-2 text-[#B3AF8F] font-semibold mb-4 hover:text-white transition-colors">
            ← Back to Categories
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{categoryName}</h1>
          <p className="text-slate-200 text-lg">{categoryProjects.length} projects • {formatBudgetINR(totalBudget)} reported investment</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-black border-b border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[#1B263B] rounded-xl p-6 border border-slate-700">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{categoryProjects.length}</div>
              <div className="text-slate-300 font-semibold">Total Projects</div>
            </div>

            <div className="bg-[#1B263B] rounded-xl p-6 border border-slate-700">
              <div className="text-3xl mb-2">✅</div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">{completedCount}</div>
              <div className="text-slate-300 font-semibold">Completed</div>
            </div>

            <div className="bg-[#1B263B] rounded-xl p-6 border border-slate-700">
              <div className="text-3xl mb-2">🔄</div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">{ongoingCount}</div>
              <div className="text-slate-300 font-semibold">Ongoing</div>
            </div>

            <div className="bg-[#1B263B] rounded-xl p-6 border border-slate-700">
              <div className="text-3xl mb-2">⚠️</div>
              <div className="text-2xl sm:text-3xl font-bold text-red-400 mb-1">{delayedCount}</div>
              <div className="text-slate-300 font-semibold">Delayed</div>
            </div>
          </div>
        </div>
      </section>
     <section className="py-12 sm:py-14 bg-black border-b border-slate-800">
  <div className="container mx-auto px-6">

    <div className="max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
        {categoryName} Projects in Bihar
      </h1>

      <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
        This page lists all {categoryName.toLowerCase()} projects across Bihar, including district-wise distribution, budget allocation, and implementation status.
      </p>
    </div>

  </div>
</section>

      {/* Projects List */}
      <section className="py-14 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-black text-white mb-8">All Projects</h2>
          
          <div className="grid gap-6">
            {categoryProjects.map((project: any) => {
              // SMART PROGRESS: Show 100% for completed projects
              const displayProgress = project.status === 'Completed' ? 100 : project.progress
              
              return (
                <div key={project.id} className="bg-[#1B263B] rounded-2xl p-6 md:p-8 border border-slate-700 hover:border-blue-500 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-black text-white mb-3">{project.name}</h3>
                      {project.description && (
  <p className="text-slate-300 leading-relaxed mb-4">
    {project.description}
  </p>
)}
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
                        project.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500' :
                        project.status === 'Ongoing' ? 'bg-blue-500/20 text-blue-400 border border-blue-500' :
                        'bg-red-500/20 text-red-400 border border-red-500'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-slate-400 text-sm mb-1">District:</div>
                      <div className="text-white font-bold text-sm md:text-base">{project.district}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Category:</div>
                      <div className="text-white font-bold text-sm md:text-base">{project.category}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1"> Reported Budget:</div>
                      <div className="text-white font-bold text-sm md:text-base">{formatBudgetINR(project.budget)}
</div>
                    </div>
                  </div>

                  {/* SMART PROGRESS BAR */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400 font-semibold">Reported Progress</span>
                      <span className={`font-bold ${
                        displayProgress === 100 ? 'text-emerald-400' : 
                        displayProgress >= 70 ? 'text-blue-400' : 
                        displayProgress >= 40 ? 'text-orange-400' :
                        'text-red-400'
                      }`}>
                        {displayProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          displayProgress === 100 ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' :
                          project.status === 'Delayed' ? 'bg-gradient-to-r from-red-600 to-red-400' :
                          'bg-gradient-to-r from-blue-600 to-blue-400'
                        }`}
                        style={{ width: `${displayProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  <Link 
                    href={`/projects/p/${project.id}`}
                    className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
