"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full bg-bg-ivory min-h-screen pb-24">
      {/* Hero Banner */}
      <div className="bg-secondary/20 border-b border-border-subtle/40 py-20 sm:py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-ivory/0 to-bg-ivory/60" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4 animate-pulse">
            Connect With Us
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-primary font-semibold leading-tight">
            We&apos;d Love to Hear From You
          </h1>
          <p className="font-sans text-xs sm:text-sm text-muted-text max-w-lg mx-auto mt-4 leading-relaxed">
            Have questions about our sprouted blends or spice mixes? Want custom bulk orders? Reach out to us below.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Column 1: Contact Details */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div>
              <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.2em] font-bold block mb-3">
                Quick Enquiries
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary font-medium">
                Reach Out Directly
              </h2>
              <p className="font-sans text-sm text-muted-text leading-relaxed mt-3">
                Our concierge and cooking support team is active from Monday to Saturday, 9 AM to 6 PM IST. We usually respond to inquiries within 2 hours.
              </p>
            </div>

            {/* Channels */}
            <div className="space-y-6">
              {[
                {
                  icon: <MessageSquare className="w-6 h-6 text-accent-gold" />,
                  title: "WhatsApp Order Concierge",
                  desc: "Instantly chat with us regarding orders, catalog queries, or recipes.",
                  linkText: "Chat on WhatsApp",
                  href: "https://wa.me/919876543210?text=Hi%20Momspure%2C%20I%20have%20an%20inquiry%20regarding%20orders.",
                  target: "_blank"
                },
                {
                  icon: <Phone className="w-6 h-6 text-accent-gold" />,
                  title: "Phone Support",
                  desc: "Speak to a kitchen representative regarding ingredients and shipments.",
                  linkText: "+91 98765 43210",
                  href: "tel:+919876543210"
                },
                {
                  icon: <Mail className="w-6 h-6 text-accent-gold" />,
                  title: "Email Support",
                  desc: "Drop us an email for partnerships, wholesale, or corporate orders.",
                  linkText: "orders@momspure.com",
                  href: "mailto:orders@momspure.com"
                },
                {
                  icon: <MapPin className="w-6 h-6 text-accent-gold" />,
                  title: "Office Address",
                  desc: "Momspure Foods Private Limited, Green Meadows Layout, Sector 4, Bengaluru, KA - 560034",
                  linkText: "Get Directions"
                }
              ].map((chan, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="p-3 bg-secondary/15 rounded-2xl border border-primary/10 shrink-0">
                    {chan.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary mb-1">
                      {chan.title}
                    </h4>
                    <p className="font-sans text-xs text-muted-text leading-relaxed mb-2 max-w-sm">
                      {chan.desc}
                    </p>
                    {chan.href && (
                      <a
                        href={chan.href}
                        target={chan.target}
                        rel={chan.target ? "noopener noreferrer" : undefined}
                        className="font-sans text-xs font-semibold text-accent-gold-dark hover:text-primary transition-colors uppercase tracking-wider"
                      >
                        {chan.linkText}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Styled Google Maps Embed frame */}
            <div className="w-full aspect-video rounded-3xl overflow-hidden border border-border-subtle/50 relative bg-secondary/10 shadow-md">
              {/* Using a clean placeholder structure or standard embed. Let's use a beautiful styled map placeholder since direct keys are not configured, or a standard open street maps embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.750383181829!2d77.6256!3d12.9234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144e55555555%3A0x8888888888888888!2sKoramangala%204th%20Block%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1622999999999!5m2!1sen!2sin"
                className="w-full h-full border-none opacity-80 hover:opacity-100 transition-opacity duration-300"
                allowFullScreen={false}
                loading="lazy"
                title="Momspure Bengaluru Location Map"
              />
            </div>

          </div>

          {/* Column 2: Contact Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-secondary/10 border border-border-subtle/50 rounded-3xl p-8 sm:p-10 shadow-sm sticky top-28">
              <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.2em] font-bold block mb-3">
                Send a Message
              </span>
              <h3 className="font-serif text-2xl font-bold text-primary mb-6">
                Online Enquiry Form
              </h3>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center flex flex-col items-center justify-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200">
                      <Check className="w-8 h-8" />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-primary">Enquiry Submitted!</h4>
                    <p className="font-sans text-xs text-muted-text max-w-xs leading-relaxed">
                      Thank you for contacting Momspure. We have received your message and will respond to your email address shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block font-serif text-xs font-bold uppercase tracking-wider text-accent-gold-dark mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="E.g. John Doe"
                        className="w-full bg-bg-ivory border border-primary/10 rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-accent-gold text-charcoal placeholder-muted-text"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-serif text-xs font-bold uppercase tracking-wider text-accent-gold-dark mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E.g. john.doe@gmail.com"
                        className="w-full bg-bg-ivory border border-primary/10 rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-accent-gold text-charcoal placeholder-muted-text"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block font-serif text-xs font-bold uppercase tracking-wider text-accent-gold-dark mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="E.g. Wholesale inquiries or ingredient questions"
                        className="w-full bg-bg-ivory border border-primary/10 rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-accent-gold text-charcoal placeholder-muted-text"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-serif text-xs font-bold uppercase tracking-wider text-accent-gold-dark mb-2">
                        Message Content
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Type your message here..."
                        rows={5}
                        className="w-full bg-bg-ivory border border-primary/10 rounded-xl py-3 px-4 font-sans text-sm focus:outline-none focus:border-accent-gold text-charcoal placeholder-muted-text leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-light text-secondary font-sans text-xs uppercase tracking-widest font-bold py-4 px-6 rounded-full border border-primary-light/10 shadow-md flex items-center justify-center space-x-2 transition-colors active:scale-95 transform duration-150 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
