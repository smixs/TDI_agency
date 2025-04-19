import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - TDI Group',
  description: 'TDI Group\'s Privacy Policy details how we collect, use, and protect your personal information when you use our services.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 md:pt-36 md:pb-24 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg mb-6">
              Last Updated: {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to TDI Group ("we," "our," or "us"). We are committed to protecting your privacy and handling your personal information with transparency and care. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium mt-6 mb-3">2.1 Personal Information</h3>
            <p>
              When you interact with our website, we may collect personal information such as:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Name and contact details (email address, phone number)</li>
              <li>Company information</li>
              <li>Information provided through our contact forms</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">2.2 Automatically Collected Information</h3>
            <p>
              When you access our website, we may automatically collect:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Device information (browser type, operating system)</li>
              <li>IP address and usage data</li>
              <li>Cookies and similar technologies</li>
              <li>Referring website addresses</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your inquiries and fulfill your requests</li>
              <li>Send administrative information, such as updates or changes to our terms</li>
              <li>Deliver marketing communications (with consent where required)</li>
              <li>Analyze website usage and improve user experience</li>
              <li>Protect against fraud and unauthorized access</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. How We Share Your Information</h2>
            <p>
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Service providers who perform services on our behalf</li>
              <li>Professional advisors, such as lawyers and accountants</li>
              <li>Regulatory authorities, law enforcement agencies, or other third parties when required by law</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Objection to or restriction of processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="mb-6">
              <strong>Email:</strong> privacy@tdigroup.com
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 