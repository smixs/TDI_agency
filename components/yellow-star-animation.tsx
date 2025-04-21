// components/yellow-star-animation.tsx
"use client"; // <-- ДОБАВЬТЕ ЭТУ СТРОКУ В САМОЕ НАЧАЛО ФАЙЛА

import { motion } from 'framer-motion';
import * as React from 'react';

export function YellowStarAnimation() {
  return (
    <div className="perspective-[1000px] w-full h-full flex items-center justify-center">
      <motion.div
        className="w-full h-full text-accent"
        initial={{ rotateX: 0, rotateY: 0 }}
        animate={{
          rotateX: 360,
          rotateY: 360,
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 8,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
        </svg>
      </motion.div>
    </div>
  );
}