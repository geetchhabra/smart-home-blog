// src/app/privacy/page.tsx
// NO 'use client'
import PageHero from '@/components/PageHero'
import Link from 'next/link'
import type { Metadata } from 'next'; // Import Metadata

// 1. Add Metadata
export const metadata: Metadata = {
  title: 'Privacy Policy | ConnectedHome',
  description: 'Learn how ConnectedHome collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="relative">
      <PageHero
        badge="Legal"
        title="Privacy Policy"
        description="Learn how ConnectedHome collects, uses, and protects your personal information."
      />

      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* 2. Replaced motion.div with div */}
          <div
            className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800/80 p-8 md:p-12"
          >
            
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  At ConnectedHome, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully to understand our practices regarding your personal data.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  We may collect information about you in a variety of ways. The information we may collect on the website includes:
                </p>
                <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Personal Data (name, email address) if you subscribe to our newsletter</li>
                  <li>Usage Data (pages visited, time spent on site, device information)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Provide, maintain, and improve our website and services</li>
                  <li>Send you newsletters, updates, and promotional materials (you can opt-out at any time)</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Analyze website usage and trends to improve user experience</li>
                  <li>Protect against fraudulent or illegal activity</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">
                  3. Cookies and Tracking
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">
                  4. Third-Party Services
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  We may use third-party service providers to help us operate our website and analyze usage. Examples include:
                </p>
                <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Google Analytics for website analytics</li>
                  <li>Email marketing platforms for newsletter distribution</li>
                  <li>Content delivery networks (CDNs)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">
                  5. Data Security
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">
                  6. Your Rights
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">
                  7. Children&apos;s Privacy
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete it.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">
                  8. Changes to This Policy
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">
                  9. Contact Us
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  If you have any questions about this Privacy Policy, please{' '}
                  <Link href="/contact" className="text-brand dark:text-brand-light hover:underline font-semibold">
                    contact us
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}