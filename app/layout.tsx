import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BackToTop } from '@/components/back-to-top';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
