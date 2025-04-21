// File: /Users/xshima/Projects/TDI_agency/components/hero-section.tsx

'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  MoveRight,
  PhoneCall
} from 'lucide-react';

// Массив типов продуктов для анимированной смены
const PRODUCT_TYPES = ["Startup", "SaaS", "Application", "Marketplace", "Platform", "Product", ];

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  // Эффект для отслеживания скролла (оставляем как есть)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Эффект для смены слов по интервалу (оставляем как есть)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setWordIndex((currentWordIndex) =>
        currentWordIndex === PRODUCT_TYPES.length - 1 ? 0 : currentWordIndex + 1
      );
    }, 2500); // Интервал смены слова: 2.5 секунды

    return () => clearInterval(intervalId);
  }, [PRODUCT_TYPES.length]);

  return (
    <section
      ref={heroRef}
      className="relative pt-28 pb-16 md:pt-40 lg:pt-48 md:pb-24 lg:pb-32 overflow-hidden"
    >
      {/* Background elements with parallax effect - ВОССТАНОВЛЕНО */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url('/images/hero-pattern.svg')`, // Убедись, что файл hero-pattern.svg существует по этому пути
          backgroundSize: '500px 500px',
          transform: `translateY(${scrollY * 0.1}px) scale(${1 + scrollY * 0.0003})`,
          transformOrigin: 'center',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Блюры - ОСТАВЛЕНЫ */}
      <div
        className="absolute top-32 -left-16 md:w-64 md:h-64 w-48 h-48 rounded-full bg-primary/15 blur-3xl"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        }}
      />

      <div
        className="absolute bottom-16 -right-16 md:w-64 md:h-64 w-48 h-48 rounded-full bg-secondary/15 blur-3xl"
        style={{
          transform: `translateY(${scrollY * -0.05}px)`,
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-80 md:h-80 w-60 h-60 rounded-full bg-blue-400/10 blur-3xl opacity-70 hidden md:block"
        style={{
          transform: `translateY(${scrollY * -0.02}px) scale(${1 + scrollY * 0.0003})`,
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Основной контент - центрируем блок, но текст h1 центрируется классом text-center */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* H1 - центрирует свои строчные/блочные элементы */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 leading-tight text-center">
            {/* Первая строка: "Launch Your" - Обернута в span с display: block */}
            <span className="block text-white">Launch Your</span>

            {/* Вторая строка: [Animated Text] - Контейнер для динамического слова, обернут в span с display: block */}
            {/* Добавлен небольшой верхний отступ (mt-2) для отделения от первой строки */}
            {/* ДОБАВЛЕН text-center для центрирования inline-flex элемента внутри этого блока */}
            <span className="block text-accent font-semibold mt-2 text-center">
              {/* Внутренний контейнер для анимации - relative, inline-flex, overflow-hidden, minWidth, height */}
              <span
                className="relative inline-flex overflow-hidden whitespace-nowrap items-center justify-center" 
                style={{
                   height: '1.2em', // Высота контейнера анимации, подбери под размер шрифта
                   minWidth: '400px', // Минимальная ширина, чтобы самое длинное слово не обрезалось
                   verticalAlign: 'baseline', // Важно для выравнивания в строке, хотя тут строка одна
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={PRODUCT_TYPES[wordIndex]}
                    className="absolute inset-0 flex items-center justify-center" // items-center (верт. центр), justify-start (ВЫРАВНИВАНИЕ ПО ЛЕВОМУ КРАЮ ВНУТРИ КОНТЕЙНЕРА)
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                  >
                    {PRODUCT_TYPES[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>

            {/* Третья строка: "For [Image] Growth" - Обернута в span с display: block */}
            {/* Добавлен верхний отступ (mt-2) для отделения от второй строки */}
            <span className="block text-primary mt-2">
              For{' '}
              {/* Вставляем картинку вместо слова "Predictable" */}
              <Image
                src="/images/predictable.png" // <-- ЗАМЕНИ ЭТОТ ПУТЬ НА РЕАЛЬНОЕ ИМЯ ФАЙЛА
                alt="Predictable" // <-- Добавь осмысленный alt текст
                width={1024} // Исходная ширина картинки
                height={1024} // Исходная высота картинки
                className="inline-block align-middle h-[1.5em] w-auto" // Классы для размера и выравнивания. h-[1em] подбирает высоту под размер текста, w-auto сохраняет пропорции
                // Возможно, потребуется тонкая настройка h-[1.5em] (например, h-[1.6em] или h-[1.4em]) для идеального совпадения с высотой текста.
              />
              {' '}Growth
            </span>
          </h1>

          {/* Подзаголовок с выделенными фразами */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 leading-relaxed text-center">
            <span className="text-primary font-medium">Your Digital Product is Ready.</span>{' '}
            <span className="text-accent">Let&apos;s Make the Market Ready for It.</span>
            <br />
            <span className="text-foreground/80">
              We build the{' '}
              <span className="text-primary font-medium">brand</span>,{' '}
              <span className="text-primary font-medium">community</span>, and{' '}
              <span className="text-primary font-medium">go-to-market engine</span>{' '}
              around it.
            </span>
          </p>

          {/* Кнопки CTA (существующий код, адаптируем текст и иконки) - центрируем контейнер */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
            {/* Кнопка "Get Your Growth Plan" - ведет на #contact */}
            <Link href="#contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-base font-medium py-6 sm:py-5 gap-2">
                Get Your Growth Plan <MoveRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            {/* Кнопка "Book a Call" - ведет на #contact */}
            <Link href="#contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full text-base font-medium py-6 sm:py-5 gap-2"
              >
                Book a Call <PhoneCall className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}