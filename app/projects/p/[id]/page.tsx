export const runtime = "nodejs";
import { notFound } from "next/navigation";
import { supabasePublic } from "@/lib/supabasePublic";

type Project = {
  id: string;
  name: string;
  district: string;
  category: string;
  status: string;
  budget: number | null;
  progress: number | null;
  beneficiaries: number | null;
  implementing_agency: string | null;
  start_date: string | null;
  expected_end_date: string | null;
  actual_completion_date: string | null;
  notes: string | null;
  image_url: string | null;
  video_url: string | null;
};


export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) notFound();

  const { data: project } = await supabasePublic
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!project) notFound();



  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#1B263B] to-[#415A77] py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {project.name}
          </h1>
          <div className="flex flex-wrap gap-3 text-sm">
            <Badge>{project.status}</Badge>
            <Badge>{project.category}</Badge>
            <Badge>{project.district}</Badge>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-6">
        <Info label="Reported Budget" value={formatCurrency(project.budget)} />
        <Info label="Reported Progress" value={`${project.progress ?? 0}%`} />
        <Info
          label="Reported Beneficiaries"
          value={formatNumber(project.beneficiaries)}
        />
        <Info
          label="Implementing Agency (As Reported)"
          value={project.implementing_agency ?? "—"}
        />
      </section>

      {/* DATES */}
      <section className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        <Info label="Start Date" value={formatDate(project.start_date)} />
        <Info label="Expected End" value={formatDate(project.expected_end_date)} />
        <Info label="Completed On" value={formatDate(project.actual_completion_date)} />
      </section>
{project.notes && (
  <section className="container mx-auto px-6 py-12">
    <h2 className="text-2xl font-black mb-6 text-white">
      Project Notes
    </h2>

    <div className="bg-[#1B263B] border border-slate-700 rounded-xl shadow-sm hover:shadow-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-[#415A77] text-white text-sm uppercase tracking-wider">
          <tr>
            <th className="px-5 py-3">Type</th>
            <th className="px-5 py-3">Details</th>
          </tr>
        </thead>

        <tbody className="text-slate-300">
          <tr className="border-t border-slate-700 hover:bg-[#22304A] transition-colors">
            <td className="px-5 py-3 font-semibold">
              Description/About 
            </td>
            <td className="px-5 py-3">
              {project.notes}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
)}

     {(project.image_url || project.video_url) && (
  <section className="container mx-auto px-6 py-12 text-center">
    <div className="flex flex-wrap justify-center gap-4">

      {project.image_url && (
        <a
          href={project.image_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border-2 border-[#60a5fa] text-[#60a5fa] font-bold rounded-xl hover:bg-[#60a5fa] hover:text-black transition-all"
        >
          View Project Image →
        </a>
      )}

      {project.video_url && (
        <a
          href={project.video_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border-2 border-emerald-400 text-emerald-400 font-bold rounded-xl hover:bg-emerald-400 hover:text-black transition-all"
        >
          Watch Related Video →
        </a>
      )}

    </div>
  </section>
)}

    </div>
  );
}

/* ---------- UI ---------- */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1B263B] rounded-xl p-5 border border-slate-700">
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="px-3 py-1 bg-slate-800 rounded-full">
      {children}
    </span>
  );
}

/* ---------- Helpers ---------- */

function formatCurrency(n: number | null) {
  if (n === null || n === undefined) return "—";

  const format = (num: number) =>
    Number.isInteger(num) ? num : Number(num.toFixed(1));

  if (n >= 10_000_000) {
    return `₹${format(n / 10_000_000)} Cr`;
  }

  if (n >= 100_000) {
    return `₹${format(n / 100_000)} Lakh`;
  }

  if (n >= 1_000) {
    return `₹${format(n / 1_000)}K`;
  }

  return `₹${n.toLocaleString("en-IN")}`;
}


function formatNumber(n: number | null) {
  if (n === null || n === undefined) return "—";

  const format = (num: number) =>
    Number.isInteger(num) ? num : Number(num.toFixed(1));

  if (n >= 10_000_000) {
    return `${format(n / 10_000_000)} Cr`;
  }

  if (n >= 100_000) {
    return `${format(n / 100_000)} Lakh`;
  }

  if (n >= 1_000) {
    return `${format(n / 1_000)}K`;
  }

  return n.toLocaleString("en-IN");
}


function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN");
}
