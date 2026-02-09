"use client";

import React from "react"

import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function NewsletterSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-[#1A1A1A]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <p
            className={`text-sm text-white/50 uppercase tracking-wider mb-4 font-body transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Stay Connected
          </p>

          <h2
            className={`font-display text-4xl sm:text-5xl text-white mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Join Our Newsletter
          </h2>

          <p
            className={`text-white/60 leading-relaxed mb-10 font-body transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Be the first to discover new arrivals, exclusive offers, and stories from the makers behind our collection.
          </p>

          {/* Form */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-white/70 text-sm font-body">
                  Welcome to Elira
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-white/10 border border-white/20 rounded-full py-4 px-6 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors font-body"
                  required
                />
                <button
                  type="button"
                  className="bg-white text-[#1A1A1A] px-8 py-4 rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Privacy Note */}
          <p
            className={`text-xs text-white/40 mt-6 font-body transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
