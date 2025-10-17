// src/app/contact/page.tsx
'use client'

import { motion } from 'framer-motion'
import PageHero from '@/components/PageHero'

export default function ContactPage() {
  return (
    <div className="relative">
      <PageHero
        badge="Get In Touch"
        title="Contact Us"
        description="Have a question, a tip, or just want to say hello? We'd love to hear from you."
      />

      <section className="relative py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800/80 p-8 md:p-12 mb-8"
          >
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">📧</span>
              <h2 className="text-3xl font-bold font-display text-ink dark:text-white mb-4">
                Email Us
              </h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 text-center mb-6">
              The best way to reach us is by email. For all inquiries, please send a message to:
            </p>
            <div className="text-center">
              <a
                href="mailto:connectedhometech@protonmail.com"
                className="inline-block text-2xl font-semibold text-brand dark:text-brand-light hover:underline transition-all"
              >
                connectedhometech@protonmail.com →
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-brand/10 to-purple-500/10 dark:from-brand/20 dark:to-purple-500/20 backdrop-blur-md rounded-2xl shadow-lg border border-brand/20 p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold font-display text-ink dark:text-white mb-4 text-center">
              Response Time
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 text-center mb-6">
              We do our best to respond to all messages within 48 hours. We look forward to connecting!
            </p>
            <div className="flex items-center justify-center text-brand dark:text-brand-light">
              <span className="text-4xl mr-3">⚡</span>
              <span className="text-lg font-semibold">Usually within 24-48 hours</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
