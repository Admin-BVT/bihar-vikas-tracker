'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from "next/image"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-[#1B263B] to-[#415A77] text-white sticky top-0 z-50 shadow-lg border-b border-slate-700">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
  src="/branding/logo-primary.svg"
  alt="Bihar Vikas Tracker Logo"
  width={40}
  height={40}
  className="group-hover:scale-105 transition-transform"
/>
            <span className="font-black text-xl hidden md:block group-hover:text-[#B3AF8F] transition-colors">
              Bihar Vikas Tracker
            </span>
            <span className="font-black text-lg md:hidden group-hover:text-[#B3AF8F] transition-colors">
              BV Tracker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="hover:text-[#B3AF8F] font-semibold transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B3AF8F] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/districts" className="hover:text-[#B3AF8F] font-semibold transition-colors relative group">
              Districts
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B3AF8F] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/categories" className="hover:text-[#B3AF8F] font-semibold transition-colors relative group">
              Categories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B3AF8F] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/dashboard" className="hover:text-[#B3AF8F] font-semibold transition-colors relative group">
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B3AF8F] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/search" className="hover:text-[#B3AF8F] font-semibold transition-colors relative group">
              Search
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B3AF8F] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/transparency" className="hover:text-[#B3AF8F] font-semibold transition-colors relative group">
              How We Verify
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B3AF8F] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/about" className="hover:text-[#B3AF8F] font-semibold transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B3AF8F] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[600px] pb-4' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
            <Link 
              href="/" 
              className="hover:text-[#B3AF8F] hover:bg-white/5 font-semibold transition-all py-3 px-4 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏠 Home
            </Link>
            <Link 
              href="/districts" 
              className="hover:text-[#B3AF8F] hover:bg-white/5 font-semibold transition-all py-3 px-4 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              📍 Districts
            </Link>
            <Link 
              href="/categories" 
              className="hover:text-[#B3AF8F] hover:bg-white/5 font-semibold transition-all py-3 px-4 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              📁 Categories
            </Link>
            <Link 
              href="/dashboard" 
              className="hover:text-[#B3AF8F] hover:bg-white/5 font-semibold transition-all py-3 px-4 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              📊 Dashboard
            </Link>
            <Link 
              href="/search" 
              className="hover:text-[#B3AF8F] hover:bg-white/5 font-semibold transition-all py-3 px-4 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              🔍 Search
            </Link>
            <Link 
              href="/transparency" 
              className="hover:text-[#B3AF8F] hover:bg-white/5 font-semibold transition-all py-3 px-4 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✅ How We Verify
            </Link>
            <Link 
              href="/about" 
              className="hover:text-[#B3AF8F] hover:bg-white/5 font-semibold transition-all py-3 px-4 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              ℹ️ About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
