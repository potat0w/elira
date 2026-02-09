"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Elira transformed our living room into a sanctuary. Every piece feels intentional and brings genuine calm to our daily routine.",
    author: "Marie Laurent",
    role: "Interior Designer",
    location: "Paris, France",
  },
  {
    id: 2,
    quote: "The attention to detail is remarkable. You can feel the quality and the thought that goes into each product's design.",
    author: "James Chen",
    role: "Architect",
    location: "Vancouver, Canada",
  },
  {
    id: 3,
    quote: "Finally, a brand that understands that less truly can be more. My home has never felt more peaceful.",
    author: "Sofia Andersson",
    role: "Photographer",
    location: "Stockholm, Sweden",
  },
];

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm text-[#737373] uppercase tracking-wider mb-4 font-body">
            Testimonials
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-[#1A1A1A]">
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Quote */}
          <div className="relative min-h-[280px] flex items-center justify-center text-center px-8 lg:px-20">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                  activeIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <blockquote className="mb-8">
                  <p className="font-display text-2xl md:text-3xl lg:text-4xl text-[#1A1A1A] leading-relaxed max-w-4xl">
                    "{testimonial.quote}"
                  </p>
                </blockquote>
                <footer>
                  <p className="text-[#1A1A1A] font-medium mb-1">{testimonial.author}</p>
                  <p className="text-sm text-[#737373] font-body">
                    {testimonial.role} — {testimonial.location}
                  </p>
                </footer>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              type="button"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-[#1A1A1A] w-6"
                      : "bg-[#E5E5E5] hover:bg-[#737373]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
