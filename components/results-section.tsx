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
      title: 'Финтех SaaS 3x за 6 месяцев',
      challenge: 'Стартап B2B с инновационной платформой для малого бизнеса столкнулся с низким уровнем привлечения и удержания клиентов, несмотря на качественный продукт.',
      approach: 'Мы разработали комплексную стратегию, включающую целевой контент-маркетинг, оптимизацию воронки продаж и программу поощрения привлечения клиентов.',
      outcome: 'Рост количества платящих пользователей на 300% за 6 месяцев. Снижение стоимости привлечения клиента на 42%. Повышение удержания с 68% до 91%.',
    },
    {
      icon: Users,
      title: 'Маркетплейс: 10k активных пользователей',
      challenge: 'Только что запущенный маркетплейс испытывал трудности с достижением критической массы пользователей для обеспечения жизнеспособности платформы.',
      approach: 'Мы внедрили многоканальную стратегию построения сообщества, программу для ранних пользователей и целенаправленные кампании по привлечению ключевых поставщиков.',
      outcome: 'Достижение 10,000+ активных ежемесячных пользователей за 4 месяца. Увеличение среднего времени сессии на 87%. Рост органического трафика на 215%.',
    },
    {
      icon: Lightbulb,
      title: 'Мобильное приложение: 0 → 1 млн',
      challenge: 'Инновационное приложение для повышения продуктивности имело сложности с первоначальным запуском, страдая от низкой узнаваемости и высокой стоимости привлечения пользователей.',
      approach: 'Мы организовали интегрированную кампанию запуска, включающую лидеров мнений, PR-кампанию и стратегическое партнерство с дополняющими продуктами.',
      outcome: 'Достижение 1 миллиона установок за первый год. Снижение CAC на 56%. Получение признания в отраслевых СМИ и номинации на награды.',
    }
  ];

  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Превращаем потенциал в эффективность
      </h2>
      <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
        Наши клиенты достигают измеримых результатов благодаря стратегическим подходам, 
        которые мы адаптируем к конкретным бизнес-целям.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {caseStudies.map((study, index) => (
          <Card 
            key={index} 
            className="transition-all duration-300 hover:shadow-lg hover:border-primary/50 h-full flex flex-col"
          >
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <study.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">{study.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Проблема</h4>
                  <p className="text-sm">{study.challenge}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Подход</h4>
                  <p className="text-sm">{study.approach}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/30 px-6 py-4">
              <div>
                <h4 className="text-sm font-medium text-primary mb-1">Результат</h4>
                <p className="text-sm font-medium">{study.outcome}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
} 