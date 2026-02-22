import Link from 'next/link'

export default function TransparencyPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B263B] to-[#415A77] py-20">
        <div className="container mx-auto px-6">
          <p className="text-[#B3AF8F] font-bold text-sm mb-3 uppercase tracking-wider">
            DATA SOURCING FRAMEWORK
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            How We Source & Review Data
          </h1>
          <p className="text-slate-200 text-xl max-w-3xl leading-relaxed">
            How We Collect & Validate Information
          </p>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
            <span className="text-4xl">📋</span>
            Our Data Sources
          </h2>

          <div className="bg-[#2C3E50] rounded-2xl p-8 mb-8 border border-slate-700">
            <p className="text-lg text-slate-200 leading-relaxed">
              Project information is compiled from <span className="text-blue-400 font-bold">publicly available government records</span>. 
              Where possible, data points are compared across multiple official publications before being structured on our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Government Portals */}
            <div className="bg-[#1B263B] rounded-2xl p-6 border border-slate-700 hover:border-blue-500 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  🏛️
                </div>
                <h3 className="text-xl font-black text-white">Government Portals</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Official Bihar government websites and departmental portals publishing development projects and budget allocations.
              </p>
            </div>

            {/* RTI Responses */}
            <div className="bg-[#1B263B] rounded-2xl p-6 border border-slate-700 hover:border-emerald-500 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  📄
                </div>
                <h3 className="text-xl font-black text-white">RTI Responses</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Information made available through Right to Information (RTI) disclosures published by relevant departments.
              </p>
            </div>

            {/* Press Releases */}
            <div className="bg-[#1B263B] rounded-2xl p-6 border border-slate-700 hover:border-purple-500 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  📰
                </div>
                <h3 className="text-xl font-black text-white">Press Releases</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Official press releases and public announcements regarding project launches, approvals, and completion updates.
              </p>
            </div>

            {/* Public Documentation (Replaced Field Visits) */}
            <div className="bg-[#1B263B] rounded-2xl p-6 border border-slate-700 hover:border-orange-500 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  📑
                </div>
                <h3 className="text-xl font-black text-white">Public Documentation</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Budget documents, departmental publications, and publicly released datasets related to development initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Review Process */}
      <section className="py-16 bg-black border-t border-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-12 flex items-center gap-3">
            <span className="text-4xl">✅</span>
            Our Data Review Process
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-black text-white shadow-lg">
                1
              </div>
              <h3 className="text-lg font-black text-white mb-2">Data Collection</h3>
              <p className="text-sm text-slate-300">
                Gather publicly available project information from official sources.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-black text-white shadow-lg">
                2
              </div>
              <h3 className="text-lg font-black text-white mb-2">Data Structuring</h3>
              <p className="text-sm text-slate-300">
                Standardize and categorize data for consistency and comparability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-black text-white shadow-lg">
                3
              </div>
              <h3 className="text-lg font-black text-white mb-2">Consistency Review</h3>
              <p className="text-sm text-slate-300">
                Check for formatting issues or obvious discrepancies across records.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-black text-white shadow-lg">
                4
              </div>
              <h3 className="text-lg font-black text-white mb-2">Publication</h3>
              <p className="text-sm text-slate-300">
                Publish structured project entries for public access.
              </p>
            </div>
          </div>
        </div>
      </section>

   <section className="bg-black py-20">
  <div className="max-w-4xl mx-auto px-6 text-center">
    
    <h2 className="text-4xl font-bold mb-6 text-white">
      Data Review Process
    </h2>

    <p className="text-slate-300 text-lg leading-relaxed">
  The platform structures project information using publicly available
  records and official documentation. Updates are incorporated when
  verifiable source material becomes available.
</p>

  </div>
</section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1B263B] to-[#415A77]">
        <div className="container mx-auto px-6 text-center">
<h2 className="text-3xl font-bold mb-4">
  Notice an Inconsistency?
</h2>

<p className="text-slate-300 max-w-2xl mx-auto mb-8">
  If you identify outdated, incorrect, or inconsistent information, you may report it for review. 
  Submissions are evaluated against publicly available records before any changes are made.
</p>

<a
  href="mailto:biharvikastracker@gmail.com?subject=Data%20Review%20Request%20-%20Bihar%20Vikas%20Tracker"
  className="inline-block px-6 py-3 bg-[#B3AF8F] text-[#1B263B] font-semibold rounded-md hover:opacity-90 transition"
>
  Report Issue →
</a>
        </div>
      </section>
    </div>
  )
}
