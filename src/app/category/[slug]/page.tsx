// src/app/category/[slug]/page.tsx

import { client } from '@/lib/sanity'
import PostCard from '@/components/PostCard'
import PageHero from '@/components/PageHero'
import Link from 'next/link'
import type { Metadata } from 'next'

// Interface for Post (can be shared or defined here)
interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage: any
  categories?: any[]
}

// Interface for the fetched Category data
interface Category {
  title: string
  description?: string
  posts: Post[]
}

// 1. Add generateMetadata function for dynamic titles/descriptions
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const query = `*[_type == "category" && slug.current == $slug][0]{
    title,
    description
  }`
  const category = await client.fetch(query, { slug: params.slug })

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} | ConnectedHome`,
    description: category.description || `Articles in the ${category.title} category.`,
  }
}

// 2. Server-side data fetching function
async function getCategory(slug: string) {
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
  const fetchedCategory = await client.fetch<Category>(query, { slug })
  return fetchedCategory
}

// 3. Page component is now async
export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const category = await getCategory(slug)

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
            // 4. Replaced motion.div with div
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {category.posts.map((post, index) => (
                // PostCard is a Client Component, so it's fine
                <PostCard post={post} index={index} key={post._id} />
              ))}
            </div>
          ) : (
            // 4. Replaced motion.div with div
            <div
              className="text-center py-12 sm:py-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80"
            >
              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 px-4">
                No articles in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}