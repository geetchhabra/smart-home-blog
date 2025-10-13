// src/app/post/[slug]/page.tsx
'use client'

import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { useEffect, useState } from 'react'

interface Post {
  title: string
  mainImage: any
  body: any
  content?: string
  author?: { name: string; image: any }
  publishedAt: string
  categories?: any
  _id: string
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPost = async () => {
      const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        mainImage,
        body,
        content,
        author->{name, image},
        publishedAt,
        "categories": categories[]->{_id, title, slug}
      }`
      const fetchedPost = await client.fetch(query, { slug: params.slug })
      setPost(fetchedPost)
      
      // Fetch related posts if categories exist
      if (fetchedPost?.categories && fetchedPost.categories.length > 0) {
        const categoryIds = fetchedPost.categories.map((cat: any) => cat._id)
        const relatedQuery = `*[_type == "post" && _id != $postId && count((categories[]->_id)[@ in $categoryIds]) > 0] | order(publishedAt desc) [0...3] {
          _id,
          title,
          slug,
          excerpt,
          mainImage,
          "categories": categories[]->{_id, title, slug}
        }`
        const fetchedRelatedPosts = await client.fetch(relatedQuery, {
          postId: fetchedPost._id,
          categoryIds: categoryIds
        })
        setRelatedPosts(fetchedRelatedPosts)
      }
      
      setLoading(false)
    }
    getPost()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Post not found</p>
      </div>
    )
  }

  const postDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const hasMarkdown = post.content && typeof post.content === 'string'
  const hasPortableText = post.body && Array.isArray(post.body)

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        return (
          <div className="my-8 flex justify-center">
            <div className="max-w-4xl w-full">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={urlFor(value).width(1200).url()}
                  alt={value.alt || 'Article image'}
                  width={1200}
                  height={675}
                  className="w-full h-auto mx-auto"
                />
              </div>
              {value.caption && (
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                  {value.caption}
                </p>
              )}
            </div>
          </div>
        )
      },
    },
    marks: {
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand dark:text-brand-light hover:underline"
        >
          {children}
        </a>
      ),
    },
  }

  return (
    <article className="px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map((category: any) => (
              <Link
                key={category._id}
                href={`/category/${category.slug.current}`}
                className="px-4 py-2 rounded-full bg-brand/10 dark:bg-brand/20 text-brand-dark dark:text-brand-light text-sm font-medium border border-brand/20 hover:bg-brand hover:text-white transition-all"
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-ink dark:text-white mb-4">
          {post.title}
        </h1>

        {/* Author & Date */}
        {post.author && (
          <div className="flex items-center gap-4 mb-8 text-slate-600 dark:text-slate-400">
            {post.author.image && (
              <Image
                src={urlFor(post.author.image).width(48).height(48).url()}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-medium text-ink dark:text-white">
                By {post.author.name}
              </p>
              <p className="text-sm">Published on {postDate}</p>
            </div>
          </div>
        )}

        {/* Hero Image with 16:9 Aspect Ratio */}
        {post.mainImage && (
          <div className="relative w-full aspect-[16/9] mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={urlFor(post.mainImage).width(1600).height(900).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-a:text-brand dark:prose-a:text-brand-light prose-img:rounded-xl prose-img:shadow-lg">
          {hasMarkdown ? (
            <div dangerouslySetInnerHTML={{ __html: post.content! }} />
          ) : hasPortableText ? (
            <PortableText 
              value={post.body} 
              components={portableTextComponents}
            />
          ) : (
            <p>No content available.</p>
          )}
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-6 text-ink dark:text-white">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  href={`/post/${relatedPost.slug.current}`}
                  className="group"
                >
                  <div className="relative aspect-[16/9] mb-3 rounded-lg overflow-hidden">
                    {relatedPost.mainImage && (
                      <Image
                        src={urlFor(relatedPost.mainImage).width(400).height(225).url()}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <h3 className="font-semibold text-ink dark:text-white group-hover:text-brand transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
