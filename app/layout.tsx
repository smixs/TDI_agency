import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { BackToTop } from '@/components/back-to-top';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'TDI Group - Digital Product Growth Strategies',
  description: 'TDI Group specializes in crafting growth strategies for tech products. We help SaaS, apps, and marketplaces win users, build brands, and drive real engagement.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} dark scroll-smooth`}>
      <body className={spaceGrotesk.className}>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
