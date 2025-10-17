// src/components/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-slate-900 dark:bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-brand-light mb-3">
              ConnectedHome
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Your ultimate guide to smart home technology and automation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-white mb-3 text-base sm:text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link href="/" className="text-slate-400 hover:text-brand-light transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-slate-400 hover:text-brand-light transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-400 hover:text-brand-light transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-brand-light transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-white mb-3 text-base sm:text-lg">Legal</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-brand-light transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-brand-light transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-brand-light transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 text-center text-slate-400 text-sm">
          <p>&copy; {currentYear} ConnectedHome. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
