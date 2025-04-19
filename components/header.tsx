'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

// Определяем интерфейс для навигационных ссылок
interface NavItem {
  href: string;
  label: string;
}

// Навигационные ссылки
const navItems: NavItem[] = [
  { href: '#services', label: 'Services' },
  { href: '#approach', label: 'Approach' },
  { href: '#results', label: 'Results' },
  { href: '#contact', label: 'Contact' },
];

// Создаем компонент мобильного меню
const MobileNavMenu = ({children}: {children: React.ReactNode}) => (
  <SheetContent side="right" className="w-[80%] sm:w-[350px] p-0">
    {children}
  </SheetContent>
);

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Обработчик плавной прокрутки
  const scrollToSection = (sectionId: string, closeMenu = false) => (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (closeMenu) {
      setIsMenuOpen(false);
    }
    
    const element = document.querySelector(sectionId);
    if (element) {
      const topOffset = 80; // Учитываем высоту хедера
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Отслеживаем прокрутку для изменения фона хедера
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Проверяем при монтировании
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Отслеживаем активный раздел при прокрутке
  React.useEffect(() => {
    const handleScrollSpy = () => {
      const sections = navItems.map(item => item.href);
      
      // Находим текущий активный раздел
      let currentActive = '';
      let minDistance = Number.MAX_SAFE_INTEGER;
      
      sections.forEach(section => {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100); // 100px от верха
          
          if (distance < minDistance) {
            minDistance = distance;
            currentActive = section;
          }
        }
      });
      
      setActiveSection(currentActive);
    };
    
    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy(); // Проверяем при монтировании
    
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-200',
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <Image 
            src="/images/tdi-logo.svg" 
            alt="TDI Group Logo" 
            width={40} 
            height={40}
            className="transition-transform group-hover:scale-105"
          />
          <span className="font-semibold text-xl group-hover:text-primary/80 transition-colors">TDI Group</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={scrollToSection(item.href)}
              className={cn(
                "text-sm font-medium transition-colors relative py-1",
                activeSection === item.href
                  ? "text-primary"
                  : "hover:text-primary/80"
              )}
            >
              {item.label}
              {activeSection === item.href && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <Button size="sm" className="hidden md:inline-flex">
          Get Growth Strategy
        </Button>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="focus:outline-none">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <MobileNavMenu>
              <div className="flex flex-col min-h-screen bg-background">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/" className="flex items-center space-x-2">
                    <Image 
                      src="/images/tdi-logo.svg" 
                      alt="TDI Group Logo" 
                      width={32} 
                      height={32}
                    />
                    <span className="font-semibold">TDI Group</span>
                  </Link>
                  <SheetClose className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-muted focus:outline-none">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close menu</span>
                  </SheetClose>
                </div>
                
                <nav className="flex flex-col px-4 py-6 space-y-6">
                  {navItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        const closeHandler = scrollToSection(item.href, true);
                        closeHandler(e);
                      }}
                      className={cn(
                        "text-base font-medium transition-colors px-2 py-1 rounded-md",
                        activeSection === item.href
                          ? "text-primary bg-primary/10"
                          : "hover:text-primary/80 hover:bg-muted"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                
                <div className="px-4 mt-auto mb-8">
                  <Button className="w-full">Get Growth Strategy</Button>
                </div>
              </div>
            </MobileNavMenu>
          </Sheet>
        </div>
      </div>
    </header>
  );
}