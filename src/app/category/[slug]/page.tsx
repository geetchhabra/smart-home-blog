// src/app/category/[slug]/page.tsx
'use client'

import { client } from '@/lib/sanity'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import PostCard from '@/components/PostCard'
import PageHero from '@/components/PageHero'
import Link from 'next/link'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage: any
  categories?: any[]
}

interface Category {
  title: string
  description?: string
  posts: Post[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

// Fix: Add proper type that satisfies Next.js 15 requirements
type PageProps = {
  params: Promise<{ slug: string }> | { slug: string }
}

export default function CategoryPage({ params }: PageProps) {
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState<string | null>(null)

  useEffect(() => {
    const resolveParams = async () => {
      // Handle both Promise and direct params
      const resolvedParams = await Promise.resolve(params)
      setSlug(resolvedParams.slug)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (!slug) return

    const getCategory = async () => {
      const query = `*[_type == "category" && slug.current == $slug][0]{
        title,
        description,
        "posts": *[_type == "post" && references(^._id) && publishedAt < now()] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          mainImage,
          categories[]->{ _id, title, slug }
        }
      }`
      const fetchedCategory = await client.fetch(query, { slug })
      setCategory(fetchedCategory)
      setLoading(false)
    }
    getCategory()
  }, [slug])

  if (loading || !slug) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400">Loading category...</p>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 mb-4">
            Category not found.
          </p>
          <Link href="/categories" className="text-brand hover:underline text-sm sm:text-base">
            ← Back to Categories
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <PageHero
        title={category.title}
        description={category.description}
      >
        <div className="flex flex-col gap-3 sm:gap-4 items-center px-4">
          <Link
            href="/categories"
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 hover:border-white/40 transition-all duration-300 text-sm sm:text-base"
          >
            ← All Categories
          </Link>
          <p className="text-slate-300 dark:text-slate-400 text-sm sm:text-base">
            {category.posts?.length || 0} {category.posts?.length === 1 ? 'article' : 'articles'}
          </p>
        </div>
      </PageHero>

      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {category.posts && category.posts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {category.posts.map((post, index) => (
                <motion.div key={post._id} variants={itemVariants}>
                  <PostCard post={post} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 sm:py-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80"
            >
              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 px-4">
                No articles in this category yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
