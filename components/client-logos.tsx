import Image from 'next/image';
import { cn } from '@/lib/utils';

const clients = [
  { name: 'Spectrum Analytics', logo: '/images/client1.svg' },
  { name: 'TechVision Media', logo: '/images/client2.svg' },
  { name: 'Horizon Marketing', logo: '/images/client3.svg' },
  { name: 'Summit Solutions', logo: '/images/client4.svg' },
  { name: 'Global Innovate', logo: '/images/client5.svg' },
];

export function ClientLogos() {
  return (
    <div className="py-8">
      <h2 className="text-center text-lg font-medium text-muted-foreground mb-10">
        Сотрудничаем с лидерами рынка
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 justify-items-center items-center w-full max-w-5xl mx-auto px-4">
        {clients.map((client, index) => (
          <div 
            key={index}
            className={cn(
              "w-full h-10 md:h-12 relative flex items-center justify-center",
              "transition-all duration-300 grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={150}
              height={40}
              className="max-h-full w-auto object-contain"
              unoptimized // SVG не требует оптимизации изображений
            />
          </div>
        ))}
      </div>
    </div>
  );
}