// src/components/PageHero.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageHeroProps {
  badge?: string
  title: string | ReactNode
  description?: string
  children?: ReactNode
  height?: 'default' | 'tall' // default: 50vh, tall: 75vh
}

export default function PageHero({ 
  badge, 
  title, 
  description, 
  children,
  height = 'default'
}: PageHeroProps) {
  const heightClass = height === 'tall' ? 'min-h-[75vh]' : 'min-h-[50vh]'

  return (
    <section className={`relative ${heightClass} flex items-center justify-center overflow-hidden px-6 py-20`}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-purple-900/80 to-slate-900/90 dark:from-brand-dark dark:via-purple-950 dark:to-slate-950" />
      
      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.3),transparent_50%)]" />
      
      {/* Animated light rays */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand-light to-transparent animate-pulse" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse delay-1000" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-brand-light to-transparent animate-pulse delay-2000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-5xl mx-auto"
      >
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-brand/20 dark:bg-brand/10 border border-brand/30 text-brand-light text-sm font-medium backdrop-blur-sm">
              {badge}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-200 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-light to-transparent" />
    </section>
  )
}
