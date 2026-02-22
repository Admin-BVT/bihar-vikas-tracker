import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabasePublic } from '@/lib/supabasePublic'
import { fromSlug } from "@/lib/slug";



type Project = {
  id: string
  name: string
  status: 'Completed' | 'Ongoing' | 'Delayed'
  category: string
  district: string
  budget: number | null
  progress: number | null
}

export default async function DistrictDetailPage({
  params,
}: {
 params: { code: string }
}) {
  const { code } = await params

  const supabase = supabasePublic

  if (!code) {
    notFound()
  }
  
const districtName = fromSlug(code);



const { data: projects, error } = await supabasePublic
  .from('projects')
  .select('*')
.ilike("district", districtName)



if (error) {
  throw error
}

if (!projects || projects.length === 0) {
  notFound()
}

const safeProjects = projects!

/* -------- FORMATTERS -------- */
function formatCurrency(value: number) {
  const format = (num: number) =>
    Number.isInteger(num) ? num : num.toFixed(1)

  if (value >= 10000000) {
    return `₹${format(value / 10000000)} Cr`
  }

  if (value >= 100000) {
    return `₹${format(value / 100000)} Lakh`
  }

  if (value >= 1000) {
    return `₹${format(value / 1000)}K`
  }

  return `₹${value.toLocaleString('en-IN')}`
}

function formatIndianNumber(value: number) {
  if (value >= 10000000) {
    return `${(value / 10000000).toFixed(1)} Cr`
  }

  if (value >= 100000) {
    return `${(value / 100000).toFixed(1)} Lakh`
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }

  return value.toLocaleString('en-IN')
}


  // Filter projects for this district
const totalProjects = safeProjects.length
const completedProjects =safeProjects.filter(p => p.status === 'Completed').length
const ongoingProjects = safeProjects.filter(p => p.status === 'Ongoing').length
const delayedProjects = safeProjects.filter(p => p.status === 'Delayed').length

const totalBudget = safeProjects.reduce(
  (sum, p) => sum + Number(p.budget ?? 0),
  0
)

const completionRate = totalProjects
  ? Math.round((completedProjects / totalProjects) * 100)
  : 0

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1B263B] to-[#415A77] py-16">
        <div className="container mx-auto px-6">
          <Link href="/districts" className="inline-flex items-center text-[#B3AF8F] hover:text-white mb-4 font-semibold transition-colors">
            ← Back to All Districts
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-black text-white">
                  {districtName}
                </h1>
                <span className="px-3 py-1 bg-white/10 text-white text-sm font-bold rounded-lg">
                 DISTRICT
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* Stats Cards */}
<section className="py-12 bg-black border-b border-slate-700">
  <div className="container mx-auto px-6">

    {/* 4 Stat Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* Total Projects */}
      <div className="bg-[#1B263B] border border-slate-700 rounded-xl p-6 hover:border-[#60a5fa] transition-all">
        <div className="text-3xl font-black text-[#60a5fa]">
          {totalProjects}
        </div>
        <div className="text-sm text-slate-300 mt-1 font-semibold">
          Total Projects
        </div>
      </div>

      {/* Completed */}
      <div className="bg-[#1B263B] border border-slate-700 rounded-xl p-6 hover:border-emerald-400 transition-all">
        <div className="text-3xl font-black text-emerald-400">
          {completedProjects}
        </div>
        <div className="text-sm text-slate-300 mt-1 font-semibold">
          Completed Projects
        </div>
      </div>

      {/* Ongoing */}
      <div className="bg-[#1B263B] border border-slate-700 rounded-xl p-6 hover:border-blue-400 transition-all">
        <div className="text-3xl font-black text-blue-400">
          {ongoingProjects}
        </div>
        <div className="text-sm text-slate-300 mt-1 font-semibold">
          Ongoing Projects
        </div>
      </div>

      {/* Delayed */}
      <div className="bg-[#1B263B] border border-slate-700 rounded-xl p-6 hover:border-red-400 transition-all">
        <div className="text-3xl font-black text-red-400">
          {delayedProjects}
        </div>
        <div className="text-sm text-slate-300 mt-1 font-semibold">
          Delayed Projects
        </div>
      </div>

    </div> {/* CLOSE 4-card grid */}


    {/* Budget & Completion Row */}
    <div className="grid md:grid-cols-2 gap-6 mt-8">

      <div className="bg-gradient-to-br from-[#1B263B] to-[#415A77] rounded-xl p-6 text-white">
        <div className="text-sm font-semibold text-[#B3AF8F] mb-2">
          Reported Project Budget
        </div>
        <div className="text-4xl font-black">
  {formatCurrency(totalBudget)}
</div>
      </div>

      <div className="bg-[#1B263B] rounded-xl p-6 border border-slate-700 text-white">
        <div className="text-sm font-semibold text-slate-300 mb-2">
         Project Completion (Based on Available Data)
        </div>
        <div className="text-4xl font-black text-[#60a5fa] mb-3">
          {completionRate}%
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-[#B3AF8F] to-[#9D9980] h-3 rounded-full"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

    </div>

  </div>
</section>

      {/* Projects List */}
     <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
         <h2 className="text-3xl font-black text-[#B3AF8F] mb-8">
  All Projects in {districtName}
</h2>


          <div className="grid gap-6">
            {projects.map((project) => (
  <Link
    key={project.id}
    href={`/projects/p/${project.id}`}
   className="group block bg-[#1B263B] border border-slate-700 rounded-xl p-6 hover:shadow-xl hover:border-[#60a5fa] transition-all cursor-pointer"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-black text-white group-hover:text-[#60a5fa] transition-colors">
            {project.name}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              project.status === 'Completed'
                ? 'bg-emerald-100 text-emerald-700'
                : project.status === 'Ongoing'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {project.status}
          </span>
        </div>
      </div>
    </div>
  </Link>
))}      
          </div>
        </div>
      </section>
    </div>
  )
}
