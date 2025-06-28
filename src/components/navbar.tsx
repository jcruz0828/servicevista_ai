'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
];

const authLinks = [
  { name: 'Login', href: '/login', variant: 'default' as const },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-sky-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-800 transition-all">
                ServiceVista AI
              </div>
            </Link>
            <Badge variant="secondary" className="hidden sm:inline-flex bg-blue-100 text-blue-700 border-blue-200">
              For Trades
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                    isActive 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth Links */}
          <div className="hidden md:flex items-center space-x-3">
            {authLinks.map((link) => (
              <Button 
                key={link.name} 
                variant={link.variant} 
                size="sm" 
                asChild
                className={cn(
                  "font-medium",
                  link.variant === 'default' && "bg-blue-600 hover:bg-blue-700 shadow-md"
                )}
              >
                <Link href={link.href}>{link.name}</Link>
              </Button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-slate-200 rounded-b-lg shadow-lg">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-3 py-3 text-base font-medium rounded-lg transition-colors",
                      isActive 
                        ? "text-blue-600 bg-blue-50" 
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 pb-2 space-y-3 border-t border-slate-200 mt-4">
                {authLinks.map((link) => (
                  <Button 
                    key={link.name} 
                    variant={link.variant} 
                    size="sm" 
                    className={cn(
                      "w-full font-medium",
                      link.variant === 'default' && "bg-blue-600 hover:bg-blue-700"
                    )}
                    asChild
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 