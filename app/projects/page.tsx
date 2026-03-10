export const dynamic = 'force-dynamic'
export const revalidate = 0

import Link from 'next/link'
import { supabasePublic } from '@/lib/supabasePublic'



export default async function AllProjectsPage() {
  const supabase = supabasePublic

  const { data: projects, error } = await supabasePublic
    .from('projects')
    .select('*')

  if (error) throw new Error(error.message)

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-2xl sm:text-3xl font-boldmb-6">All Projects</h1>

      <div className="grid gap-4">
        {projects?.map(p => (
          <Link
            key={p.id}
            href={`/projects/p/${p.id}`}
            className="block bg-[#1B263B] p-5 rounded-xl border border-slate-700"
          >
            <div className="font-bold">{p.name}</div>
            <div className="text-sm text-slate-300">
              {p.district} · {p.category} · {p.status}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
