"use client";

import React, { useState } from "react";
import { Phone, Share2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="20" height="20">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.923 9.923 0 004.934 1.315h.005c5.506 0 9.99-4.478 9.99-9.986S17.518 2 12.012 2zm6.09 14.49c-.25.704-1.25 1.293-1.72 1.342-.47.05-1.05.074-1.685-.13a10.09 10.09 0 01-4.22-2.584c-1.397-1.393-2.433-3.093-2.843-4.254-.41-1.16-.045-1.785.31-2.14.354-.356.776-.84.97-1.13.193-.29.255-.494.385-.758.13-.263.065-.494-.032-.69-.097-.197-.872-2.102-1.196-2.884-.316-.763-.64-.66-.874-.672-.224-.012-.482-.014-.739-.014-.257 0-.677.096-1.03.484-.354.388-1.354 1.322-1.354 3.223 0 1.902 1.385 3.738 1.579 3.998.193.262 2.724 4.162 6.6 5.834.922.398 1.643.636 2.203.814.927.294 1.77.253 2.437.153.743-.111 2.278-.93 2.59-1.83.313-.902.313-1.675.219-1.836-.093-.16-.342-.256-.592-.38z"/>
  </svg>
);

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

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      name: "WhatsApp Chat",
      icon: <WhatsAppIcon className="w-5 h-5 fill-current" />,
      color: "bg-emerald-600 hover:bg-emerald-700 text-white",
      href: "https://wa.me/919876543210?text=Hi%20Momspure%2C%20I%20have%20a%20question%20about%20your%20organic%20products.",
    },
    {
      name: "Call Now",
      icon: <Phone className="w-5 h-5" />,
      color: "bg-accent-gold hover:bg-accent-gold-dark text-primary",
      href: "tel:+919876543210",
    },
    {
      name: "Instagram",
      icon: <InstagramIcon className="w-5 h-5" />,
      color: "bg-pink-600 hover:bg-pink-700 text-white",
      href: "https://instagram.com",
    },
    {
      name: "Facebook",
      icon: <FacebookIcon className="w-5 h-5" />,
      color: "bg-blue-600 hover:bg-blue-700 text-white",
      href: "https://facebook.com",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Action Items List */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end space-y-3 mb-2">
            {actions.map((action, index) => (
              <motion.a
                key={action.name}
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`flex items-center space-x-3 p-3 rounded-full shadow-lg ${action.color} group relative transition-transform duration-200 active:scale-95`}
              >
                {/* Tooltip Label */}
                <span className="absolute right-14 bg-primary text-secondary text-xs px-3 py-1.5 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-primary-light">
                  {action.name}
                </span>
                {action.icon}
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary border border-accent-gold/40 flex items-center justify-center text-accent-gold shadow-2xl hover:bg-primary-light hover:border-accent-gold focus:outline-none transition-all duration-300 relative group active:scale-95"
        aria-label="Toggle contact quick actions"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center relative"
            >
              {/* Notification dot to attract attention */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-gold rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-gold rounded-full" />
              <Share2 className="w-6 h-6 stroke-[1.5]" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
