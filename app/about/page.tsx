import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B263B] to-[#415A77] py-20">
        <div className="container mx-auto px-6">
          <p className="text-[#B3AF8F] font-bold text-sm mb-3 uppercase tracking-wider">Learn About Us</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            About Bihar Vikas Tracker
          </h1>
          <p className="text-slate-200 text-xl max-w-3xl leading-relaxed">
           Structured public data on Bihar’s development projects — organized for clarity, accountability, and informed decision-making.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🎯</span>
              Our Mission
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
             Bihar Vikas Tracker compiles, standardizes, and presents publicly available government project data in a structured, searchable format.

             By documenting measurable development activity across districts and sectors, we aim to provide a  clearer picture of on-ground progress and contribute to a more balanced understanding of Bihar beyond outdated stereotypes.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
             Our platform compiles data from publicly available government sources, RTI disclosures, and official records to present structured information on project status, reported budgets, and beneficiary figures across Bihar.
            </p>
          </div>
        </div>
      </section>

      {/* What We Track */}
      <section className="py-16 bg-black border-t border-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12 text-center">
            What We Track
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1B263B] rounded-xl p-6 border border-slate-700">
              <div className="text-4xl mb-4">💰</div>
             <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Budget Information</h3>
<p className="text-slate-300 text-sm">
Reported allocation and expenditure figures as available from official sources
</p>

            </div>

            <div className="bg-[#1B263B] rounded-xl p-6 border border-slate-700">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Project Status</h3>
<p className="text-slate-300 text-sm">
Latest publicly reported updates on project progress and completion
</p>

            </div>

            <div className="bg-[#1B263B] rounded-xl p-6 border border-slate-700">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Beneficiary Figures</h3>
<p className="text-slate-300 text-sm">
Reported number of individuals associated with each initiative, where disclosed
</p>

            </div>

            <div className="bg-[#1B263B] rounded-xl p-6 border border-slate-700">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Location Data</h3>
              <p className="text-slate-300 text-sm">District-wise and category-wise project mapping</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-black border-t border-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12 text-center">
            Our Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                🔍
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Transparency</h3>
              <p className="text-slate-300">
                We organize and present publicly available government records in a structured format, with clear sourcing wherever applicable.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                ✅
              </div>
              <h3 className="text-lg sm:text-xl font-boldtext-white mb-3">Accuracy</h3>
              <p className="text-slate-300">
                Data is reviewed against multiple official references when possible to reduce inconsistencies and improve reliability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                🤝
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Accountability</h3>
              <p className="text-slate-300">
                By making project-level information accessible, we support independent review, discussion, and informed civic engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1B263B] to-[#415A77]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Start Exploring</h2>
          <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
            Discover how development projects are shaping Bihar's future.
          </p>
 <div className="flex justify-center">
  <Link
    href="/dashboard"
    className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-[#60a5fa] text-[#60a5fa] font-bold rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1B263B] hover:to-[#415A77] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-blue-500/20"
  >
    View Dashboard
    <span className="group-hover:translate-x-1 transition-transform duration-300">
      →
    </span>
  </Link>
</div>
        </div>
      </section>
    </div>
  )
}
