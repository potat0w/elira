"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function EditorialSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(0.7);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculer la progression du scroll pour cette section
      // Commence quand la section est en bas de l'écran, termine quand elle est au centre
      const startScroll = windowHeight;
      const endScroll = windowHeight / 2;
      
      if (rect.top <= startScroll && rect.top >= endScroll) {
        // En cours de scroll - interpoler entre 0.7 et 1
        const progress = (startScroll - rect.top) / (startScroll - endScroll);
        const newScale = 0.7 + (progress * 0.3); // De 0.7 à 1.0
        setScale(newScale);
      } else if (rect.top < endScroll) {
        // Section passée - garder à 1
        setScale(1);
      } else {
        // Section pas encore atteinte - garder à 0.7
        setScale(0.7);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="relative bg-white">
      {/* Full Width/Height Hero Image with Text Overlay */}
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
        {/* Background Image with Zoom Effect */}
        <div 
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `scale(${scale})` }}
        >
          <Image
            src="/images/blog-interior.jpg"
            alt="Modern home office interior"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

        {/* Text Content Overlay */}
        <div className="relative h-full flex flex-col justify-end px-6 lg:px-12 pb-16 lg:pb-24">
          <div className="max-w-[1400px] mx-auto w-full">
            {/* Breadcrumb */}
            <div
              className={`mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              
            </div>

            {/* Article Header */}
            <div
              className={`mb-8 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl text-white mb-6 max-w-3xl">
                The Science of Radiant Skin: Understanding Natural Beauty
              </h2>

              {/* Author Info */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden backdrop-blur-sm">
                    <Image
                      src="/images/lifestyle-portrait.jpg"
                      alt="Sophie Martinez"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Sophie Martinez</p>
                    <p className="text-xs text-white/70 font-body">Skincare Specialist</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 font-body">Jan 15, 2026 · 5 min read</p>
              </div>
            </div>

            {/* Article Content */}
            <div className="max-w-3xl">
              <h3
                className={`font-display text-white mb-6 transition-all duration-700 delay-300 text-2xl lg:text-3xl ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Nourishing Your Skin, Naturally
              </h3>

              <p
                className={`text-white/90 leading-relaxed mb-6 font-body transition-all duration-700 delay-400 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                In a world filled with harsh chemicals, protecting your skin has never been more important. Our carefully formulated collection brings together botanical ingredients that transform your skincare routine into a moment of self-care.
              </p>

              <p
                className={`text-white/90 leading-relaxed font-body transition-all duration-700 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Every product tells a story of nature and science working together. From organic extracts to clinically-proven formulas, these treatments are designed to reveal your most radiant skin while respecting the planet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
