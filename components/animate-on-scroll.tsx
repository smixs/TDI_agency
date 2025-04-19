'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants; // Для более сложных кастомных анимаций
  delay?: number;
  // Дополнительные опции для кастомизации
  direction?: 'up' | 'down' | 'left' | 'right';
  amount?: number; // Процент видимости для срабатывания
  once?: boolean; // Анимировать только один раз
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Предопределенные варианты анимаций на основе направления
const directionVariants = {
  up: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
};

export function AnimateOnScroll({
  children,
  className,
  variants,
  delay = 0,
  direction = 'up',
  amount = 0.2,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef(null);
  
  // Определяем, какие варианты анимации использовать
  const animationVariants = variants || (direction ? directionVariants[direction] : defaultVariants);
  
  // triggerOnce: true - анимация сработает один раз
  const isInView = useInView(ref, { 
    triggerOnce: once, 
    amount: amount,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={animationVariants}
      transition={{ 
        duration: 0.5, 
        ease: 'easeOut', 
        delay: delay 
      }}
    >
      {children}
    </motion.div>
  );
} 