'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isActive = (path) => pathname === path

  const navItems = [
    { href: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/posts', label: 'Posts', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' }
  ]

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-slate-200/50'
          : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl border-b border-slate-700/50'
        }`}>
        <div className={`absolute inset-0 transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'
          }`}>
          <div className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")] opacity-20`}></div>
        </div>

        <nav className="container mx-auto px-6 relative">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-4">
              <Link href="/" className="group flex items-center space-x-3">
                <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isScrolled
                    ? 'bg-gradient-to-br from-blue-500 to-emerald-500 shadow-lg group-hover:shadow-xl group-hover:scale-105'
                    : 'bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 group-hover:shadow-2xl group-hover:shadow-blue-500/25'
                  }`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>

                <div className="hidden sm:block">
                  <h1 className={`text-2xl font-black transition-all duration-300 ${isScrolled
                      ? 'bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-emerald-300'
                    }`}>
                  </h1>
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 relative ${isActive(item.href)
                      ? isScrolled
                        ? 'text-blue-600 bg-blue-50 shadow-sm'
                        : 'text-white bg-white/10 shadow-lg backdrop-blur-sm'
                      : isScrolled
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span>{item.label}</span>

                  {isActive(item.href) && (
                    <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${isScrolled ? 'bg-blue-500' : 'bg-emerald-400'
                      }`}></div>
                  )}

                  {!isActive(item.href) && (
                    <span className={`absolute -bottom-1 left-4 right-4 h-0.5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isScrolled ? 'bg-slate-400' : 'bg-blue-400'
                      }`}></span>
                  )}
                </Link>
              ))}

            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${isScrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                }`}
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        <div className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ${isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}>
          <div className={`mx-6 mb-6 rounded-2xl shadow-2xl border backdrop-blur-xl ${isScrolled
              ? 'bg-white/95 border-slate-200/50'
              : 'bg-slate-900/95 border-slate-700/50'
            }`}>
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 p-4 rounded-xl font-semibold transition-all duration-200 ${isActive(item.href)
                      ? isScrolled
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-white bg-white/10'
                      : isScrolled
                        ? 'text-slate-600 hover:bg-slate-50'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span>{item.label}</span>
                  {isActive(item.href) && (
                    <div className={`ml-auto w-2 h-2 rounded-full ${isScrolled ? 'bg-blue-500' : 'bg-emerald-400'
                      }`}></div>
                  )}
                </Link>
              ))}

              <div className={`pt-4 border-t ${isScrolled ? 'border-slate-200' : 'border-slate-700'}`}>
                <button className={`w-full p-4 rounded-xl font-semibold transition-all duration-300 ${isScrolled
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                    : 'bg-white/10 text-white border border-white/20'
                  }`}>
                  Subscribe to Newsletter
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="h-16 lg:h-20"></div>
    </>
  )
}