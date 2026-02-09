"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="about" ref={ref} className="py-20 lg:py-32 bg-[#FAFAFA] lg:pb-6">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Text Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-sm text-[#737373] uppercase tracking-wider mb-4 font-body">
              About Elora
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] mb-6">
              Beauty That Cares
            </h2>
            <p className="text-[#737373] leading-relaxed mb-6 font-body">
              Elora was born from a simple belief—that skincare should be as gentle on your skin as it is on the planet. We create products that combine natural ingredients with scientific innovation.
            </p>
            <p className="text-[#737373] leading-relaxed font-body">
              Each formula in our collection is carefully crafted for its purity, effectiveness, and ability to enhance your natural beauty.
            </p>
          </div>

          {/* Image */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src="/images/d1.jpg"
                alt="Artisan craftsmanship"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        
      </div>
    </section>
  );
}
