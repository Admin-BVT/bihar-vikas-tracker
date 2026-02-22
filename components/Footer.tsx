import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#1B263B] to-[#415A77] text-white border-t border-white/10">

      {/* Main Section */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/branding/logo-32.png"
                alt="Bihar Vikas Tracker"
                width={36}
                height={36}
              />
              <span className="font-bold text-lg">
                Bihar Vikas Tracker
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-xs">
              Independent civic platform structuring publicly available development data across Bihar.
            </p>
          </div>

          {/* Connect */}
          <div>
            <p className="text-sm font-semibold text-[#B3AF8F] mb-3">
              Connect
            </p>

            <div className="flex flex-col space-y-2 text-sm text-slate-300">
              
              {/* 🔴 PUT YOUR LINKS HERE */}
              <a href="https://www.youtube.com/channel/UCHBnbcckI9bMhcl6G2-iS5A" target="_blank" className="hover:text-white transition">
                YouTube
              </a>

              <a href="https://www.instagram.com/biharvikas_tracker?igsh=eml3dXV2aThoczRj" target="_blank" className="hover:text-white transition">
                Instagram
              </a>

              <a href="mailto:biharvikastracker@gmail.com" className="hover:text-white transition">
                Email
              </a>

            </div>
          </div>

          {/* Governance & Reporting */}
          <div>
            <p className="text-sm font-semibold text-[#B3AF8F] mb-3">
              Governance
            </p>

            <div className="flex flex-col space-y-2 text-sm text-slate-300 mb-4">
              <Link href="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="hover:text-white transition">
                Disclaimer
              </Link>
            </div>

            {/* Report Button */}
            <a
              href="mailto:biharvikastracker@gmail.com?subject=Report%20Issue%20-%20Bihar%20Vikas%20Tracker"
              className="inline-block px-4 py-2 bg-[#B3AF8F] text-[#1B263B] font-semibold rounded-md hover:opacity-90 transition"
            >
              Report Issue
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6 grid md:grid-cols-2 gap-4 text-sm">

          <div className="text-slate-300">
            © {new Date().getFullYear()} Bihar Vikas Tracker
          </div>

          <div className="space-y-1 md:text-right text-slate-200">
            <p className="font-medium">
              Uses privacy-respecting analytics. No personal profiling.
            </p>
            <p className="font-medium">
              Sponsorships do not influence data presentation or neutrality.
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
}