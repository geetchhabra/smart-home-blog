// src/app/categories/page.tsx
'use client'

import { client } from '@/lib/sanity'
import { useEffect, useState } from 'react'
import CategorySearch from '@/components/CategorySearch'
import PageHero from '@/components/PageHero'
import { motion } from 'framer-motion'

export interface Category {
  _id: string
  title: string
  slug: string
  description?: string
  postCount: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const getCategories = async () => {
      const query = `*[_type == "category"] {
        _id,
        title,
        "slug": slug.current,
        description,
        "postCount": count(*[_type == "post" && references(^._id) && publishedAt < now()])
      } [postCount > 0] | order(postCount desc)`
      
      const fetchedCategories = await client.fetch(query)
      setCategories(fetchedCategories)
    }
    getCategories()
  }, [])

  return (
    <div className="relative">
      <PageHero
        badge="Organized Content"
        title="Browse Categories"
        description="Explore articles organized by topic"
      />

      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {categories.length > 0 ? (
            <CategorySearch categories={categories} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80"
            >
              <p className="text-xl text-slate-500 dark:text-slate-400">
                No categories with published articles yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
