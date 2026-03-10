'use client'


import Link from 'next/link'
import { useEffect, useState } from 'react'


/* ------------------ TYPES ------------------ */
type Stats = {
  totalProjects: number
  totalBudget: number
  totalBeneficiaries: number
}

type StatusBreakdown = {
  completed: number
  ongoing: number
  delayed: number
}


type CategoryBreakdown = Record<string, number>
type DistrictBreakdown = [string, number][]

/* ------------------ PAGE ------------------ */
export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [status, setStatus] = useState<StatusBreakdown | null>(null)
  const [categories, setCategories] = useState<CategoryBreakdown>({})
  const [topDistricts, setTopDistricts] = useState<DistrictBreakdown>([])

  /* -------- FETCHES -------- */
useEffect(() => {
  fetch('/api/stats')
    .then(r => r.json())
    .then(setStats)

  fetch('/api/status-breakdown')
    .then(r => r.json())
    .then(setStatus)

  fetch('/api/category-breakdown')
    .then(r => r.json())
    .then(setCategories)

  fetch('/api/district-breakdown')
    .then(r => r.json())
    .then((data) => {
      const arr = Object.entries(data) as [string, number][]
      arr.sort((a, b) => b[1] - a[1])
      setTopDistricts(arr.slice(0, 5))
    })
}, [])


  /* -------- FORMATTERS -------- */
 function formatCurrency(value: number) {
  const format = (num: number) =>
    Number.isInteger(num) ? num : num.toFixed(1)

  if (value >= 10000000) {
    return `₹${format(value / 10000000)} Crore`
  }

  if (value >= 100000) {
    return `₹${format(value / 100000)} Lakh`
  }

  if (value >= 1000) {
    return `₹${format(value / 1000)} Thousand`
  }

  return `₹${value}`
}

function formatNumber(value: number) {
  const format = (num: number) =>
    Number.isInteger(num) ? num : Number(num.toFixed(1))

  if (value >= 10000000) {
    return `${format(value / 10000000)} Crore`
  }

  if (value >= 100000) {
    return `${format(value / 100000)} Lakh`
  }

  if (value >= 1000) {
    return `${format(value / 1000)} Thousand`
  }

  return value.toLocaleString('en-IN')
}


  /* ------------------ UI ------------------ */
  return (
    <div className="min-h-screen bg-black">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#1B263B] to-[#415A77] py-20">
        <div className="container mx-auto px-6">
          <p className="text-[#B3AF8F] font-bold text-sm mb-3 uppercase tracking-wider">
            Current Dataset Overview
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Project Dashboard
          </h1>
          <p className="text-slate-200 text-xl max-w-3xl">
            Structured insights and statistical overview derived from publicly available development project data.
          </p>
        </div>
      </section>

      {/* KEY METRICS */}
      <section className="py-12 -mt-10 relative z-10">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-6">
          <Metric
             icon="💰"
             label="TOTAL REPORTED BUDGET"
            value={
                  typeof stats?.totalBudget === 'number'
                   ? formatCurrency(stats.totalBudget)
                   : '—'
                    }

             />
          <Metric
             icon="👥"
            label="REPORTED BENEFICIARIES"
            value={
              typeof stats?.totalBeneficiaries === 'number'
              ? formatNumber(stats.totalBeneficiaries)
              : '—'
              }
             />
          <Metric
             icon="📊"
            label="TOTAL PROJECTS"
             value={
             typeof stats?.totalProjects === 'number'
             ? stats.totalProjects.toLocaleString('en-IN')
             : '—' 
             }  
             />
          <Metric 
             icon="📍" 
             label="COVERAGE" 
             value="DISTRICTS REPRESENTED" />
        </div>
      </section>

      {/* STATUS OVERVIEW */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 flex items-center gap-3">
            📊 Project Status Overview
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
      
               <StatusCard
              label="Completed"
              icon="✅"
              value={status?.completed ?? 0}
               total={
              (status?.completed ?? 0) +
              (status?.ongoing ?? 0) +
              (status?.delayed ?? 0)
            }
            />
            

              
              <StatusCard
               label="Ongoing"
               icon="🚧"
                value={status?.ongoing ?? 0}
                 total={
                (status?.completed ?? 0) +
                (status?.ongoing ?? 0) +
                (status?.delayed ?? 0)
                 }
                />
             

            
            <StatusCard
           label="Delayed"
           icon="⏰"
           value={status?.delayed ?? 0}
           total={
          (status?.completed ?? 0) +
          (status?.ongoing ?? 0) +
           (status?.delayed ?? 0)
           }
           />
           
          </div>
        </div>
      </section>

      {/* TOP DISTRICTS */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">🏆 Top Districts (As per our records)</h2>
          <div className="grid md:grid-cols-5 gap-6">
          {topDistricts.length > 0 &&
  topDistricts.map(([d, c], i) => (
    <Link
    key={d}
    href={`/districts/${encodeURIComponent(d)}`}
    className="block bg-[#1B263B] p-6 rounded-2xl border-2 border-slate-700 hover:border-[#60a5fa] hover:shadow-lg transition-all"
  >
    <div className="text-white font-black text-xl">{i + 1}</div>
    <div className="text-3xl text-[#60a5fa] font-black">{c}</div>
    <div className="text-slate-300">{d}</div>
  </Link>
))}
          </div>
        </div>
      </section>

     

      {/* CTA */}
      <section className="py-16 bg-black text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Explore More Details
        </h2>
        <div className="flex gap-4 justify-center">
          <Link
  href="/districts"
  className="group px-8 py-4 border-2 border-[#60a5fa] text-[#60a5fa] font-bold rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1B263B] hover:to-[#415A77] hover:text-white hover:border-transparent hover:shadow-lg"
>
  <span className="flex items-center gap-2">
    Browse Districts
    <span className="group-hover:translate-x-1 transition-transform">→</span>
  </span>
</Link>

<Link
  href="/categories"
  className="group px-8 py-4 border-2 border-[#60a5fa] text-[#60a5fa] font-bold rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1B263B] hover:to-[#415A77] hover:text-white hover:border-transparent hover:shadow-lg"
>
  <span className="flex items-center gap-2">
    View Categories
    <span className="group-hover:translate-x-1 transition-transform">→</span>
  </span>
</Link>
        </div>
      </section>
    </div>
  )
}

/* ------------------ COMPONENTS ------------------ */
function Metric({ icon, label, value }: any) {
  return (
    <div className="bg-[#1B263B] rounded-2xl p-6 border-2 border-slate-700">
      <div className="flex justify-between mb-2">
        <span className="text-3xl">{icon}</span>
        <span className="text-xs text-slate-400 font-bold">{label}</span>
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-white">{value}</div>
    </div>
  )
}

function StatusCard({ icon, label, value, total }: any) {
  const percent = total ? (value / total) * 100 : 0
  return (
    <div className="bg-[#1B263B] rounded-2xl p-8 border-2 border-slate-700">
      <div className="flex justify-between mb-4">
        <span className="text-4xl">{icon}</span>
        <div className="text-right">
          <div className="text-4xl font-black text-white">{value}</div>
          <div className="text-sm text-slate-300">Projects</div>
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white">{label}</h3>
      <div className="text-sm text-white mt-2">
        {percent.toFixed(1)}% of total projects
      </div>
    </div>
  )
}
