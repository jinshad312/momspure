"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ArrowRight, MessageSquare, Check } from "lucide-react";
import Link from "next/link";

export default function ScrollControlledVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  


  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Interaction listener to start video playback once
    let interactionTriggered = false;
    const startVideoPlayback = () => {
      if (interactionTriggered) return;
      interactionTriggered = true;
      video.play().catch((err) => {
        console.log("Playback on interaction was prevented:", err);
      });
      removeInteractionListeners();
    };

    const addInteractionListeners = () => {
      window.addEventListener("touchstart", startVideoPlayback, { passive: true });
      window.addEventListener("mousedown", startVideoPlayback, { passive: true });
      window.addEventListener("scroll", startVideoPlayback, { passive: true });
      window.addEventListener("wheel", startVideoPlayback, { passive: true });
      window.addEventListener("keydown", startVideoPlayback, { passive: true });
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("touchstart", startVideoPlayback);
      window.removeEventListener("mousedown", startVideoPlayback);
      window.removeEventListener("scroll", startVideoPlayback);
      window.removeEventListener("wheel", startVideoPlayback);
      window.removeEventListener("keydown", startVideoPlayback);
    };

    addInteractionListeners();

    const handleLoadedMetadata = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      // Force video frame to 0 initially as a poster preview
      video.currentTime = 0.01;

      // Unified scroll-driven timeline driving only the content layer reveals & pinning
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=400%", // Consistent scroll distance for pinning duration
          pin: true,
          scrub: true, // Directly maps scroll position to text layers transition
          invalidateOnRefresh: true
        }
      });

      // Independent, overlapping text layers fading and sliding over the background video
      // Text block 1: Starts fully visible (opacity-100 on load), then fades out from 0.15 to 0.23
      mainTimeline
        .to(
          text1Ref.current,
          { opacity: 0, scale: 1.03, y: -30, duration: 0.08, ease: "power2.in" },
          0.15
        );

      // Text block 2: Reveals from 0.30 to 0.40, fades out from 0.47 to 0.53
      mainTimeline
        .fromTo(
          text2Ref.current,
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.10, ease: "power2.out" },
          0.30
        )
        .to(
          text2Ref.current,
          { opacity: 0, scale: 1.03, y: -30, duration: 0.08, ease: "power2.in" },
          0.47
        );

      // Text block 3: Reveals from 0.55 to 0.65, fades out from 0.72 to 0.78
      mainTimeline
        .fromTo(
          text3Ref.current,
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.10, ease: "power2.out" },
          0.55
        )
        .to(
          text3Ref.current,
          { opacity: 0, scale: 1.03, y: -30, duration: 0.08, ease: "power2.in" },
          0.72
        );

      // Text block 4 (Final CTA): Reveals from 0.80 to 0.90, remains active
      mainTimeline.fromTo(
        text4Ref.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.12, ease: "power2.out" },
        0.80
      );

      return () => {
        mainTimeline.scrollTrigger?.kill();
        mainTimeline.kill();
      };
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      removeInteractionListeners();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-primary overflow-hidden"
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        src="/assets/IMG_0059.webm"
        className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none transform scale-102"
        playsInline
        muted
        loop
        preload="auto"
        controls={false}
      />

      {/* Luxury Radial & Linear Dark Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-primary pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-primary/45 pointer-events-none z-10" />

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-secondary/60 animate-bounce pointer-events-none">
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase mb-2">Scroll to discover story</span>
        <ChevronDown className="w-4 h-4 text-accent-gold" />
      </div>

      {/* Storytelling Text Overlays */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-6 text-center pointer-events-none">
        
        {/* Step 1: Welcome / Main Headline & CTAs (Opaque on mount) */}
        <div ref={text1Ref} className="absolute max-w-4xl flex flex-col items-center">
          <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4 border border-accent-gold/25 px-5 py-2 rounded-full bg-primary/30 backdrop-blur-md">
            Welcome to Purity
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-secondary leading-tight font-semibold max-w-3xl mb-6">
            Experience Momspure Organic Goodness
          </h2>
          <p className="font-sans text-sm sm:text-base text-secondary/85 max-w-2xl mb-10 leading-relaxed">
            Wholesome sprouted mixes, traditional aromatic powders, and cold-pressed oils handcrafted in small batches to preserve ancestral nutrients—exactly like our mothers did.
          </p>
          <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/products"
              className="bg-accent-gold hover:bg-accent-gold-dark text-primary font-sans text-xs uppercase tracking-widest font-bold px-10 py-5 rounded-full shadow-2xl flex items-center space-x-2 transition-transform duration-200 active:scale-95 border border-accent-gold/10"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/919876543210?text=Hi%20Momspure%2C%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent hover:bg-secondary/10 text-secondary font-sans text-xs uppercase tracking-widest font-bold px-10 py-5 rounded-full border border-secondary/20 flex items-center space-x-2 transition-colors active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-accent-gold" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-secondary/70 font-sans text-[10px] sm:text-xs tracking-wider border-t border-secondary/10 pt-6">
            <span className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-accent-gold" /> 100% Certified Organic</span>
            <span className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-accent-gold" /> Sprouted for Nutrition</span>
            <span className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-accent-gold" /> Zero Preservatives & MSG</span>
          </div>
        </div>

        {/* Step 2: Pure ingredients (USP 1) */}
        <div ref={text2Ref} className="absolute max-w-4xl opacity-0 flex flex-col items-center">
          <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4 border border-accent-gold/20 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm">
            Nature&apos;s Selection
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-secondary leading-tight font-medium max-w-3xl mb-4">
            100% Wholesome Ingredients, Crafted With Devotion
          </h2>
          <p className="font-sans text-sm sm:text-base text-secondary/70 max-w-xl leading-relaxed">
            Hand-selected grains, cold-pressed seeds, and traditional mixtures designed to retain vital vitamins and minerals.
          </p>
        </div>

        {/* Step 3: Traditional Recipes (USP 2) */}
        <div ref={text3Ref} className="absolute max-w-4xl opacity-0 flex flex-col items-center">
          <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4 border border-accent-gold/20 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm">
            Pure Heritage
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-secondary leading-tight font-medium max-w-3xl mb-4">
            No Preservatives. Just Traditional Recipes.
          </h2>
          <p className="font-sans text-sm sm:text-base text-secondary/70 max-w-xl leading-relaxed">
            Exactly like how our mothers ground it. No artificial shelf-stabilizers, added thickeners, colors, or MSG.
          </p>
        </div>

        {/* Step 4: Sprouted Grains (USP 3 & Final Call to Action) */}
        <div ref={text4Ref} className="absolute max-w-4xl opacity-0 flex flex-col items-center">
          <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4 border border-accent-gold/20 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm">
            Bio-Available Strength
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-secondary leading-tight font-medium max-w-3xl mb-4">
            Activated Sprouted Grains For Safe Digestion
          </h2>
          <p className="font-sans text-sm sm:text-base text-secondary/70 max-w-xl mb-10 leading-relaxed">
            We soak and sprout our grains for 24-48 hours to release vital enzymes, multiply active vitamins, and ensure easy digestibility.
          </p>
          <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/products"
              className="bg-accent-gold hover:bg-accent-gold-dark text-primary font-sans text-xs uppercase tracking-widest font-bold px-10 py-5 rounded-full shadow-2xl flex items-center space-x-2 transition-transform duration-200 active:scale-95 border border-accent-gold/10"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/919876543210?text=Hi%20Momspure%2C%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent hover:bg-secondary/10 text-secondary font-sans text-xs uppercase tracking-widest font-bold px-10 py-5 rounded-full border border-secondary/20 flex items-center space-x-2 transition-colors active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-accent-gold" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
