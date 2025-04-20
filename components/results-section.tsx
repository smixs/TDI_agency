'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lightbulb, TrendingUp, Users } from 'lucide-react';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { SectionTitle } from '@/components/section-title';

interface CaseStudy {
  icon: React.ElementType;
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
}

export function ResultsSection() {
  const caseStudies: CaseStudy[] = [
    {
      icon: TrendingUp,
      title: 'FinTech SaaS 3x in 6 months',
      challenge: 'A B2B startup with an innovative platform for small businesses was experiencing low customer acquisition and retention rates despite having a quality product.',
      approach: 'We developed a comprehensive strategy including targeted content marketing, sales funnel optimization, and a customer referral program.',
      outcome: '300% growth in paying users over 6 months. 42% reduction in customer acquisition cost. Retention increase from 68% to 91%.',
    },
    {
      icon: Users,
      title: 'Marketplace: 10k active users',
      challenge: 'A newly launched marketplace was struggling to achieve the critical mass of users needed to make the platform viable.',
      approach: 'We implemented a multi-channel community building strategy, early adopter program, and targeted campaigns to attract key suppliers.',
      outcome: 'Reached 10,000+ monthly active users in 4 months. 87% increase in average session time. 215% growth in organic traffic.',
    },
    {
      icon: Lightbulb,
      title: 'Mobile app: 0 → 1M',
      challenge: 'An innovative productivity app was having difficulty with its initial launch, suffering from low awareness and high user acquisition costs.',
      approach: 'We organized an integrated launch campaign, including opinion leaders, PR outreach, and strategic partnerships with complementary products.',
      outcome: 'Achieved 1 million installs in the first year. 56% reduction in CAC. Recognition in industry media and award nominations.',
    }
  ];

  return (
    <>
      <AnimateOnScroll>
        <SectionTitle accentColor="gradient">
          Turning Potential into Performance
        </SectionTitle>
      </AnimateOnScroll>
      
      <AnimateOnScroll delay={0.2}>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          Our clients achieve measurable results through strategic approaches 
          that we adapt to specific business goals.
        </p>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {caseStudies.map((study, index) => (
          <AnimateOnScroll 
            key={index} 
            delay={0.1 + index * 0.15}
            direction={index === 1 ? "up" : index === 0 ? "left" : "right"}
            className="h-full"
          >
            <Card 
              className="transition-all duration-300 hover:shadow-lg hover:border-primary/50 h-full flex flex-col"
            >
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <study.icon className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{study.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Challenge</h4>
                    <p className="text-sm">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Approach</h4>
                    <p className="text-sm">{study.approach}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/30 px-6 py-4">
                <div>
                  <h4 className="text-sm font-medium text-primary mb-1">Outcome</h4>
                  <p className="text-sm font-medium">{study.outcome}</p>
                </div>
              </CardFooter>
            </Card>
          </AnimateOnScroll>
        ))}
      </div>
    </>
  );
} 