"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { products, categories } from "@/data/products";
import { useCart } from "@/contexts/cart-context";

export function FeaturedProductsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState("All");
  const { addItem, toggleCart } = useCart();

  const filteredProducts = activeCategory === "All" 
    ? products.slice(0, 8) // Show only 8 products on homepage
    : products.filter(p => p.category === activeCategory).slice(0, 8);

  const handleAddToCart = (product: any) => {
    addItem(product);
    toggleCart();
  };

  const handleQuickView = (product: any) => {
    window.location.href = `/product/${product.slug}`;
  };

  return (
    <section id="shop" ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] mb-4">
            Explore Elora Shop
          </h2>
          <p className="text-[#737373] text-base font-body mb-8">
            Discover our curated collection of premium skincare products
          </p>
          <a 
            href="/shop" 
            className="inline-flex items-center justify-center rounded-full bg-[#1A1A1A] text-white px-8 py-3 font-medium transition-colors hover:bg-[#333333]"
          >
            View All Products
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${100 + index * 50}ms` }}
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
