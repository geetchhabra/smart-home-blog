// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity' // Import your Sanity client

// Define types for your fetched data
interface Post {
  slug: { current: string }
  publishedAt: string // or _updatedAt if you prefer
}

interface Category {
  slug: { current: string }
}

// Your website's base URL
const BASE_URL = 'https://www.connectedhome.tech' // <-- REPLACE with your actual domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Get all your dynamic post URLs
  const postQuery = `*[_type == "post" && defined(slug.current)]{
    slug,
    publishedAt
  }`
  const posts = await client.fetch<Post[]>(postQuery)

  const postUrls = posts.map((post) => ({
    url: `${BASE_URL}/post/${post.slug.current}`,
    lastModified: new Date(post.publishedAt).toISOString(),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.8,
  }))

  // 2. Get all your dynamic category URLs
  const categoryQuery = `*[_type == "category" && defined(slug.current)]{
    slug
  }`
  const categories = await client.fetch<Category[]>(categoryQuery)

  const categoryUrls = categories.map((category) => ({
    url: `${BASE_URL}/category/${category.slug.current}`,
    lastModified: new Date().toISOString(), // Categories don't have a date, so use today
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.7,
  }))

  // 3. Define your static page URLs
  const staticUrls = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.3,
    },
  ]

  // 4. Combine all URLs and return
  return [...staticUrls, ...postUrls, ...categoryUrls]
}