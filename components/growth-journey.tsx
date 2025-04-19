import { cn } from '@/lib/utils';

// Определяем типы данных для шагов процесса
interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

// Создаем массив с данными о шагах
const steps: ProcessStep[] = [
  {
    number: 1,
    title: "Анализ и стратегия",
    description: "Глубокий анализ вашего продукта, рынка и конкурентов для создания персонализированной стратегии роста"
  },
  {
    number: 2,
    title: "Настройка каналов",
    description: "Выбор и оптимизация наиболее эффективных каналов привлечения вашей целевой аудитории"
  },
  {
    number: 3,
    title: "Активация и масштабирование",
    description: "Запуск кампаний и активное тестирование подходов для быстрого масштабирования успешных тактик"
  },
  {
    number: 4,
    title: "Оптимизация и рост",
    description: "Постоянный анализ данных и итерации для поддержания устойчивого роста в долгосрочной перспективе"
  }
];

export function GrowthJourney() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12 md:space-y-0 relative">
          {/* Линия соединения на десктопе */}
          <div className="hidden md:block absolute top-0 bottom-0 left-10 w-0.5 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/30" />
          
          {steps.map((step, index) => (
            <div 
              key={index}
              className={cn(
                "md:grid md:grid-cols-[80px_1fr] gap-8 md:items-start relative",
                index !== steps.length - 1 && "mb-16" // Добавляем отступ для всех элементов, кроме последнего
              )}
            >
              {/* Номер шага */}
              <div className="flex items-center justify-center mb-4 md:mb-0">
                <div className={cn(
                  "h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center",
                  "text-2xl font-bold shadow-md relative z-10"
                )}>
                  {step.number}
                </div>
              </div>
              
              {/* Содержимое шага */}
              <div className="bg-card/40 backdrop-blur-sm rounded-xl border border-border/40 p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 