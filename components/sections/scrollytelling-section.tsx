"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Leaf, Ruler, Truck } from "lucide-react";

export function ProductDetailSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <div
            className={`transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="aspect-square relative overflow-hidden bg-[#F5F5F5]">
              <video
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fe2bd907-240d-4240-a460-12464b027146_1-P8x2GoydHaS07jpWce2k4icyBqGd1a.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div
            className={`flex flex-col justify-center transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <h1 className="font-display text-4xl lg:text-5xl text-[#1A1A1A] mb-2">
              Dior Capture Totale Intensive Essence Lotion
            </h1>
            <p className="text-xl text-[#1A1A1A] mb-6 font-body">
              ৳ 11,271
            </p>

            <p className="text-[#737373] leading-relaxed mb-8 font-body">
              A luxurious essence lotion that captures the power of Dior's exclusive ingredients for youthful, radiant skin.
            </p>

            {/* Info Blocks - Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="border border-[#E5E5E5] p-4 rounded-xs border-none px-4">
                <Leaf className="w-8 h-8 mb-3 text-[#1A1A1A]" strokeWidth={1} />
                <h3 className="text-sm font-medium text-[#1A1A1A] mb-2 font-body">Product Details</h3>
                <p className="text-xs text-[#737373] leading-relaxed font-body">
                  Natural ingredients, dermatologically tested.
                </p>
              </div>
              <div className="border border-[#E5E5E5] p-4 rounded-xs border-none px-4">
                <Ruler className="w-8 h-8 mb-3 text-[#1A1A1A]" strokeWidth={1} />
                <h3 className="text-sm font-medium text-[#1A1A1A] mb-2 font-body">Size</h3>
                <p className="text-xs text-[#737373] leading-relaxed font-body">
                  30ml, 50ml, and 100ml. Sustainable glass packaging.
                </p>
              </div>
              <div className="border border-[#E5E5E5] p-4 rounded-xs border-none px-4">
                <Truck className="w-8 h-8 mb-3 text-[#1A1A1A]" strokeWidth={1} />
                <h3 className="text-sm font-medium text-[#1A1A1A] mb-2 font-body">Shipping</h3>
                <p className="text-xs text-[#737373] leading-relaxed font-body">
                  Free over $100. 3-5 days delivery. 30-day returns.
                </p>
              </div>
            </div>

            {/* Buy Button */}
            <button
              type="button"
              className="w-full bg-[#1A1A1A] text-white py-4 rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Buy now
            </button>
          </div>
        </div>

        {/* Browse More Section */}
        <div
          className={`mt-24 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "dot & key moisturizing cream", price: "৳ 1,025", image: "/images/dkcream.jpg" },
              { name: "dot & key vitamin c", price: "৳ 1,125", image: "/images/dkvitc.jpg" },
              { name: "mCaffeine Watermelon Lip Balm", price: "৳ 525", image: "/images/lipbulm.jpg" },
            ].map((product, index) => (
              <Link
                key={product.name}
                href="#"
                className="group text-center"
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-[#F5F5F5] mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h4 className="font-display text-lg text-[#1A1A1A] mb-1">
                  {product.name}
                </h4>
                <p className="text-[#737373] text-sm font-body">
                  {product.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
