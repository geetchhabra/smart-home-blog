// src/app/about/page.tsx
'use client'

import { motion } from 'framer-motion'
import PageHero from '@/components/PageHero'

export default function AboutPage() {
  return (
    <div className="relative">
      <PageHero
        badge="Our Mission"
        title="About ConnectedHome"
        description="Learn more about ConnectedHome and our mission to simplify smart living."
      />

      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800/80 p-8 md:p-12 mb-12"
          >
            <h2 className="text-3xl font-bold font-display text-ink dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              At ConnectedHome, our mission is to demystify the world of smart home technology. We believe that everyone deserves a home that is safer, more efficient, and more enjoyable.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              We&apos;re here to provide clear, honest, and practical advice to help you build the smart home of your dreams, one device at a time.
            </p>
          </motion.div>

          {/* What We Offer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800/80 p-8 md:p-12 mb-12"
          >
            <h2 className="text-3xl font-bold font-display text-ink dark:text-white mb-8">
              What We Offer
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <span className="text-brand dark:text-brand-light text-3xl mr-4 flex-shrink-0">📱</span>
                <div>
                  <h3 className="text-xl font-semibold text-ink dark:text-white mb-2">
                    Expert Reviews
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    In-depth analysis of the latest smart home devices and technologies.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-brand dark:text-brand-light text-3xl mr-4 flex-shrink-0">🛠️</span>
                <div>
                  <h3 className="text-xl font-semibold text-ink dark:text-white mb-2">
                    Step-by-Step Guides
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Step-by-step tutorials to help you set up and optimize your smart home.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-brand dark:text-brand-light text-3xl mr-4 flex-shrink-0">🔮</span>
                <div>
                  <h3 className="text-xl font-semibold text-ink dark:text-white mb-2">
                    Industry Insights
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Stay updated with cutting-edge innovations in home automation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* About the Author */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-brand/10 to-purple-500/10 dark:from-brand/20 dark:to-purple-500/20 backdrop-blur-md rounded-2xl shadow-lg border border-brand/20 p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold font-display text-ink dark:text-white mb-6">
              About the Authors
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We are professional tech enthusiast with a passion for home automation. After years of experimenting with countless smart devices, We have created this blog to share our findings, tutorials, and reviews with a wider audience.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Our goal is to be your trusted resource in the exciting and ever-evolving landscape of smart living.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
