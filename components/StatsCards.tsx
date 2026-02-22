import { useEffect, useState } from "react";

export default function StatsCards() {
 const [stats, setStats] = useState<null | {
  totalProjects: number
  completedProjects: number
  totalInvestment: number
  totalBeneficiaries: number
}>(null)

useEffect(() => {
  fetch("/api/stats")
    .then(res => res.json())
    .then(data => setStats(data))
    .catch(err => console.error("Stats fetch failed", err))
}, [])

  const statsData = [
  {
    label: 'Total Projects',
    value: stats ? stats.totalProjects.toString() : '—',
    gradient: 'from-blue-500 to-blue-600',
    icon: '📊',
  },
  {
    label: 'Completed',
    value: stats ? stats.completedProjects.toString() : '—',
    gradient: 'from-green-500 to-emerald-600',
    icon: '✅',
  },
  {
    label: 'Total Investment',
    value: stats
      ? `₹${(stats.totalInvestment / 10000000).toFixed(1)}Cr`
      : '—',
    gradient: 'from-purple-500 to-purple-600',
    icon: '💰',
  },
  {
    label: 'Beneficiaries',
    value: stats
      ? `${(stats.totalBeneficiaries / 1000000).toFixed(1)}M`
      : '—',
    gradient: 'from-orange-500 to-red-500',
    icon: '👥',
  },
]


  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat) => (
            <div 
              key={stat.label} 
              className="relative group bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl hover:shadow-card-hover transition-all border-2 border-gray-100 hover:border-primary/30 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-bl-full`}></div>
              
              <div className="relative z-10">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-gray-600 text-sm font-semibold mb-3">{stat.label}</p>
                <p className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
