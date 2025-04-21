// app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BackToTop } from '@/components/back-to-top';

const inter = Inter({ subsets: ['latin'] });

// --- БЛОК METADATA ДЛЯ SEO И СОЦСЕТЕЙ ---
export const metadata = {
  // --- ДОБАВЬ ЭТУ СТРОКУ ---
  metadataBase: new URL('https://tdigroup.agency'),
  // --------------------------

  // 1. Базовые метаданные (SEO)
  title: 'TDI Group | Growth Marketing for Tech Products',
  description: 'TDI Group specializes in launching and scaling SaaS, apps, and marketplaces. We provide expert brand, content, and growth strategies to turn your MVP into a thriving business.',
  // keywords: ['Growth Marketing', 'SaaS Marketing', 'MVP Launch', 'Tech Marketing', 'Digital Agency', 'Community Building'],

  // 2. Фавиконка
  icons: {
    icon: '/images/favicon.png',
    // shortcut: '/images/shortcut-icon.png',
    // apple: '/images/apple-touch-icon.png',
  },

  // 3. Open Graph (для социальных сетей типа Facebook, LinkedIn)
  openGraph: {
    title: 'TDI Group: Accelerate Your Tech Product Growth',
    description: 'We build brands, communities, and go-to-market engines for SaaS, apps, and marketplaces. Turn your MVP into a thriving business.',
    url: 'https://tdigroup.agency', // Хотя metadataBase помогает, явно указать URL здесь тоже хорошая практика
    siteName: 'TDI Group',
    images: [
      {
        url: '/images/social-share-image.png',
        width: 1200,
        height: 630,
        alt: 'TDI Group - Growth Marketing Experts',
      },
      // Можно добавить другие изображения
    ],
    locale: 'en_US',
    type: 'website',
  },

  // 4. Twitter Cards (для Twitter)
  twitter: {
    card: 'summary_large_image',
    site: '@tdigroupagency', // <-- Твой Twitter Handle (если есть)
    creator: '@tdigroupagency', // <-- Твой Twitter Handle (если ты - создатель)
    title: 'TDI Group: Accelerate Your Tech Product Growth',
    description: 'We build brands, communities, and go-to-market engines for SaaS, apps, and marketplaces. Turn your MVP into a thriving business.',
     images: {
       url: '/images/social-share-image.png', // <-- ПУТЬ К ТВОЕМУ ИЗОБРАЖЕНИЮ
       alt: 'TDI Group - Growth Marketing Experts', // Альт текст
    },
  },

  // 5. Другие опциональные метаданные
};
// --- КОНЕЦ БЛОКА METADATA ---


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>
        <Header />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}