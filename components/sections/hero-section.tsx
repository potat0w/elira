"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image"; // Import Image component

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 600; // Distance de scroll pour la transition complète (augmentée)
      const progress = Math.min(scrollPosition / maxScroll, 1);
      // Easing function pour une transition plus douce
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      setScrollProgress(easeProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calcul des valeurs interpolées avec easing
  const borderRadius = scrollProgress * 24; // De 0 à 24px
  
  // Hauteur finale calculée (21:9 ratio, environ 600px pour 1400px de largeur)
  const finalHeight = 600;
  const initialHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const currentHeight = initialHeight - (initialHeight - finalHeight) * scrollProgress;
  
  // Padding horizontal progressif
  const horizontalPadding = scrollProgress * 48;

  return (
    <section className="relative bg-black -mt-20 overflow-hidden">
      <div 
        className="w-full"
        style={{
          paddingLeft: `${horizontalPadding}px`,
          paddingRight: `${horizontalPadding}px`,
          paddingTop: `${scrollProgress * 48}px`,
          paddingBottom: `${scrollProgress * 48}px`,
        }}
      >
        {/* Hero Video Container */}
        <div 
          className="relative w-full overflow-hidden"
          style={{
            height: `${currentHeight}px`,
            borderRadius: `${borderRadius}px`,
          }}
          suppressHydrationWarning
        >
          <video
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fe2bd907-240d-4240-a460-12464b027146_1-P8x2GoydHaS07jpWce2k4icyBqGd1a.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
              isVisible ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
          />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-16 rounded-none">
            {/* Mobile: Stacked Layout */}
            <div className="lg:hidden flex flex-col items-center text-center space-y-6 w-full">
              <h1
                className={`font-display text-5xl sm:text-6xl text-white italic transition-all duration-300 delay-100 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Effortlessly Living
              </h1>

              <p
                className={`text-white/90 text-base transition-all duration-300 delay-150 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Discover quality products with fast shipping and secure checkout.
              </p>

              <Link
                href="#shop"
                className={`flex items-center justify-center gap-2 bg-white text-[#1A1A1A] px-6 py-4 rounded-full text-sm font-medium hover:bg-[#F5F5F5] transition-all duration-300 delay-200 w-full ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Shop now
                <span className="w-8 h-8 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            {/* Desktop: Original Layout */}
            <div className="hidden lg:block">
              {/* Shop Now Button - Left */}
              <div
                className={`absolute left-16 bottom-16 transition-all duration-700 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Link
                  href="#shop"
                  className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
                >
                  Shop now
                  <span className="w-8 h-8 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>

              {/* Hero Text - Right */}
              <div className="absolute right-16 bottom-16 text-right">
                <h1
                  className={`font-display text-8xl text-white italic transition-all duration-700 delay-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  {"Live beautifully."}
                </h1>
                <p
                  className={`mt-4 text-white/90 text-sm max-w-md ml-auto transition-all duration-700 delay-400 text-left ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  Discover thoughtfully crafted beauty essentials designed to nourish your skin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
