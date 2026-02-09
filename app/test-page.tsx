"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";
import { useCart } from "@/contexts/cart-context";

export default function TestPage() {
  const { addItem, toggleCart } = useCart();

  const handleAddToCart = (product: any) => {
    addItem(product);
    toggleCart();
  };

  const handleQuickView = (product: any) => {
    console.log("Quick view:", product.name);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Test Page - E-commerce Components</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.slice(0, 3).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onQuickView={handleQuickView}
          />
        ))}
      </div>
    </div>
  );
}
