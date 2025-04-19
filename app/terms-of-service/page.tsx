import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - TDI Group',
  description: 'Legal terms and conditions governing your use of TDI Group\'s services and website.',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 md:pt-36 md:pb-24 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg mb-6">
              Last Updated: {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the TDI Group website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access our website or use our services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Services</h2>
            <p>
              TDI Group provides digital product growth strategy services, including but not limited to user acquisition strategy, brand development, engagement strategy, and related consulting services. The specific services to be provided will be detailed in separate agreements between TDI Group and its clients.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Use of Website</h2>
            <h3 className="text-xl font-medium mt-6 mb-3">3.1 Acceptable Use</h3>
            <p>
              You agree to use our website only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use of the website. You may not:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Use the website in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Use automated systems to access or interact with the website without our permission</li>
              <li>Introduce malware, viruses, or other harmful code to the website</li>
              <li>Interfere with the proper functioning of the website</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">3.2 Intellectual Property</h3>
            <p>
              All content on the TDI Group website, including but not limited to text, images, graphics, logos, and software, is the property of TDI Group or its licensors and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, or create derivative works from any content from our website without our explicit permission.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Client Relationship</h2>
            <p>
              By using our services, clients agree to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide accurate and complete information necessary for service delivery</li>
              <li>Cooperate reasonably with TDI Group personnel</li>
              <li>Use delivered strategies and materials in accordance with our guidelines</li>
              <li>Make timely payments as agreed in the service contract</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, TDI Group shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Your use of or inability to use our website or services</li>
              <li>Any unauthorized access to or use of our servers or personal information</li>
              <li>Any interruption or cessation of transmission to or from our website</li>
              <li>The implementation of our strategic recommendations</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by updating the "Last Updated" date at the top of this page. Your continued use of our website after such changes constitutes your acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mb-6">
              <strong>Email:</strong> legal@tdigroup.com
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 