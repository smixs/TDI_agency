import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter } from 'lucide-react'; // Пример иконок соцсетей

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
          {/* Левая часть: Лого и Копирайт */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center space-x-2 mb-2 group">
              {/* Используем тот же логотип, что и в Header */}
              <Image 
                src="/images/tdi-logo.svg" 
                alt="TDI Group Logo" 
                width={40} 
                height={40}
                className="transition-transform group-hover:scale-105"
              />
              <span className="font-semibold text-lg group-hover:text-primary/80 transition-colors">TDI Group</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © {currentYear} TDI Group. All rights reserved.
            </p>
          </div>

          {/* Правая часть: Ссылки и Соцсети */}
          <div className="flex flex-col items-center md:items-end gap-4">
            {/* Ссылки */}
            <nav className="flex space-x-6">
              <Link
                href="/privacy-policy" // Заменить на реальный путь или #
                className="text-sm text-muted-foreground hover:text-primary/80 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service" // Заменить на реальный путь или #
                className="text-sm text-muted-foreground hover:text-primary/80 transition-colors"
              >
                Terms of Service
              </Link>
            </nav>

            {/* Соцсети */}
            <div className="flex space-x-4">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com" // Заменить на реальный URL
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary/80 transition-colors group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
              {/* Twitter/X */}
              <a
                href="https://twitter.com" // Заменить на реальный URL
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary/80 transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 