'use client';

import React from 'react';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { ArrowRight } from 'lucide-react';

interface CaseStudy {
  industry: string;
  challenge: string;
  approach: string;
  outcome: string;
}

export function ResultsSection() {
  const caseStudies: CaseStudy[] = [
    {
      industry: 'B2B SaaS',
      challenge: 'Struggling to differentiate in a crowded market with high CAC and slow growth.',
      approach: 'Developed unique positioning, optimized acquisition funnel, and implemented data-driven growth strategies.',
      outcome: 'Achieved 5x revenue growth and 58% CAC reduction within 6 months.'
    },
    {
      industry: 'E-commerce Platform',
      challenge: 'Low conversion rates and high customer churn despite competitive pricing.',
      approach: 'Redesigned user experience, personalized marketing campaigns, and enhanced customer support.',
      outcome: 'Increased conversion by 127% and improved retention to 94%.'
    },
    {
      industry: 'FinTech Solution',
      challenge: 'Limited market penetration and trust issues in a regulated industry.',
      approach: 'Built credibility through thought leadership and compliance-focused messaging.',
      outcome: 'Expanded market share by 3x and achieved 4.9/5 trust rating.'
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Proven Results Across Industries
        </h2>
        <p className="text-xl text-muted-foreground">
          Real success stories from our clients
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((study, index) => (
          <AnimateOnScroll
            key={index}
            delay={0.1 * index}
          >
            <div className="bg-muted/50 p-6 rounded-lg border border-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary/10 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-primary">{study.industry}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    Challenge <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </h4>
                  <p className="text-muted-foreground">{study.challenge}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    Our Approach <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </h4>
                  <p className="text-muted-foreground">{study.approach}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    Outcome <ArrowRight className="h-4 w-4 text-accent" />
                  </h4>
                  <p className="text-primary font-medium">{study.outcome}</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
} 