// src/app/page.tsx
"use client";

import { client } from '@/lib/sanity';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PostCard from '@/components/PostCard';
import PageHero from '@/components/PageHero';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: any;
  categories: any[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const query = `*[_type == "post" && publishedAt < now()] | order(publishedAt desc) [0...9]{
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        "categories": categories[]->{ _id, title, slug },
        publishedAt
      }`;
      const fetchedPosts = await client.fetch(query);
      setPosts(fetchedPosts);
    };
    getPosts();
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <PageHero
        badge="Smart Living Redefined"
        title="The Future of Living, Today."
        description="Your ultimate guide to the world of smart home technology. Discover reviews, tutorials, and the latest trends to build a smarter home."
        height="tall"
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <a
            href="#articles"
            className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 bg-brand hover:bg-brand-dark rounded-lg font-semibold text-white shadow-lg shadow-brand/50 hover:shadow-glow-brand transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Explore Articles →
          </a>
          <Link
            href="/categories"
            className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-semibold text-white border border-white/20 hover:border-white/40 transition-all duration-300 text-sm sm:text-base"
          >
            Browse Categories
          </Link>
        </div>
      </PageHero>

      {/* Blog Post Grid */}
      <section id="articles" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4 bg-gradient-to-r from-brand via-purple-600 to-brand bg-clip-text text-transparent px-4">
              Latest Articles
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Stay up-to-date with the latest smart home innovations, guides, and expert reviews
            </p>
          </motion.div>

          {posts.length > 0 ? (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12"
              >
                {posts.map((post, index) => (
                  <motion.div key={post._id} variants={itemVariants}>
                    <PostCard post={post} index={index} />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <Link
                  href="/articles"
                  className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-purple-700 rounded-lg font-semibold text-white shadow-lg shadow-brand/50 hover:shadow-glow-brand transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  View All Articles →
                </Link>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 sm:py-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80"
            >
              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 px-4">
                Loading Articles ....
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
