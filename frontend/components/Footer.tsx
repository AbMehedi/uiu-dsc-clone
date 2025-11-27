'use client';

import Link from 'next/link';
import { Facebook, Linkedin, Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Club Info */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">UIU Data Science Club</h3>
              <p className="text-sm mb-4">
                United International University<br />
                United City, Madani Avenue, Badda, Dhaka
              </p>
              <a
                href="mailto:club@datascience.uiu.ac.bd"
                className="text-sm flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                club@datascience.uiu.ac.bd
              </a>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#events" className="hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/#team" className="hover:text-white transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/#partners" className="hover:text-white transition-colors">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Connect With Us</h3>
              <div className="flex gap-4 mb-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 UIU Data Science Club. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

