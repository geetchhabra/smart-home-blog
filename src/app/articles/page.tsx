// src/app/articles/page.tsx
// NO "use client" directive - this is now a Server Component!

import { client } from '@/lib/sanity'
import ArticleSearch from '@/components/ArticleSearch'
import PageHero from '@/components/PageHero'
import { Metadata } from 'next' // Import Metadata

// This interface can stay
export interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage: any
  categories?: Array<{ _id: string; title: string; slug: { current: string } }>
  publishedAt: string
}

// 1. Add specific metadata for this page
export const metadata: Metadata = {
  title: 'All Articles | ConnectedHome',
  description: 'Search and filter through our complete article collection on smart home technology, guides, and reviews.',
};

// 2. Create a function to fetch data on the server
async function getArticles() {
  const query = `*[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    categories[]-> { _id, title, slug },
    publishedAt
  }`
  // We fetch directly. The 'client' is available on the server.
  const fetchedArticles = await client.fetch<Article[]>(query)
  return fetchedArticles
}

// 3. The page itself is now an async function
export default async function ArticlesPage() {
  // 4. We fetch the data *before* the page renders
  const articles = await getArticles()

  return (
    <div className="relative">
      <PageHero
        badge="Explore Our Content"
        title="All Articles"
        description="Search and filter through our complete article collection"
      />

      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* This logic now checks if we fetched any articles.
            If 'articles.length' is 0, it means there are no articles,
            not that they are "loading".
          */}
          {articles.length > 0 ? (
            // ArticleSearch is a Client Component, so it's
            // perfectly fine to use here. We pass the server-fetched
            // data to it as a prop.
            <ArticleSearch articles={articles} />
          ) : (
            // 5. Replaced 'motion.div' with a regular 'div'
            //    since 'motion' requires "use client".
            <div
              className="text-center py-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80"
            >
              <p className="text-xl text-slate-500 dark:text-slate-400">
                No articles have been published yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}