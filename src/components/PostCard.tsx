// src/components/PostCard.tsx
'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/image';

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    mainImage: any;
    categories?: any[];
  };
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="group relative h-full"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand via-purple-500 to-brand rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
      
      <div className="relative h-full overflow-hidden rounded-xl bg-white dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg transition-all duration-300 flex flex-col">
        {/* Image Section */}
        <Link href={`/post/${post.slug.current}`} className="relative w-full aspect-[16/9] overflow-hidden block">
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).width(1024).height(576).url()}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand/20 to-purple-500/20 flex items-center justify-center">
              <span className="text-6xl">🏠</span>
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Categories - Now clickable */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.map((category: any) => (
                <Link
                  key={category._id}
                  href={`/category/${category.slug.current}`}
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1 rounded-full bg-brand/10 dark:bg-brand/20 text-brand-dark dark:text-brand-light text-xs font-medium border border-brand/20 hover:bg-brand hover:text-white dark:hover:bg-brand dark:hover:text-white hover:border-brand transition-all duration-300 hover:scale-105"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <Link href={`/post/${post.slug.current}`}>
            <h3 className="text-xl font-display font-bold mb-3 text-slate-900 dark:text-white group-hover:text-brand dark:group-hover:text-brand-light transition-colors duration-300 line-clamp-2 cursor-pointer">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          {/* Read More Link */}
          <Link
            href={`/post/${post.slug.current}`}
            className="inline-flex items-center text-brand dark:text-brand-light font-semibold group-hover:gap-2 transition-all duration-300"
          >
            Read More
            <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>

        {/* Bottom accent line */}
        <div className="h-1 bg-gradient-to-r from-brand via-purple-500 to-brand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.article>
  );
}
