import React from 'react';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Target, 
  LineChart, 
  ArrowUpRight 
} from 'lucide-react';
import { AnimateOnScroll } from '@/components/animate-on-scroll';

interface AdvantageItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

export function WhyTDI() {
  const advantages: AdvantageItem[] = [
    {
      icon: Shield,
      title: "Transparent Process",
      description: "Clear methodology and regular reporting keep you informed at every stage of your growth journey."
    },
    {
      icon: TrendingUp,
      title: "Results-Focused",
      description: "We prioritize measurable outcomes over vanity metrics, ensuring real business impact."
    },
    {
      icon: Users,
      title: "Customer-Centric",
      description: "Deep understanding of your users drives all our strategies, leading to higher conversion and retention."
    },
    {
      icon: Target,
      title: "Targeted Approach",
      description: "Precision strategies designed specifically for your industry, market position, and growth stage."
    },
    {
      icon: LineChart,
      title: "Data-Driven",
      description: "Analytics-backed decisions, continual testing, and optimization processes ensure maximum ROI."
    },
    {
      icon: ArrowUpRight,
      title: "Scalable Growth",
      description: "Solutions designed to scale with your business, from market entry to expansion and beyond."
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {advantages.map((advantage, index) => (
          <AnimateOnScroll 
            key={index} 
            delay={0.1 * index}
            className="h-full"
          >
            <div className="flex flex-col h-full hover:translate-y-[-4px] transition-transform duration-300 ease-in-out">
              <div className="flex gap-4 items-start mb-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <advantage.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{advantage.title}</h3>
              </div>
              <p className="text-muted-foreground">{advantage.description}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
} 