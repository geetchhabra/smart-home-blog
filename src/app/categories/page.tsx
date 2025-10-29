// src/app/categories/page.tsx

import { client } from '@/lib/sanity'
import CategorySearch from '@/components/CategorySearch'
import PageHero from '@/components/PageHero'
import type { Metadata } from 'next'; // Import Metadata

// 1. Add Metadata
export const metadata: Metadata = {
  title: 'Browse Categories | ConnectedHome',
  description: 'Explore all smart home articles and guides organized by topic.',
};

export interface Category {
  _id: string
  title: string
  slug: string
  description?: string
  postCount: number
}

// 2. Server-side data fetching function
async function getCategories() {
  const query = `*[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
    description,
    "postCount": count(*[_type == "post" && references(^._id) && publishedAt < now()])
  } [postCount > 0] | order(postCount desc)`
  
  const fetchedCategories = await client.fetch(query)
  return fetchedCategories;
}

// 3. Make the component async
export default async function CategoriesPage() {
  // 4. Await the data
  const categories = await getCategories();

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
            // CategorySearch is a client component, this is fine
            <CategorySearch categories={categories} />
          ) : (
            // 5. Replaced motion.div with div
            <div
              className="text-center py-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80"
            >
              <p className="text-xl text-slate-500 dark:text-slate-400">
                No categories with published articles yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}