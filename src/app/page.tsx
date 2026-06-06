"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Sparkles, Heart, Award, ArrowRight, ChevronDown, Check, X, Quote, Star } from "lucide-react";
import ScrollControlledVideo from "@/components/ScrollControlledVideo";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { motion } from "framer-motion";

// Local FAQs
const faqs = [
  {
    q: "Are Momspure products safe for toddlers and children?",
    a: "Yes, absolutely. Our products, especially the Family Nutri Mix, are formulated using 100% natural, pesticide-free sprouted millets and grains. We add zero artificial sugars, milk solids, or chemical preservatives, making them perfectly safe and highly nutritious for children aged 1 year and above."
  },
  {
    q: "Why is sprouting grains so important?",
    a: "Sprouting is nature's way of unlocking locked-in nutrition. Soaking and sprouting grains for 24-48 hours activates enzymes, breaks down complex starches into simpler sugars, neutralizes phytic acid (which blocks mineral absorption), and increases levels of vitamins, iron, and calcium by up to 300%."
  },
  {
    q: "How does the WhatsApp order system work?",
    a: "It's simple and premium. Browse our catalog, add items to your cart, and fill in your delivery details on our Checkout Page. Upon clicking 'Submit Order', our site compiles a formatted order sheet and automatically redirects you to WhatsApp with the message pre-filled. You simply hit send, and our concierge team will confirm your order and share delivery updates."
  },
  {
    q: "How long does shipping take?",
    a: "We handcraft our products in fresh weekly batches. Once you place your order via WhatsApp, we dispatch it within 24-48 hours. Shipping typically takes 3 to 5 business days across India. Express shipping is available for major metropolitan cities."
  },
  {
    q: "Do your products contain added gluten or artificial flavorings?",
    a: "No. We believe in absolute transparency. All of our spices and health mixes are gluten-free (except for standard whole wheat additions where explicitly mentioned on the label) and contain zero MSG, synthetic colors, artificial thickeners, or chemical flavoring agents."
  }
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Extract featured products
  const featuredProducts = products.filter(p => p.featured);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="w-full bg-bg-ivory text-charcoal">
      {/* 1. Hero Video Section */}
      <section className="w-full">
        <ScrollControlledVideo />
      </section>

      {/* 2. Brand Introduction */}
      <section id="brand-intro" className="py-24 sm:py-32 border-b border-border-subtle/40 bg-secondary/10 relative overflow-hidden">
        {/* Background botanical graphics mockup */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 top-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4">
              Our Philosophy
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-medium leading-tight mb-8">
              Nourishing Generations with Ancestral Wisdom
            </h2>
            <p className="font-sans text-base sm:text-lg text-muted-text leading-relaxed mb-10 max-w-3xl mx-auto">
              Momspure was born in a home kitchen out of a mother&apos;s commitment to feeding her family pure, chemical-free food. We restore traditional food processing methods—sprouting grains, slow dry-roasting, and wood-pressing seeds—to present nutritional integrity that keeps your family active and strong.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="bg-primary hover:bg-primary-light text-secondary font-sans text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-full shadow-md transition-colors w-full sm:w-auto"
              >
                Shop Our Collection
              </Link>
              <Link
                href="/about"
                className="border border-primary/20 hover:border-accent-gold text-primary font-sans text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-full transition-colors w-full sm:w-auto flex items-center justify-center space-x-2"
              >
                <span>Read Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Trust Indicators */}
      <section className="py-16 bg-primary text-secondary border-b border-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-accent-gold" />,
                title: "100% Certified Organic",
                desc: "Sourced directly from certified chemical-free family farms."
              },
              {
                icon: <Sparkles className="w-8 h-8 text-accent-gold" />,
                title: "Sprouted for Nutrition",
                desc: "24-48h sprouting process maximizes mineral absorption."
              },
              {
                icon: <Heart className="w-8 h-8 text-accent-gold" />,
                title: "Zero Preservatives",
                desc: "Fresh batches ground weekly. No additives, colors, or MSG."
              },
              {
                icon: <Award className="w-8 h-8 text-accent-gold" />,
                title: "Handcrafted Batches",
                desc: "Made under home-scale hygienic care by rural women artisans."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center space-y-3"
              >
                <div className="p-3 bg-primary-light rounded-full border border-secondary/10">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold tracking-wide text-white">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-secondary/70 max-w-[200px] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Product Highlights */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-3">
              Premium Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-primary font-medium">
              Featured Kitchen Essentials
            </h2>
          </div>
          <Link
            href="/products"
            className="group flex items-center space-x-2 text-primary hover:text-accent-gold font-sans text-xs uppercase tracking-widest font-bold mt-4 md:mt-0 transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Benefits Section (Sprouting Story) */}
      <section className="py-24 sm:py-32 bg-secondary/20 border-y border-border-subtle/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Visual Column */}
            <div className="w-full lg:w-1/2 relative aspect-video sm:aspect-square bg-primary/10 rounded-3xl overflow-hidden shadow-2xl border border-border-subtle">
              <Image
                src="/assets/IMG_0061.webp"
                alt="Organic Sprouted Grain Blend"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-secondary">
                <span className="font-sans text-[10px] uppercase tracking-widest text-accent-gold font-bold block mb-2">
                  Kitchen Showcase
                </span>
                <p className="font-serif text-lg italic leading-relaxed">
                  &ldquo;The process of sprouting mirrors nature&apos;s germination, multiplying key minerals and vitamins for cellular digestion.&rdquo;
                </p>
              </div>
            </div>

            {/* Text Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4">
                The Science of Sprouting
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-primary font-medium leading-tight mb-8">
                Why Sprouted Grains Perform Better
              </h2>
              <p className="font-sans text-sm sm:text-base text-muted-text leading-relaxed mb-8">
                Raw grains, seeds, and beans are wrapped in phytic acid—a protective compound that locks in essential minerals and impairs our body&apos;s digestion. Sprouting breaks down these anti-nutrients.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Enhanced Mineral Bioavailability",
                    desc: "Neutralizes phytic acid, enabling your intestines to absorb up to 3x more Calcium, Zinc, and Iron."
                  },
                  {
                    title: "Gentle on Sensitive Stomachs",
                    desc: "Breaks down heavy starches and gluten bonds into simpler dietary components, preventing bloating."
                  },
                  {
                    title: "Boosted Vitamin Activity",
                    desc: "Significantly increases Vitamin C, B-Complex group, and active folate concentrations during sprouting."
                  }
                ].map((benefit) => (
                  <div key={benefit.title} className="flex items-start space-x-4">
                    <div className="w-6 h-6 rounded-full bg-accent-gold/25 border border-accent-gold flex items-center justify-center shrink-0 mt-1">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-primary mb-1">
                        {benefit.title}
                      </h4>
                      <p className="font-sans text-xs text-muted-text leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Why Choose Momspure (Comparison) */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4">
            Product Integrity
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-primary font-medium">
            How We Differ From Others
          </h2>
          <p className="font-sans text-xs sm:text-sm text-muted-text mt-4 leading-relaxed">
            We are dedicated to uncompromised cleanliness and nutrient retention. Review how we compare to conventional processed brands.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Momspure Column */}
          <div className="bg-primary/95 text-secondary border border-primary-light p-8 rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-accent-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Momspure Foods</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "24-48 Hours Sprouting for mineral activation",
                  "Slow roasting at low temperature (under 60°C) to keep enzymes active",
                  "100% Organic certified grains sourced from marginal farmers",
                  "Freshly dry-ground in small weekly batches for volatile oil retention",
                  "Zero preservative agents, synthetics, sugars, or artificial colors"
                ].map((item) => (
                  <li key={item} className="flex items-start space-x-3 text-sm text-secondary/80">
                    <Check className="w-4 h-4 text-accent-gold shrink-0 mt-1" />
                    <span className="font-sans leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Industrial Column */}
          <div className="bg-bg-ivory border border-border-subtle p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-900/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-700" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary">Commercial Brands</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Unsprouted, raw grain milling containing high phytic acid",
                  "High-heat industrial roasting that denatures vitamins and enzymes",
                  "Mass-sourced commercial crops grown with synthetic fertilizers",
                  "Stored in depots for months, leading to oxidation of natural fats",
                  "Formulated with Maltodextrin, thickening agents, and artificial sugar"
                ].map((item) => (
                  <li key={item} className="flex items-start space-x-3 text-sm text-muted-text">
                    <X className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                    <span className="font-sans leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews */}
      <section className="py-24 sm:py-32 bg-secondary/10 border-t border-border-subtle/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4">
              Happy Families
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-primary font-medium">
              Loved By Families, Backed By Quality
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "I was looking for an organic health mix for my son that didn't contain artificial sugars. The Sprouted Family Nutri Mix is absolute gold! He loves the taste and I love the ingredient list.",
                name: "Preeti Deshmukh",
                role: "Mother of 4-year old",
                rating: 5
              },
              {
                quote: "The Avulos Podi is a culinary masterpiece. It has that authentic smoky, roasted aroma that you can never get in store-bought spices. Tastes divine with dosas and sesame oil.",
                name: "Gopal Subramanian",
                role: "Food Enthusiast",
                rating: 5
              },
              {
                quote: "Their cold pressed oils and moringa powder are staple ingredients in our organic kitchen now. The quality and purity are extremely consistent. Outstanding brand!",
                name: "Dr. Sandeep Vardhan",
                role: "Ayurveda Practitioner",
                rating: 5
              }
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-ivory border border-border-subtle/40 p-8 rounded-3xl relative shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Quote className="absolute top-6 right-8 w-12 h-12 text-accent-gold/10" />
                <div className="flex space-x-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                  ))}
                </div>
                <p className="font-sans text-xs sm:text-sm text-charcoal/80 leading-relaxed mb-6 italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div>
                  <h4 className="font-serif text-base font-bold text-primary">{review.name}</h4>
                  <p className="font-sans text-[11px] text-muted-text uppercase tracking-widest mt-1">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-24 sm:py-32 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-primary font-medium">
            Frequently Asked Queries
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="border border-border-subtle/60 rounded-2xl bg-secondary/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-semibold text-primary">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-accent-gold transition-transform duration-300 shrink-0 ml-4 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-[300px] border-t border-border-subtle/40" : "max-h-0"
                  }`}
                >
                  <p className="font-sans text-xs sm:text-sm text-muted-text p-6 leading-relaxed bg-bg-ivory/50">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Final Call To Action */}
      <section className="py-24 bg-primary text-secondary text-center relative overflow-hidden border-t border-primary-light">
        {/* Decorative background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4 animate-pulse">
            Pure Organic Luxury
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-medium text-white leading-tight mb-6">
            Nourish Your Body with Fresh Handcrafted Batches
          </h2>
          <p className="font-sans text-sm sm:text-base text-secondary/70 leading-relaxed mb-10 max-w-xl mx-auto">
            Order freshly milled health porridge, cold pressed copra oils, and traditional aromatic powders directly via WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="bg-accent-gold hover:bg-accent-gold-dark text-primary font-sans text-xs uppercase tracking-widest font-bold px-10 py-5 rounded-full shadow-2xl transition-colors w-full sm:w-auto"
            >
              Explore Products Catalog
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%20Momspure%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20organic%20health%20mixes."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-secondary/20 hover:border-accent-gold text-secondary font-sans text-xs uppercase tracking-widest font-bold px-10 py-5 rounded-full hover:text-accent-gold transition-colors w-full sm:w-auto"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* SEO Structured Schema Markups */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Momspure Foods",
            "image": "https://momspure.com/assets/IMG_0061.webp",
            "telephone": "+919876543210",
            "email": "orders@momspure.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Green Meadows Layout, Sector 4",
              "addressLocality": "Bengaluru",
              "addressRegion": "Karnataka",
              "postalCode": "560034",
              "addressCountry": "IN"
            },
            "priceRange": "₹₹",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />
    </div>
  );
}
