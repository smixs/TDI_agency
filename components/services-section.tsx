'use client';

import React from 'react';
import { 
  Target, 
  Users, 
  BarChart3, 
  PenTool, 
  Megaphone, 
  Rocket
} from 'lucide-react';
import { ServicesGrid, ServiceData } from '@/components/services-grid';

export function ServicesSection() {
  const servicesData: ServiceData[] = [
    {
      icon: Target,
      title: 'Market Research & Strategy',
      description: 'Data-driven audience insights, competitor analysis, and strategic positioning to target the right customers with the right message.',
      tags: ['Research', 'Strategy', 'Positioning'],
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Cultivate engaged, loyal communities around your product through thoughtful engagement strategies and value delivery.',
      tags: ['Engagement', 'Loyalty', 'Growth'],
    },
    {
      icon: BarChart3,
      title: 'Growth Marketing',
      description: 'Scalable acquisition channels, retention tactics, and referral systems that drive sustainable growth metrics.',
      tags: ['Acquisition', 'Conversion', 'Analytics'],
    },
    {
      icon: PenTool,
      title: 'Brand Development',
      description: 'Craft distinctive brand identities, messaging frameworks, and visual assets that make your product unforgettable.',
      tags: ['Branding', 'Identity', 'Design'],
    },
    {
      icon: Megaphone,
      title: 'Content Production',
      description: 'Compelling storytelling through video, copy, and design that showcases your product\'s unique value proposition.',
      tags: ['Content', 'Production', 'Distribution'],
    },
    {
      icon: Rocket,
      title: 'Launch Campaigns',
      description: 'End-to-end campaign planning and execution for product launches, rebrands, or new market entry.',
      tags: ['Launch', 'Campaigns', 'PR'],
    }
  ];

  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Our Arsenal for Your Ascent
      </h2>
      <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
        We combine proven strategies with innovative approaches to build momentum 
        and create sustainable growth for digital products.
      </p>
      
      <ServicesGrid services={servicesData} />
    </>
  );
} 