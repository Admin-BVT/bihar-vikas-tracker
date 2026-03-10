import Link from "next/link"

export default function ProjectListCard({ project }: { project: any }) {
  return (
    <Link href={`/projects/p/${project.id}`} className="block w-full">
      <div className="w-full bg-[#1B263B] border border-slate-700 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-lg hover:border-[#60a5fa] transition-all">

        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 break-words leading-tight">
          {project.name}
        </h3>

        <p className="text-sm text-slate-400">
          {project.district} • {project.category} • {project.status}
        </p>

      </div>
    </Link>
  )
}