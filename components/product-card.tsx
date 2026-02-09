"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { formatBDT } from "@/lib/currency";
import { useCart } from "@/contexts/cart-context";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addItem(product);
    }
  };

  const handleQuickView = () => {
    if (onQuickView) onQuickView(product);
  };

  const currentImage = isHovered && product.images.length > 1 
    ? product.images[1] 
    : product.images[0];

  return (
    <div 
      className="group relative flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link href={`/product/${product.slug}`}>
        <div className="aspect-[4/5] relative overflow-hidden bg-white border border-gray-200 mb-4 shadow-sm">
          <Image
            src={currentImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleQuickView();
              }}
              variant="secondary"
              size="sm"
              className="bg-white text-black hover:bg-gray-100"
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isBestSeller && (
              <Badge className="bg-black text-white text-xs">Best Seller</Badge>
            )}
            {product.isNew && (
              <Badge className="bg-green-600 text-white text-xs">New</Badge>
            )}
            {product.isBundle && (
              <Badge className="bg-purple-600 text-white text-xs">Bundle</Badge>
            )}
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-3 p-4 bg-white flex flex-col flex-grow">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-lg text-[#1A1A1A] hover:text-[#333333] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-[#737373] text-sm font-body line-clamp-2">
          {product.benefit}
        </p>
        
        <div className="flex items-center justify-between">
          <p className="text-[#1A1A1A] text-lg font-semibold">
            {formatBDT(product.priceBDT)}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-[#1A1A1A] text-white hover:bg-[#333333]"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          
          {product.images.length > 1 && (
            <Button
              onClick={handleQuickView}
              variant="outline"
              size="sm"
              className="border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
            >
              <Eye className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
