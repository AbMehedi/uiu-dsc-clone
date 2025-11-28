'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isAdmin) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold">
              UIU Data Science Club
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            UIU DSC
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/#events" className="text-sm hover:text-blue-600 transition-colors">
              Events
            </Link>
            <Link href="/#about" className="text-sm hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/#contact" className="text-sm hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/login" className="bg-blue-50 hover:bg-blue-100 text-blue-700">
                Admin Login
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-sm hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/#events" className="text-sm hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                Events
              </Link>
              <Link href="/#about" className="text-sm hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/#contact" className="text-sm hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
