"use client";
 
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
 
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
 
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
 
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
 
  const scrollToTop = () => {
    // Access global Lenis smooth scrolling instance if available, otherwise fallback to native smooth scroll
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, options?: { duration?: number }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
 
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-primary border border-accent-gold/40 flex items-center justify-center text-accent-gold shadow-2xl hover:bg-primary-light hover:border-accent-gold hover:text-white transition-all duration-300 group active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 focus:ring-offset-primary"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 stroke-[2]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
