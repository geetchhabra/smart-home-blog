// src/app/about/page.tsx
// NO 'use client'
import PageHero from '@/components/PageHero'
import type { Metadata } from 'next'; // Import Metadata

// 1. Add Metadata
export const metadata: Metadata = {
  title: 'About Us | ConnectedHome',
  description: 'Learn more about ConnectedHome and our mission to simplify smart living.',
};

export default function AboutPage() {
  return (
    <div className="relative">
      <PageHero
        badge="Our Mission"
        title="About Us"
        description="Learn more about ConnectedHome and our mission to simplify smart living."
      />

      {/* Main Content - Fixed responsive padding */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* 2. Replaced motion.div with div */}
          <div
            className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 md:p-12 mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink dark:text-white mb-4 sm:mb-6">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              At ConnectedHome, our mission is to demystify the world of smart home technology. We believe that everyone deserves a home that is safer, more efficient, and more enjoyable.
            </p>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              We&apos;re here to provide clear, honest, and practical advice to help you build the smart home of your dreams, one device at a time.
            </p>
          </div>

          {/* 2. Replaced motion.div with div */}
          <div
            className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 md:p-12 mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink dark:text-white mb-6 sm:mb-8">
              What We Offer
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <span className="text-brand dark:text-brand-light text-2xl sm:text-3xl mr-3 sm:mr-4 flex-shrink-0">📱</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-ink dark:text-white mb-2">
                    Expert Reviews
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    In-depth analysis of the latest smart home devices and technologies.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-brand dark:text-brand-light text-2xl sm:text-3xl mr-3 sm:mr-4 flex-shrink-0">🛠️</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-ink dark:text-white mb-2">
                    Step-by-Step Guides
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    Step-by-step tutorials to help you set up and optimize your smart home.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-brand dark:text-brand-light text-2xl sm:text-3xl mr-3 sm:mr-4 flex-shrink-0">🔮</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-ink dark:text-white mb-2">
                    Industry Insights
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    Stay updated with cutting-edge innovations in home automation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Replaced motion.div with div */}
          <div
            className="bg-gradient-to-br from-brand/10 to-purple-500/10 dark:from-brand/20 dark:to-purple-500/20 backdrop-blur-md rounded-2xl shadow-lg border border-brand/20 p-6 sm:p-8 md:p-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink dark:text-white mb-4 sm:mb-6">
              About the Authors
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We are professional tech enthusiast with a passion for home automation. After years of experimenting with countless smart devices, We have created this blog to share our findings, tutorials, and reviews with a wider audience.
            </p>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Our goal is to be your trusted resource in the exciting and ever-evolving landscape of smart living.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}