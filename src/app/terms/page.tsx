// src/app/terms/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Terms of Service | ConnectedHome',
  description: 'Read the terms and conditions for using ConnectedHome website.',
};

export default function TermsPage() {
  

  return (
    <div className="relative">
      {/* PageHero Component - ONLY ADDITION */}
      <PageHero
        badge="Legal"
        title="Terms of Service"
        description="Please read these terms carefully before using ConnectedHome."
      />

      {/* Original Content - UNCHANGED */}
      <div className="px-6 py-20 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 md:p-12">
          

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Welcome to ConnectedHome. By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              These Terms of Service constitute a legally binding agreement between you and ConnectedHome concerning your access to and use of our website. By accessing the website, you accept and agree to be bound by these terms. If you do not agree to these terms, you must not access or use the website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">2. Intellectual Property Rights</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Unless otherwise indicated, ConnectedHome owns or licenses all intellectual property rights in the website and its content, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 mb-4">
              <li>Written articles, blog posts, and reviews</li>
              <li>Images, graphics, and multimedia content</li>
              <li>Website design, layout, and user interface</li>
              <li>Logos, trademarks, and branding materials</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              You may view, download, and print content from the website for personal, non-commercial use only. Any other use, including reproduction, modification, distribution, or republication, without our prior written consent is strictly prohibited.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">3. Prohibited Uses</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              You agree not to use the website:
            </p>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2">
              <li>In any way that violates applicable laws or regulations</li>
              <li>To transmit harmful, threatening, abusive, or defamatory content</li>
              <li>To impersonate any person or entity or misrepresent your affiliation</li>
              <li>To engage in any activity that interferes with or disrupts the website</li>
              <li>To collect or harvest personal information from other users</li>
              <li>To transmit spam, viruses, or any malicious code</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">4. User-Generated Content</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              If you submit comments, feedback, or other content to our website, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and display such content. You represent that you own or have the necessary rights to the content you submit.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We reserve the right to remove any user-generated content that we deem inappropriate, offensive, or in violation of these terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">5. Third-Party Links</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Our website may contain links to third-party websites or services that are not owned or controlled by ConnectedHome. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              You acknowledge and agree that we shall not be liable for any damage or loss caused by your use of any third-party content, goods, or services available through such websites.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">6. Affiliate Disclosure</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              ConnectedHome may participate in affiliate marketing programs. This means we may earn commissions on purchases made through links on our website. Our reviews and recommendations are based on honest opinions and extensive research, and affiliate relationships do not influence our editorial content.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              The website and its content are provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or reliability of any content on the website.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              The information provided on our website is for general informational purposes only and should not be considered professional advice. Always consult with qualified professionals before making purchasing decisions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">8. Limitation of Liability</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              To the fullest extent permitted by law, ConnectedHome shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">9. Changes to Terms</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We reserve the right to modify or replace these Terms of Service at any time. Material changes will be notified by posting the updated terms on this page. Your continued use of the website after any changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">10. Governing Law</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink dark:text-white mb-4">11. Contact Information</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              <strong>ConnectedHome</strong>
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Email: contact@yourdomain.com
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              For more information, visit our <Link href="/contact" className="text-brand hover:underline">Contact Page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
