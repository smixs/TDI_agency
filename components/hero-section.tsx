'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Target,
  LineChart,
  Clock,
  Users,
  BarChart3
} from 'lucide-react';
import { FeatureCard } from '@/components/feature-card';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* Background elements with parallax effect */}
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
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6">
            Launch Your SaaS for{' '}
            <span className="text-primary">Predictable Growth.</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 leading-relaxed">
            TDI Group delivers predictable growth for SaaS, Apps, and Marketplaces globally: Strategy, Traffic, Community. 
            We turn validated tech into revenue-generating businesses fast.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
            <Link href="#contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-base font-medium py-6 sm:py-5">
                Get Your Growth Plan →
              </Button>
            </Link>
            <Link href="#contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full text-base font-medium py-6 sm:py-5"
              >
                Book a Call →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}