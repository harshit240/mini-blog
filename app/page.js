'use client'
import Link from "next/link"
import { useState, useEffect } from 'react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    setIsVisible(true)

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const stats = [
    { number: "10K+", label: "Monthly Readers", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" },
    { number: "500+", label: "Articles Published", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { number: "50+", label: "Expert Authors", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
    { number: "95%", label: "Reader Satisfaction", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.02\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1.5\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      <div className="relative min-h-screen flex items-center justify-center py-20">
        <div className="text-center px-6 max-w-7xl mx-auto">

          <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            <div className="mb-8">
              <h3 className="text-6xl md:text-6xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-slate-900 via-blue-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
                Mini Blog
              </h3>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full animate-pulse"></div>
                <div className="w-16 h-1.5 bg-gradient-to-l from-emerald-500 to-transparent rounded-full"></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                href="/posts"
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:via-blue-800 hover:to-emerald-700 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Explore Articles</span>
                <svg className="relative z-10 w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              {/* <Link
                href="/about"
                className="group inline-flex items-center justify-center px-10 py-5 bg-white/80 backdrop-blur-sm border-2 border-slate-300 text-slate-700 font-bold rounded-2xl hover:border-slate-400 hover:bg-white/90 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </Link> */}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}