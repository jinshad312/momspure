"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ScrollControlledVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Simulate loading for smoother user entry
    const loadInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

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
      clearInterval(loadInterval);
      setLoadingProgress(100);
      setIsVideoReady(true);
      
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
      // Text block 1: Reveals from 0.05 to 0.15, fades out from 0.22 to 0.28
      mainTimeline
        .fromTo(
          text1Ref.current,
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.10, ease: "power2.out" },
          0.05
        )
        .to(
          text1Ref.current,
          { opacity: 0, scale: 1.03, y: -30, duration: 0.08, ease: "power2.in" },
          0.22
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
      clearInterval(loadInterval);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      removeInteractionListeners();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-primary overflow-hidden"
    >
      {/* Loading Overlay */}
      {!isVideoReady && (
        <div className="absolute inset-0 bg-primary z-30 flex flex-col items-center justify-center text-secondary">
          <span className="font-serif text-3xl font-light tracking-widest animate-pulse mb-6">
            MOMS<span className="text-accent-gold font-bold">PURE</span>
          </span>
          <div className="w-48 h-[1px] bg-secondary/20 relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-accent-gold transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <span className="font-sans text-[10px] text-secondary/50 uppercase tracking-widest mt-4">
            Curating organic storytelling... {loadingProgress}%
          </span>
        </div>
      )}

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
        
        {/* Step 1: Pure ingredients */}
        <div ref={text1Ref} className="absolute max-w-4xl opacity-0 flex flex-col items-center">
          <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4 border border-accent-gold/20 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm">
            Nature&apos;s Selection
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-secondary leading-tight font-medium max-w-3xl mb-4">
            100% Wholesome Ingredients, Crafted With Devotion
          </h2>
          <p className="font-sans text-sm sm:text-base text-secondary/70 max-w-xl leading-relaxed">
            Hand-selected grains, cold-pressed oils, and traditional mixtures designed to preserve vital minerals.
          </p>
        </div>

        {/* Step 2: Traditional Recipes */}
        <div ref={text2Ref} className="absolute max-w-4xl opacity-0 flex flex-col items-center">
          <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4 border border-accent-gold/20 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm">
            Pure Heritage
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-secondary leading-tight font-medium max-w-3xl mb-4">
            No Preservatives. Just Traditional Recipes.
          </h2>
          <p className="font-sans text-sm sm:text-base text-secondary/70 max-w-xl leading-relaxed">
            Exactly like how our mothers ground it. No artificial shelf-stabilizers, added thickeners, or MSG.
          </p>
        </div>

        {/* Step 3: Natural benefits */}
        <div ref={text3Ref} className="absolute max-w-4xl opacity-0 flex flex-col items-center">
          <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4 border border-accent-gold/20 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm">
            Bio-Available Strength
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-secondary leading-tight font-medium max-w-3xl mb-4">
            Activated Sprouted Grains For Safe Digestion
          </h2>
          <p className="font-sans text-sm sm:text-base text-secondary/70 max-w-xl leading-relaxed">
            We soak and sprout our grains for 24-48 hours to release vitamins and ensure easy digestibility.
          </p>
        </div>

        {/* Step 4: Final Call to Action */}
        <div ref={text4Ref} className="absolute max-w-4xl opacity-0 flex flex-col items-center">
          <span className="font-sans text-xs text-accent-gold uppercase tracking-[0.3em] font-bold block mb-4 border border-accent-gold/25 px-5 py-2 rounded-full bg-primary/30 backdrop-blur-md">
            Welcome to Purity
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-secondary leading-tight font-semibold max-w-3xl mb-6">
            Experience Momspure Organic Goodness
          </h2>
          <p className="font-sans text-sm sm:text-base text-secondary/80 max-w-lg mb-10 leading-relaxed">
            Premium unrefined oils, sprouted mixes, and traditional aromatic powders handcrafted for wholesome wellness.
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
