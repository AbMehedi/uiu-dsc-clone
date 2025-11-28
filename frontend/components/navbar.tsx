'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/team', label: 'Team' },
    { href: '/questions', label: 'Questions Bank' },
    { href: '/#contact', label: 'Contact' },
  ];

  if (isAdmin) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold font-heading gradient-text">
              UIU Data Science Club
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Back to Site</Link>
            </Button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold font-heading gradient-text">
            UIU DSC
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" asChild>
              <Link href="/join">Join Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-primary px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button size="sm" className="w-full bg-green-600" asChild>
                <Link href="/join" onClick={() => setMobileMenuOpen(false)}>Join Now</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}