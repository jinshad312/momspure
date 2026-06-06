"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "./CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-bg-ivory/80 backdrop-blur-md border-b border-border-subtle/50 py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-bold tracking-wide text-primary">
                MOMS<span className="text-accent-gold">PURE</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-sans text-sm tracking-wider uppercase transition-colors relative py-1 ${
                      isActive
                        ? "text-primary font-medium"
                        : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <Link href="/cart" className="relative p-2 text-primary hover:text-accent-gold transition-colors">
                <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-accent-gold text-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-bg-ivory"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 md:hidden text-primary hover:text-accent-gold transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 pt-24 bg-bg-ivory px-4 sm:px-6 md:hidden flex flex-col justify-between"
          >
            <div className="flex flex-col space-y-6 mt-6">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={link.name}
                  >
                    <Link
                      href={link.href}
                      className={`font-serif text-3xl tracking-wide block transition-colors ${
                        isActive ? "text-accent-gold font-bold" : "text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="border-t border-border-subtle py-8 mb-8">
              <p className="font-sans text-xs text-muted-text tracking-wider uppercase mb-4">
                Let&apos;s Connect
              </p>
              <div className="flex flex-col space-y-2">
                <a
                  href="tel:+919876543210"
                  className="font-serif text-lg text-primary hover:text-accent-gold"
                >
                  +91 98765 43210
                </a>
                <a
                  href="mailto:orders@momspure.com"
                  className="font-sans text-sm text-primary/80 hover:text-accent-gold"
                >
                  orders@momspure.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
