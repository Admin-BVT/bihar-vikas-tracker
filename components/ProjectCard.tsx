import Link from 'next/link'
import { Project } from '@/types'


interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusConfig = {
    Completed: { 
      bg: 'bg-emerald-500', 
      text: 'text-white',
      icon: '✓'
    },
    Ongoing: { 
      bg: 'bg-blue-500', 
      text: 'text-white',
      icon: '⏳'
    },
    Delayed: { 
      bg: 'bg-red-500', 
      text: 'text-white',
      icon: '⚠'
    },
  }

  const config = statusConfig[project.status]
  const progress = (project.spent / project.budget) * 100

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group bg-white border border-slate-200 rounded-lg p-6 hover:shadow-xl hover:border-[#415A77] transition-all cursor-pointer h-full">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 flex-1 pr-3 group-hover:text-[#415A77] transition-colors">
            {project.name}
          </h3>
          <span className={`px-3 py-1 rounded text-xs font-bold ${config.bg} ${config.text} flex items-center gap-1 shrink-0`}>
            <span>{config.icon}</span>
            {project.status}
          </span>
        </div>
        
        <p className="text-sm text-slate-600 mb-5 font-medium">
          {project.category} • {project.district} • {project.block}
        </p>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500 font-medium">Budget</span>
            <span className="font-black text-slate-900 text-lg">₹{(project.budget / 10000000).toFixed(2)}Cr</span>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-500 font-semibold">Utilization</span>
              <span className="font-bold text-slate-900">{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#B3AF8F] to-[#9D9980] h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
          
          {project.verified && (
            <div className="flex items-center gap-2 text-xs pt-2">
              <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-slate-600 font-semibold">Verified</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
