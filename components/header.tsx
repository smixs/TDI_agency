'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

// Создаем компонент мобильного меню
const MobileNavMenu = ({children}: {children: React.ReactNode}) => (
  <SheetContent side="right" className="w-[80%] sm:w-[350px]">
    {children}
  </SheetContent>
);

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-200',
        isScrolled
          ? 'bg-background/80 backdrop-blur-sm border-b'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/images/tdi-logo.svg" 
            alt="TDI Group Logo" 
            width={40} 
            height={40}
          />
          <span className="font-semibold text-xl">TDI Group</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#services"
            className="text-sm font-medium hover:text-primary/80 transition-colors"
          >
            Services
          </Link>
          <Link
            href="#approach"
            className="text-sm font-medium hover:text-primary/80 transition-colors"
          >
            Approach
          </Link>
          <Link
            href="#results"
            className="text-sm font-medium hover:text-primary/80 transition-colors"
          >
            Results
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:text-primary/80 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA Button */}
        <Button size="sm" className="hidden md:inline-flex">
          Get Growth Strategy
        </Button>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <MobileNavMenu>
              <nav className="flex flex-col space-y-6 mt-12">
                <Link
                  href="#services"
                  className="text-base font-medium hover:text-primary/80 transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="#approach"
                  className="text-base font-medium hover:text-primary/80 transition-colors"
                >
                  Approach
                </Link>
                <Link
                  href="#results"
                  className="text-base font-medium hover:text-primary/80 transition-colors"
                >
                  Results
                </Link>
                <Link
                  href="#contact"
                  className="text-base font-medium hover:text-primary/80 transition-colors"
                >
                  Contact
                </Link>
                <Button className="w-full mt-4">Get Growth Strategy</Button>
              </nav>
            </MobileNavMenu>
          </Sheet>
        </div>
      </div>
    </header>
  );
}