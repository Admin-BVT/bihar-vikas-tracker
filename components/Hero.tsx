import { supabaseAdmin } from "@/lib/supabase";


export default async function Hero() {

  const supabase = supabaseAdmin();

const { data: projects, error } = await supabase
  .from("projects")
  .select("budget, progress, status");

if (error || !projects) {
  console.error("Hero fetch error:", error);
  return null;
}

const totalProjects = projects.length;

const totalBudget = projects.reduce(
  (sum, p) => sum + (p.budget ?? 0),
  0
);

const completed = projects.filter(
  (p) => p.status === "Completed"
).length;

// If you don't store "spent", we calculate utilization from progress
const avgProgress =
  projects.length > 0
    ? (
        projects.reduce(
          (sum, p) => sum + (p.progress ?? 0),
          0
        ) / projects.length
      ).toFixed(0)
    : 0;


  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Professional gradient using your colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B263B] via-[#415A77] to-[#0D1B2A]"></div>
      
      {/* Subtle floating elements */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-[#B3AF8F]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#415A77]/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-block mb-6 px-6 py-2 bg-[#B3AF8F]/20 backdrop-blur-sm rounded-full border border-[#B3AF8F]/30">
          <span className="text-[#E0E1DD] font-bold text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-[#B3AF8F] rounded-full animate-pulse"></span>
            🎯 Transparency First
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          <span className="text-white drop-shadow-2xl">Sachcha Vikas, </span>
          <br />
          <span className="text-[#B3AF8F] drop-shadow-2xl">
            Sabke Saamne
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[#E0E1DD] max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          Track every development project in Bihar with complete transparency.<br />
          <span className="font-bold text-white">No politics, just data.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a 
            href="/districts" 
            className="group px-10 py-5 bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#2563eb] text-white font-black rounded-xl transition-all shadow-2xl hover:shadow-blue-500/50 hover:scale-105 flex items-center gap-3 text-lg"
          >
            Explore Projects
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          
          <a 
            href="/transparency" 
            className="px-10 py-5 bg-transparent text-white font-bold rounded-xl transition-all border-2 border-white/40 hover:bg-white/10 hover:border-white/60 shadow-lg text-lg"
          >
            How We Verify
          </a>
        </div>

        {/* PROFESSIONAL VIBRANT STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Total Projects - Blue */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-400/30 hover:border-blue-400/50 transition-all hover:scale-105 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">📊</div>
                <span className="text-xs text-blue-200 font-bold uppercase tracking-wider">Total</span>
              </div>
              <div className="text-white">
                <div className="text-5xl font-black mb-1">{totalProjects}
</div>
                <div className="text-sm text-blue-100 font-semibold">Projects</div>
              </div>
            </div>
          </div>

          {/* Completed - Green */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border-2 border-emerald-400/30 hover:border-emerald-400/50 transition-all hover:scale-105 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">✅</div>
                <span className="text-xs text-emerald-200 font-bold uppercase tracking-wider">Done</span>
              </div>
              <div className="text-white">
                <div className="text-5xl font-black mb-1">{completed}</div>
                <div className="text-sm text-emerald-100 font-semibold">Completed</div>
              </div>
            </div>
          </div>

          {/* Total Budget - Purple (NO PINK BORDER!) */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-400/30 hover:border-purple-400/50 transition-all hover:scale-105 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">💰</div>
                <span className="text-xs text-purple-200 font-bold uppercase tracking-wider">Budget</span>
              </div>
              <div className="text-white">
                <div className="text-4xl font-black mb-1">
                  ₹{(totalBudget / 10000000).toFixed(0)}Cr
                </div>
                <div className="text-sm text-purple-100 font-semibold">Allocated</div>
              </div>
            </div>
          </div>

          {/* Funds Utilized - Orange */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-400/30 hover:border-orange-400/50 transition-all hover:scale-105 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">📈</div>
                <span className="text-xs text-orange-200 font-bold uppercase tracking-wider">Used</span>
              </div>
              <div className="text-white">
                <div className="text-5xl font-black mb-1">{avgProgress}%
</div>
                <div className="text-sm text-orange-100 font-semibold">Utilized</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
