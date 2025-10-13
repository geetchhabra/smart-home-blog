// src/components/CategorySearch.tsx (note the exact casing!)
'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Category } from '@/app/categories/page'

export default function CategorySearch({ categories }: { categories: Category[] }) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'popularity' | 'alphabetical'>('popularity')

  const filteredAndSorted = useMemo(() => {
    let result = categories

    // Filter by search
    if (search.trim()) {
      const searchLower = search.toLowerCase()
      result = result.filter(cat => 
        cat.title.toLowerCase().includes(searchLower) ||
        cat.description?.toLowerCase().includes(searchLower)
      )
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title)
      }
      // popularity (default)
      return b.postCount - a.postCount
    })

    return result
  }, [categories, search, sortBy])

  // Split into featured (top 6) and others
  const featuredCategories = filteredAndSorted.slice(0, 6)
  const otherCategories = filteredAndSorted.slice(6)

  return (
    <div>
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 focus:border-brand dark:focus:border-brand-light focus:outline-none transition-colors text-ink dark:text-white placeholder-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              ✕
            </button>
          )}
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'popularity' | 'alphabetical')}
          className="px-6 py-4 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 focus:border-brand dark:focus:border-brand-light focus:outline-none transition-colors text-ink dark:text-white"
        >
          <option value="popularity">Most Popular</option>
          <option value="alphabetical">A-Z</option>
        </select>
      </div>

      {/* Results */}
      {filteredAndSorted.length > 0 ? (
        <>
          {/* Featured Categories (Large Cards) */}
          {featuredCategories.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold font-display text-ink dark:text-white mb-6">
                {search ? 'Top Results' : 'Popular Categories'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCategories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug}`}
                    className="group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800/80 p-8 hover:shadow-xl hover:border-brand/50 dark:hover:border-brand/50 transition-all duration-300"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative">
                      <h3 className="text-2xl font-bold text-ink dark:text-white mb-2 group-hover:text-brand dark:group-hover:text-brand-light transition-colors">
                        {category.title}
                      </h3>
                      
                      {category.description && (
                        <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                          {category.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-brand dark:text-brand-light">
                          {category.postCount} {category.postCount === 1 ? 'article' : 'articles'}
                        </span>
                        
                        <span className="text-brand dark:text-brand-light opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Other Categories (Compact List) */}
          {otherCategories.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold font-display text-ink dark:text-white mb-6">
                {search ? 'More Results' : 'All Categories'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {otherCategories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug}`}
                    className="group flex items-center justify-between p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-200/80 dark:border-slate-800/80 hover:border-brand/50 dark:hover:border-brand/50 transition-all duration-300"
                  >
                    <span className="font-semibold text-ink dark:text-white group-hover:text-brand dark:group-hover:text-brand-light transition-colors truncate pr-2">
                      {category.title}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 flex-shrink-0">
                      {category.postCount}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              {search 
                ? `Found ${filteredAndSorted.length} of ${categories.length} categories`
                : `Showing all ${categories.length} ${categories.length === 1 ? 'category' : 'categories'}`
              }
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-2">
            No categories found matching &quot;{search}&quot;
          </p>
          <button
            onClick={() => setSearch('')}
            className="text-brand dark:text-brand-light hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  )
}
