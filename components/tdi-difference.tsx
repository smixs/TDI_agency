import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  LineChart, 
  Target, 
  Users2, 
  Lightbulb, 
  Rocket 
} from 'lucide-react';
import { AnimatedElement } from '@/components/animated-element';

// Определяем типы данных для преимуществ
interface Advantage {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Создаем массив с данными о преимуществах
const advantages: Advantage[] = [
  {
    icon: <Target className="h-10 w-10 text-primary" />,
    title: "Стратегический фокус",
    description: "Мы определяем и атакуем ключевые точки роста, которые имеют наибольшее влияние на ваш бизнес",
  },
  {
    icon: <LineChart className="h-10 w-10 text-primary" />,
    title: "Измеримые результаты",
    description: "Прозрачная отчетность и ориентация на ключевые метрики, которые действительно важны для вашего бизнеса",
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: "Инновационный подход",
    description: "Креативные решения, которые помогают выделиться в переполненном цифровом пространстве",
  },
  {
    icon: <Users2 className="h-10 w-10 text-primary" />,
    title: "Глубокое понимание аудитории",
    description: "Точечное таргетирование на основе реальных инсайтов о вашей целевой аудитории",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Анализ и оптимизация",
    description: "Постоянное улучшение на основе данных для максимизации эффективности вашего маркетинга",
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: "Скорость и гибкость",
    description: "Быстрая адаптация к меняющимся рыночным условиям и новым возможностям",
  },
];

export function TdiDifference() {
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {advantages.map((advantage, index) => (
          <AnimatedElement
            key={index}
            animation="fade-up"
            delay={0.1 + index * 0.1}
            duration={0.5}
            threshold={0.1}
            rootMargin="-50px"
          >
            <div 
              className={cn(
                "p-6 rounded-xl border border-border/40",
                "bg-card/30 backdrop-blur-sm",
                "transition-all duration-300 hover:shadow-md hover:border-primary/30",
                "flex flex-col items-start h-full"
              )}
            >
              <div className="mb-4 p-3 rounded-lg bg-primary/10">
                {advantage.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-2">
                {advantage.title}
              </h3>
              
              <p className="text-muted-foreground">
                {advantage.description}
              </p>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </div>
  );
} 