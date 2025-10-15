// src/app/post/[slug]/page.tsx
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import PostCard from '@/components/PostCard'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  mainImage: any
  content?: string // Markdown field
  body?: any // Portable Text blocks
  excerpt: string
  publishedAt: string
  categories?: Array<{
    _id: string
    title: string
    slug: { current: string }
  }>
  author?: {
    name: string
    image?: any
  }
}

// --- METADATA FUNCTION ---
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    excerpt
  }`
  const post = await client.fetch(query, { slug: params.slug })

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | ConnectedHome`,
    description: post.excerpt,
  }
}

// Fetch post
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    content,
    body,
    excerpt,
    publishedAt,
    categories[]->{
      _id,
      title,
      slug
    },
    author->{
      name,
      image
    }
  }`
  const post = await client.fetch<Post>(query, { slug })
  return post
}

// Fetch related posts with fallback to latest
async function getRelatedPosts(postId: string, categoryIds: string[]) {
  // Try to get posts from same categories first
  if (categoryIds.length > 0) {
    const relatedQuery = `*[_type == "post" && _id != $postId && count((categories[]->_id)[@ in $categoryIds]) > 0] | order(publishedAt desc) [0...3]{
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      categories[]->{
        _id,
        title,
        slug
      },
      publishedAt
    }`
    const relatedPosts = await client.fetch<Post[]>(relatedQuery, { postId, categoryIds })
    
    // If we found related posts, return them
    if (relatedPosts.length > 0) {
      return relatedPosts
    }
  }
  
  // Fallback: get latest posts excluding current post
  const latestQuery = `*[_type == "post" && _id != $postId] | order(publishedAt desc) [0...3]{
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    categories[]->{
      _id,
      title,
      slug
    },
    publishedAt
  }`
  return client.fetch<Post[]>(latestQuery, { postId })
}

// Portable Text components
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
}

// --- PAGE COMPONENT ---
export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  const categoryIds = post.categories?.map((cat) => cat._id) || []
  const relatedPosts = await getRelatedPosts(post._id, categoryIds)

  const postDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Determine which field has content
  const hasMarkdown = post.content && post.content.trim().length > 0
  const hasPortableText = post.body && Array.isArray(post.body) && post.body.length > 0

  // Determine if we're showing related or latest articles
  const isShowingRelated = categoryIds.length > 0 && relatedPosts.length > 0
  const hasSharedCategory = isShowingRelated && relatedPosts.some((rp) =>
    rp.categories?.some((cat) => categoryIds.includes(cat._id))
  )

  return (
    <div className="px-4 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Main Article */}
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800/80 mb-16">
          {/* Hero Image */}
          {post.mainImage && (
            <div className="relative w-full aspect-[16/9] rounded-t-2xl overflow-hidden">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.mainImage.alt || 'Post image'}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <article className="px-4 sm:px-8 lg:px-12 py-12">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug.current}`}
                    className="px-3 py-1 rounded-full bg-brand/10 dark:bg-brand/20 text-brand-dark dark:text-brand-light text-sm font-medium border border-brand/20 hover:bg-brand hover:text-white transition-all duration-300"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold font-display text-ink dark:text-white tracking-tight mb-4">
              {post.title}
            </h1>

            {/* Author & Date */}
            {post.author && (
              <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 mb-8">
                <span>By {post.author.name}</span>
                <span>•</span>
                <span>Published on {postDate}</span>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              {hasMarkdown ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content!}
                </ReactMarkdown>
              ) : hasPortableText ? (
                <PortableText
                  value={post.body!}
                  components={portableTextComponents}
                />
              ) : (
                <p className="text-slate-500">No content available.</p>
              )}
            </div>
          </article>
        </div>

        {/* Related/Latest Articles */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-ink dark:text-white mb-2">
              {hasSharedCategory ? 'Related Articles' : 'Latest Articles'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              {hasSharedCategory
                ? 'More articles in the same category'
                : 'Discover more from our blog'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <PostCard
                  key={relatedPost._id}
                  post={relatedPost}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
