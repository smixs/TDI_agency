'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ElegantShape } from '@/components/ui/elegant-shape';
import { FeatureCard } from '@/components/feature-card';
import {
  BrainCircuit,
  MessageSquare,
  TrendingUp,
  Video,
  BarChart3,
  Users,
  ArrowRight,
  Globe2,
  Users2
} from 'lucide-react';

export function HeroGeometric() {
  const features = [
    {
      icon: BrainCircuit,
      title: 'Strategic Brand Building',
      description: 'Establish a memorable, distinctive presence in your market'
    },
    {
      icon: MessageSquare,
      title: 'Community Engagement',
      description: 'Build vibrant communities around your product'
    },
    {
      icon: TrendingUp,
      title: 'Growth Campaigns',
      description: 'Data-driven acquisition and retention strategies'
    },
    {
      icon: Video,
      title: 'Content Production',
      description: 'Compelling content that showcases your value'
    },
    {
      icon: BarChart3,
      title: 'Marketing Roadmaps',
      description: 'Strategic planning aligned with your business goals'
    },
    {
      icon: Users,
      title: 'User Acquisition',
      description: 'Targeted strategies to grow your user base efficiently'
    },
  ];

  // Варианты анимации появления элементов снизу вверх
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 * custom,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
  };

  return (
    <section 
      className="relative min-h-[90vh] pt-28 pb-16 md:pt-36 lg:pt-40 md:pb-24 lg:pb-32 flex items-center bg-background overflow-hidden"
    >
      {/* Фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Базовый градиентный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        
        {/* Стеклянные плавающие фигуры */}
        <ElegantShape
          gradient="from-primary/[0.20] to-primary/[0.05]"
          backdropBlur="backdrop-blur-md"
          x="10%"
          y="15%"
          width={14}
          height={14}
          baseDelay={0.2}
          opacity={0.85}
          rotate={15}
        />
        
        <ElegantShape
          gradient="from-yellow-400/[0.20] to-yellow-500/[0.05]"
          backdropBlur="backdrop-blur-md"
          x="70%"
          y="65%"
          width={16}
          height={16}
          baseDelay={0.5}
          opacity={0.8}
          rotate={-10}
        />
        
        <ElegantShape
          gradient="from-blue-400/[0.20] to-violet-500/[0.05]"
          backdropBlur="backdrop-blur-md"
          x="65%"
          y="20%"
          width={12}
          height={12}
          baseDelay={0.8}
          opacity={0.75}
          rotate={30}
        />
        
        <ElegantShape
          gradient="from-primary/[0.15] to-secondary/[0.05]"
          backdropBlur="backdrop-blur-md"
          x="25%"
          y="60%"
          width={18}
          height={18}
          baseDelay={1.1}
          opacity={0.85}
          rotate={-25}
        />
        
        {/* Фигуры меньшего размера */}
        <ElegantShape
          gradient="from-foreground/[0.10] to-foreground/[0.03]"
          backdropBlur="backdrop-blur-sm"
          x="75%"
          y="30%"
          width={8}
          height={8}
          baseDelay={1.4}
          opacity={0.7}
          rotate={45}
        />
        
        <ElegantShape
          gradient="from-amber-500/[0.15] to-amber-300/[0.05]"
          backdropBlur="backdrop-blur-sm"
          x="15%"
          y="80%"
          width={10}
          height={10}
          baseDelay={1.7}
          opacity={0.8}
          rotate={-5}
        />
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Your Digital Product is Ready.{' '}
            <span className="text-primary">Let&apos;s Make the Market Ready for It.</span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 leading-relaxed"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            You&apos;ve built the core product. Now comes the critical part: winning users,
            building a brand, and driving real engagement. TDI Group specializes in
            crafting and executing powerful go-to-market strategies specifically for
            SaaS, apps, and marketplaces.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Button variant="default" size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
            >
              Book a Strategy Call
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              View Case Studies
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 