import Link from 'next/link'
import { supabasePublic } from '@/lib/supabasePublic'
export const dynamic = "force-dynamic";
export const revalidate = 60;
import { formatCompactINR } from '@/lib/format'
import { districtRTO } from '@/lib/districtRTO'



export default async function DistrictsPage() {
const supabase = supabasePublic

const { data: projects, error } = await supabasePublic
  .from('projects')
  .select('district, budget, status')

if (error) {
  throw error
}

const districtMap: Record<string, {
  name: string
  projects: number
  totalBudget: number
  completedProjects: number
  ongoingProjects: number
  delayedProjects: number
}> = {}

projects.forEach(p => {
  if (!p.district) return

  if (!districtMap[p.district]) {
    districtMap[p.district] = {
      name: p.district,
      projects: 0,
      totalBudget: 0,
      completedProjects: 0,
      ongoingProjects: 0,
      delayedProjects: 0
    }
  }

  const d = districtMap[p.district]

  d.projects++
  d.totalBudget += p.budget ?? 0

  if (p.status === 'Completed') d.completedProjects++
  else if (p.status === 'Ongoing') d.ongoingProjects++
  else if (p.status === 'Delayed') d.delayedProjects++
})

const districts = Object.values(districtMap).sort((a, b) =>
  a.name.localeCompare(b.name)
)


  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1B263B] to-[#415A77] py-16">
        <div className="container mx-auto px-6">
          <p className="text-[#B3AF8F] font-bold text-sm mb-3 uppercase tracking-wider">All Regions</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Bihar Districts
          </h1>
          <p className="text-slate-200 text-lg max-w-2xl">
          Explore development initiatives across Bihar’s districts with structured public data and periodic updates.
          </p>
        </div>
      </section>

      {/* Stats Overview */}
<section className="py-12 bg-black border-b border-slate-700">
  <div className="mx-auto max-w-7xl px-4 sm:px-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

      {/* Total Districts */}
      <div className="bg-[#111827] border border-slate-700 rounded-xl p-4 sm:p-6 text-center">
        <div className="text-2xl sm:text-4xl font-black text-[#60a5fa] break-words">
          38
        </div>
        <div className="text-xs sm:text-sm text-slate-300 mt-1 font-semibold">
          Total Districts
        </div>
      </div>

      {/* Total Projects */}
      <div className="bg-[#111827] border border-slate-700 rounded-xl p-4 sm:p-6 text-center">
        <div className="text-2xl sm:text-4xl font-black text-[#60a5fa] break-words">
          {districts.reduce((sum, d) => sum + d.projects, 0)}
        </div>
        <div className="text-xs sm:text-sm text-slate-300 mt-1 font-semibold">
          Total Projects
        </div>
      </div>

      {/* Reported Budget */}
      <div className="bg-[#111827] border border-slate-700 rounded-xl p-4 sm:p-6 text-center">
        <div className="text-2xl sm:text-4xl font-black text-[#60a5fa] break-words">
          {formatCompactINR(
            districts.reduce((sum, d) => sum + d.totalBudget, 0)
          )}
        </div>
        <div className="text-xs sm:text-sm text-slate-300 mt-1 font-semibold">
          Reported Budget
        </div>
      </div>

      {/* Completed */}
      <div className="bg-[#111827] border border-slate-700 rounded-xl p-4 sm:p-6 text-center">
        <div className="text-2xl sm:text-4xl font-black text-emerald-400 break-words">
          {districts.reduce((sum, d) => sum + d.completedProjects, 0)}
        </div>
        <div className="text-xs sm:text-sm text-slate-300 mt-1 font-semibold">
          Completed
        </div>
      </div>

    </div>
  </div>
</section>

      {/* Districts Grid */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {districts.map((district) => {
              const completionRate = ((district.completedProjects / district.projects) * 100).toFixed(0)
              
              return (
               <Link
  key={district.name}
  href={`/districts/${district.name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")}`}
>

                  <div className="group bg-[#1B263B] border border-slate-700 rounded-lg p-6 hover:shadow-xl hover:border-[#60a5fa] transition-all cursor-pointer">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#60a5fa] transition-colors">
                          {district.name}
                        </h3>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-[#415A77] to-[#1B263B] rounded-lg flex items-center justify-center shadow-md">
                       <span className="text-white font-bold text-sm">
  {districtRTO[district.name] ?? '—'}
</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300">Total Projects</span>
                        <span className="font-bold text-white">{district.projects}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300">Budget</span>
                        <span className="font-bold text-white">{formatCompactINR(district.totalBudget)}
</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-400 font-semibold">Completion Rate</span>
                        <span className="font-bold text-white">{completionRate}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] h-2 rounded-full"
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 text-xs pt-3 border-t border-slate-700">
                      <div>
                        <span className="text-emerald-400 font-bold">{district.completedProjects}</span>
                        <span className="text-slate-400 ml-1">Done</span>
                      </div>
                      <div>
                        <span className="text-blue-400 font-bold">{district.ongoingProjects}</span>
                        <span className="text-slate-400 ml-1">Ongoing</span>
                      </div>
                      <div>
                        <span className="text-red-400 font-bold">{district.delayedProjects}</span>
                        <span className="text-slate-400 ml-1">Delayed</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
