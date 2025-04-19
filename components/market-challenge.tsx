import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

export function MarketChallenge() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <span className="inline-flex items-center justify-center p-2 bg-amber-100 text-amber-800 rounded-full mb-4">
            <AlertTriangle className="w-6 h-6" />
          </span>
        </div>
        
        <h2 className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold mb-8",
          "tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
        )}>
          Запуск — лишь первый круг.<br className="hidden md:block" /> 
          <span className="font-extrabold">Победа требует стратегии.</span>
        </h2>
        
        <p className={cn(
          "text-lg md:text-xl leading-relaxed text-muted-foreground mb-8",
          "max-w-3xl mx-auto"
        )}>
          Ваш MVP/MVE доказывает концепцию. Но в переполненном цифровом пространстве 
          видимость, привлечение пользователей и монетизация не происходят случайно. 
        </p>
        
        <div className="max-w-xl mx-auto p-6 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm">
          <p className="text-base md:text-lg font-medium">
            Вам нужно больше, чем просто функции — вам нужен <span className="underline decoration-primary decoration-2 underline-offset-4">нарратив</span>, 
            <span className="underline decoration-primary decoration-2 underline-offset-4"> сообщество</span> и 
            <span className="underline decoration-primary decoration-2 underline-offset-4"> продуманный план</span> преодоления шума.
            Общий маркетинг здесь не сработает.
          </p>
        </div>
      </div>
    </div>
  );
}