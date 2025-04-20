'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ElegantShapeProps {
  className?: string;
  baseDelay?: number;
  gradient?: string;
  backdropBlur?: string;
  width?: number;
  height?: number;
  x?: string;
  y?: string;
  opacity?: number;
  rotate?: number;
}

export function ElegantShape({
  className,
  baseDelay = 0,
  gradient = 'from-primary/[0.15] to-secondary/[0.05]',
  backdropBlur = 'backdrop-blur-md',
  width = 12,
  height = width,
  x = '0%',
  y = '0%',
  opacity = 0.8,
  rotate = 0,
}: ElegantShapeProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Параметры анимации
  const initialRotate = rotate + baseDelay * 50;
  const finalRotate = initialRotate + 360;
  const floatDistance = 15; // px
  const floatDuration = 8 + baseDelay * 4; // сек
  const appearDuration = 1.5; // сек
  const appearDelay = baseDelay;

  return (
    <motion.div
      ref={ref}
      className={cn('absolute', className)}
      style={{
        left: x,
        top: y,
        zIndex: 1,
      }}
      initial={{ opacity: 0, rotate: initialRotate, scale: 0.8 }}
      animate={{ opacity: opacity, rotate: finalRotate, scale: 1 }}
      transition={{
        duration: appearDuration,
        delay: appearDelay,
        ease: [0.23, 0.86, 0.39, 0.96],
        rotate: { 
          duration: 20 + baseDelay * 5, 
          ease: "linear", 
          repeat: Infinity 
        },
        scale: { 
          duration: appearDuration, 
          ease: [0.25, 0.4, 0.25, 1] 
        }
      }}
    >
      {/* Контейнер для анимации покачивания */}
      <motion.div
        animate={{
          y: [0, floatDistance, 0],
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: `${width}rem`,
          height: `${height}rem`,
        }}
        className="relative"
      >
        {/* Сама фигура - "стеклянный" элемент */}
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-br",
            gradient,
            backdropBlur,
            "border border-white/[0.15]",
            "shadow-xl",
            "after:absolute after:inset-3 after:rounded-full after:bg-white/[0.05] after:blur-md"
          )}
        />
      </motion.div>
    </motion.div>
  );
} 