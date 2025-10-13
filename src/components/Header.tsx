// src/components/Header.tsx
'use client'

import Link from 'next/link'
import { ThemeSwitcher } from './ThemeSwitcher'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl sm:text-2xl font-bold font-display text-brand dark:text-brand-light hover:opacity-80 transition-opacity"
          >
            ConnectedHome
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-slate-700 dark:text-slate-300 hover:text-brand dark:hover:text-brand-light transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/articles" 
              className="text-slate-700 dark:text-slate-300 hover:text-brand dark:hover:text-brand-light transition-colors font-medium"
            >
              Articles
            </Link>
            <Link 
              href="/categories" 
              className="text-slate-700 dark:text-slate-300 hover:text-brand dark:hover:text-brand-light transition-colors font-medium"
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className="text-slate-700 dark:text-slate-300 hover:text-brand dark:hover:text-brand-light transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-slate-700 dark:text-slate-300 hover:text-brand dark:hover:text-brand-light transition-colors font-medium"
            >
              Contact
            </Link>
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
              >
                Home
              </Link>
              <Link 
                href="/articles" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
              >
                Articles
              </Link>
              <Link 
                href="/categories" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
              >
                Categories
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
