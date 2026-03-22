import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabasePublic } from '@/lib/supabasePublic'
import { fromSlug } from "@/lib/slug";
import Container from '@/components/Container'
import ProjectListCard from "@/components/ProjectListCard"

type Project = {
  id: string
  name: string
  status: 'Completed' | 'Ongoing' | 'Delayed'
  category: string
  district: string
  budget: number | null
  progress: number | null
}
export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const district = code?.replace(/-/g, ' ') || 'District'

  return {
    title: `${district} District Projects | Bihar Vikas Tracker`,
    description: `Explore all development projects in ${district}, Bihar including budgets, status and progress.`,
  }
}
export const dynamic = "force-dynamic";
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
       <Container>
          <Link href="/districts" className="inline-flex items-center text-[#B3AF8F] hover:text-white mb-4 font-semibold transition-colors">
            ← Back to All Districts
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2 min-w-0">
                <h1 className="text-4xl md:text-5xl font-black text-white">
                  {districtName}
                </h1>
                <span className="px-3 py-1 bg-white/10 text-white text-sm font-bold rounded-lg">
                 DISTRICT
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>
{/* Stats Cards */}
<section className="py-12 bg-black border-b border-slate-700">
  <Container>

    {/* 4 Stat Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* Total Projects */}
      <div className="bg-[#1B263B] border border-slate-700 rounded-xl shadow-sm hover:shadow-lg p-6 hover:border-[#60a5fa] transition-all">
        <div className="text-2xl sm:text-3xl font-bold text-[#60a5fa]">
          {totalProjects}
        </div>
        <div className="text-sm text-slate-300 mt-1 font-semibold">
          Total Projects
        </div>
      </div>

      {/* Completed */}
      <div className="bg-[#1B263B] border border-slate-700 rounded-xl shadow-sm hover:shadow-lg p-6 hover:border-emerald-400 transition-all">
        <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
          {completedProjects}
        </div>
        <div className="text-sm text-slate-300 mt-1 font-semibold">
          Completed Projects
        </div>
      </div>

      {/* Ongoing */}
      <div className="bg-[#1B263B] border border-slate-700 rounded-xl shadow-sm hover:shadow-lg p-6 hover:border-blue-400 transition-all">
        <div className="text-2xl sm:text-3xl font-bold text-blue-400">
          {ongoingProjects}
        </div>
        <div className="text-sm text-slate-300 mt-1 font-semibold">
          Ongoing Projects
        </div>
      </div>

      {/* Delayed */}
      <div className="bg-[#1B263B] border border-slate-700 rounded-xl shadow-sm hover:shadow-lg p-6 hover:border-red-400 transition-all">
        <div className="text-2xl sm:text-3xl font-bold text-red-400">
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

  </Container>
</section>

{/* Projects List */}
<section className="py-16 bg-black">
  <Container>

    <h2 className="text-2xl sm:text-3xl font-bold text-[#B3AF8F] mb-8">
      All Projects in {districtName}
    </h2>

    <div className="grid grid-cols-1 gap-6 w-full">
      {projects.map((project) => (
        <ProjectListCard key={project.id} project={project} />
      ))}
    </div>

  </Container>
</section>
</div>
)
}