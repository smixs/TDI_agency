'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Target,
  LineChart,
  Clock,
  Users,
  BarChart3,
  MoveRight,
  PhoneCall
} from 'lucide-react';
import { FeatureCard } from '@/components/feature-card';

// Массив типов продуктов для анимированной смены
const PRODUCT_TYPES = ["MVP", "SaaS", "App", "Marketplace"];

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


  const features = [
    {
      icon: TrendingUp,
      title: '+300% Growth',
      description: 'Average user growth in 6 months'
    },
    {
      icon: Target,
      title: '-42% CAC',
      description: 'Reduced customer acquisition cost'
    },
    {
      icon: LineChart,
      title: 'Weekly Reports',
      description: 'Transparent performance tracking'
    },
    {
      icon: Clock,
      title: '90 Days',
      description: 'From strategy to market launch'
    },
  ];

  return (
    <section
      ref={heroRef}
      className="relative pt-28 pb-16 md:pt-40 lg:pt-48 md:pb-24 lg:pb-32 overflow-hidden"
    >
      {/* Background elements with parallax effect (существующий код) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url('/images/hero-pattern.svg')`,
          backgroundSize: '500px 500px',
          transform: `translateY(${scrollY * 0.1}px) scale(${1 + scrollY * 0.0003})`,
          transformOrigin: 'center',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />

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

      {/* Основной контент - центрируем блок, но не текст внутри h1 */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto"> {/* Removed text-center here */}
          {/* H1 - теперь выравнивает свой контент по левому краю */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 leading-tight text-left"> {/* Added text-left here */}
            {/* Первая строка: "Launch Your [Animated Word]" - Используем flexbox для выравнивания элементов строки */}
            <span className="inline-flex items-center text-white"> {/* inline-flex для строки, items-center для вертикального выравнивания по центру */}
              <span className="inline">Launch Your{' '}</span> {/* Статичный текст. inline по умолчанию, пробел в конце */}
              {/* Контейнер для динамического слова - flex item внутри inline-flex */}
              {/* КРИТИЧНО: Точная высота, достаточная minWidth, overflow-hidden, выравнивание по левому краю внутри контейнера */}
              <span
                className="relative inline-flex items-center overflow-hidden whitespace-nowrap text-primary font-semibold ml-4" // inline-flex, items-center (верт. центр), overflow-hidden, whitespace-nowrap, ml-2 для отступа
                style={{
                   height: '1.2em', // Высота контейнера (подбирается под размер шрифта H1, возможно нужна тонкая настройка)
                   minWidth: '400px', // МИНИМАЛЬНАЯ ШИРИНА для самого длинного слова "Marketplace" на 6xl. Возможно, потребуется корректировка.
                }}
              >
                <AnimatePresence mode="wait"> {/* AnimatePresence для плавного выхода предыдущего слова */}
                  <motion.span
                    key={PRODUCT_TYPES[wordIndex]} // Ключ для анимации смены элемента
                    className="absolute inset-0 flex items-center justify-start" // Абсолютное позиционирование, items-center (верт. центр), justify-start (ВЫРАВНИВАНИЕ ПО ЛЕВОМУ КРАЮ)
                    initial={{ opacity: 0, y: "100%" }} // Начальное состояние (снизу, невидимо)
                    animate={{ opacity: 1, y: "0%" }} // Активное состояние (в центре, видимо)
                    exit={{ opacity: 0, y: "-100%" }} // Состояние выхода (уходит вверх, невидимо)
                    transition={{ type: "spring", stiffness: 50, damping: 15 }} // Анимация
                  >
                    {PRODUCT_TYPES[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
            {/* Вторая строка: "For Predictable Growth." - Принудительно на новую строку */}
            {/* Добавлен верхний отступ для корректного межстрочного расстояния */}
            <span className="block text-primary mt-4 md:mt-5 lg:mt-6"> {/* block для новой строки. mt-4/5/6 - верхний отступ, чтобы РАЗДВИНУТЬ строки */}
              For Predictable Growth.
            </span>
          </h1>

          {/* Подзаголовок (существующий код) - центрируем отдельно */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 leading-relaxed text-center"> {/* Added text-center here */}
            TDI Group delivers predictable growth for SaaS, Apps, and Marketplaces globally: Strategy, Traffic, Community.
            We turn validated tech into revenue-generating businesses fast.
          </p>

          {/* Карточки с фичами (существующий код) - центрируем контейнер */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 mx-auto max-w-md md:max-w-none"> {/* Added mx-auto max-w-md to center grid on small screens */}
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          {/* Кнопки CTA (существующий код, адаптируем текст и иконки) - центрируем контейнер */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6"> {/* justify-center centers buttons */}
            {/* Кнопка "Get Your Growth Plan" */}
            {/* Ссылка пока ведет на #contact, как было. Позже можно заменить на модалку/форму */}
            <Link href="#contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-base font-medium py-6 sm:py-5 gap-2"> {/* Добавлен gap-2 для иконки */}
                Get Your Growth Plan <MoveRight className="ml-1 h-4 w-4" /> {/* Добавлена иконка */}
              </Button>
            </Link>
            {/* Кнопка "Book a Call" */}
            {/* Ссылка пока ведет на #contact. Позже можно заменить на Calendly */}
            <Link href="#contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full text-base font-medium py-6 sm:py-5 gap-2" // Добавлен gap-2 для иконки
              >
                Book a Call <PhoneCall className="ml-1 h-4 w-4" /> {/* Добавлена иконка */}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}