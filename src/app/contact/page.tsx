// src/app/contact/page.tsx
// NO 'use client'
import PageHero from '@/components/PageHero'
import type { Metadata } from 'next'; // Import Metadata

// 1. Add Metadata
export const metadata: Metadata = {
  title: 'Contact Us | ConnectedHome',
  description: 'Have a question, a tip, or just want to say hello? We\'d love to hear from you.',
};

export default function ContactPage() {
  return (
    <div className="relative">
      <PageHero
        badge="Get In Touch"
        title="Contact Us"
        description="Have a question, a tip, or just want to say hello? We'd love to hear from you."
      />

      {/* Fixed responsive padding */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* 2. Replaced motion.div with div */}
          <div
            className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 md:p-12 mb-6 sm:mb-8"
          >
            <div className="text-center mb-6 sm:mb-8">
              <span className="text-5xl sm:text-6xl mb-3 sm:mb-4 block">📧</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink dark:text-white mb-3 sm:mb-4">
                Email Us
              </h2>
            </div>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 text-center mb-4 sm:mb-6">
              The best way to reach us is by email. For all inquiries, please send a message to:
            </p>
            
            {/* Fixed email display */}
            <div className="text-center px-2">
              <a
                href="mailto:connectedhometech@protonmail.com"
                className="inline-block text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-brand dark:text-brand-light hover:underline transition-all break-all"
              >
                connectedhometech@protonmail.com
              </a>
            </div>
          </div>

          {/* 2. Replaced motion.div with div */}
          <div
            className="bg-gradient-to-br from-brand/10 to-purple-500/10 dark:from-brand/20 dark:to-purple-500/20 backdrop-blur-md rounded-2xl shadow-lg border border-brand/20 p-6 sm:p-8 md:p-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold font-display text-ink dark:text-white mb-3 sm:mb-4 text-center">
              Response Time
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 text-center mb-4 sm:mb-6">
              We do our best to respond to all messages within 48 hours. We look forward to connecting!
            </p>
            <div className="flex items-center justify-center text-brand dark:text-brand-light">
              <span className="text-3xl sm:text-4xl mr-2 sm:mr-3">⚡</span>
              <span className="text-base sm:text-lg font-semibold">Usually within 24-48 hours</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}