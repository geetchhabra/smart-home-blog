// src/app/articles/page.tsx
'use client'

import { client } from '@/lib/sanity'
import { useEffect, useState } from 'react'
import ArticleSearch from '@/components/ArticleSearch'
import PageHero from '@/components/PageHero'
import { motion } from 'framer-motion'

export interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage: any
  categories?: Array<{ _id: string; title: string; slug: { current: string } }>
  publishedAt: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const getArticles = async () => {
      const query = `*[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        categories[]-> { _id, title, slug },
        publishedAt
      }`
      const fetchedArticles = await client.fetch(query)
      setArticles(fetchedArticles)
    }
    getArticles()
  }, [])

  return (
    <div className="relative">
      <PageHero
        badge="Explore Our Content"
        title="All Articles"
        description="Search and filter through our complete article collection"
      />

      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {articles.length > 0 ? (
            <ArticleSearch articles={articles} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80"
            >
              <p className="text-xl text-slate-500 dark:text-slate-400">
                No articles published yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
