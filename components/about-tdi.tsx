import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AboutTDI() {
  return (
    <div className="py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Текстовая колонка */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Проектируем рост цифровых продуктов
            </h2>
            
            <p className="text-xl text-muted-foreground font-medium mb-5">
              Мы превращаем инновационные идеи в успешные цифровые бизнесы
            </p>
            
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              Мы — TDI Group, специализированное агентство, полностью сосредоточенное на 
              постразработческом пути технологических продуктов. Мы не просто запускаем рекламу, 
              мы создаем экосистемы.
            </p>
            
            <p className="text-base md:text-lg text-muted-foreground mb-8">
              Мы понимаем нюансы удержания SaaS-клиентов, механики привлечения пользователей 
              приложений и сетевые эффекты маркетплейсов. Наша команда сочетает стратегическое 
              мышление, креативную реализацию и неустанный фокус на повышении вовлеченности 
              и достижении измеримых бизнес-результатов.
            </p>
            
            <Button size="lg" className="mt-2">
              Узнать больше
            </Button>
          </div>
          
          {/* Колонка с изображением */}
          <div className="order-1 lg:order-2 relative">
            <div className={cn(
              "relative w-full aspect-[4/3] rounded-xl overflow-hidden",
              "bg-gradient-to-br from-primary/10 to-primary/5"
            )}>
              <div className="absolute inset-0 backdrop-blur-[1px] bg-muted/20 z-0"></div>
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                alt="TDI Group team working together"
                fill
                className="object-cover rounded-xl z-10"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Декоративные элементы */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-primary/30 blur-xl z-0"></div>
              <div className="absolute bottom-8 left-8 w-32 h-32 rounded-full bg-primary/20 blur-xl z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}