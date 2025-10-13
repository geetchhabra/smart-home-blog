// src/components/ArticleSearch.tsx
'use client'

import { useState, useMemo } from 'react'
import PostCard from './PostCard'
import type { Article } from '@/app/articles/page'

export default function ArticleSearch({ articles }: { articles: Article[] }) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest')

  const filteredAndSorted = useMemo(() => {
    let result = articles

    // Filter by search
    if (search.trim()) {
      const searchLower = search.toLowerCase()
      result = result.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt?.toLowerCase().includes(searchLower)
      )
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title)
      } else if (sortBy === 'oldest') {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      }
      // newest (default)
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })

    return result
  }, [articles, search, sortBy])

  return (
    <div>
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        {/* Search Bar */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search articles..."
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

        {/* Sort Filter */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'alphabetical')}
          className="px-6 py-4 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 focus:border-brand dark:focus:border-brand-light focus:outline-none transition-colors text-ink dark:text-white"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="alphabetical">A-Z</option>
        </select>
      </div>

      {/* Results */}
      {filteredAndSorted.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSorted.map((article, index) => (
              <PostCard key={article._id} post={article} index={index} />
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              {search
                ? `Found ${filteredAndSorted.length} of ${articles.length} articles`
                : `Showing all ${articles.length} ${articles.length === 1 ? 'article' : 'articles'}`
              }
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-2">
            No articles found{search && ` matching "${search}"`}
          </p>
          <button
            onClick={() => setSearch('')}
            className="text-brand dark:text-brand-light hover:underline mt-4"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  )
}
