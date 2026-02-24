import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Script from "next/script"

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: "Bihar Vikas Tracker",
  description:
    "Independent civic data platform structuring publicly available development data across Bihar.",
  icons: {
    icon: "/branding/favicon.ico",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Bihar Vikas Tracker",
      url: "https://yourdomain.com",
      logo: "https://yourdomain.com/branding/logo-192.png",
    }),
  }}
/>
      <body className={`${geistSans.className} overflow-x-hidden`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

