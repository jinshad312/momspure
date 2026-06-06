import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width="20" height="20">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width="20" height="20">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-secondary border-t border-primary-light pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-wide text-secondary">
                MOMS<span className="text-accent-gold">PURE</span>
              </span>
            </Link>
            <p className="font-sans text-sm text-secondary/70 leading-relaxed max-w-sm">
              Crafting premium organic food blends and traditional nutrition mixes. No preservatives, no chemical additives—just pure love from our kitchen to your home.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-secondary/20 flex items-center justify-center text-secondary/80 hover:text-accent-gold hover:border-accent-gold transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-secondary/20 flex items-center justify-center text-secondary/80 hover:text-accent-gold hover:border-accent-gold transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-accent-gold tracking-wide mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="font-sans text-sm text-secondary/70 hover:text-accent-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="font-sans text-sm text-secondary/70 hover:text-accent-gold transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-sans text-sm text-secondary/70 hover:text-accent-gold transition-colors">
                  About Our Brand
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-sans text-sm text-secondary/70 hover:text-accent-gold transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-accent-gold tracking-wide mb-6">
              Our Ranges
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/products?category=Podi+%26+Powders" className="font-sans text-sm text-secondary/70 hover:text-accent-gold transition-colors">
                  Podi & Traditional Powders
                </Link>
              </li>
              <li>
                <Link href="/products?category=Nutri+Mixes" className="font-sans text-sm text-secondary/70 hover:text-accent-gold transition-colors">
                  Sprouted Grains & Nutri Mixes
                </Link>
              </li>
              <li>
                <Link href="/products?category=Cold+Pressed+Oils" className="font-sans text-sm text-secondary/70 hover:text-accent-gold transition-colors">
                  Cold / Wood Pressed Oils
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col space-y-6">
            <h3 className="font-serif text-lg font-semibold text-accent-gold tracking-wide mb-6">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                <span className="font-sans text-sm text-secondary/70 leading-relaxed">
                  Momspure Foods Private Limited,<br />
                  Green Meadows Layout, Sector 4,<br />
                  Bengaluru, Karnataka - 560034
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent-gold shrink-0" />
                <a href="tel:+919876543210" className="font-sans text-sm text-secondary/70 hover:text-accent-gold transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent-gold shrink-0" />
                <a href="mailto:orders@momspure.com" className="font-sans text-sm text-secondary/70 hover:text-accent-gold transition-colors">
                  orders@momspure.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-light pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-secondary/40">
            &copy; {currentYear} Momspure Foods. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-secondary/40">
            <Link href="/privacy" className="hover:text-accent-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent-gold transition-colors">Terms of Service</Link>
            <Link href="/shipping" className="hover:text-accent-gold transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
