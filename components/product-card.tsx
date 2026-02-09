"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { formatBDTSimple } from "@/lib/currency";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden">
        <Image
          src={product.images[currentImageIndex] || '/images/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isBestSeller && (
            <Badge className="bg-red-500 text-white text-xs px-2 py-1">
              Best Seller
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-green-500 text-white text-xs px-2 py-1">
              New
            </Badge>
          )}
          {product.isBundle && (
            <Badge className="bg-purple-500 text-white text-xs px-2 py-1">
              Bundle
            </Badge>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            size="sm"
            onClick={handleQuickView}
            className="bg-white text-black hover:bg-gray-100"
          >
            <Eye className="w-4 h-4 mr-1" />
            Quick View
          </Button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <div className="space-y-2">
          {/* Brand */}
          <p className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</p>
          
          {/* Product Name */}
          <Link 
            href={`/product/${product.slug}`}
            className="block text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors line-clamp-2"
          >
            {product.name}
          </Link>
          
          {/* Benefit Tag */}
          <p className="text-xs text-gray-600">
            {product.concernTags.slice(0, 2).join(' + ')}
          </p>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-900">
              {formatBDTSimple(product.priceBDT)}
            </p>
            
            {/* Add to Cart Button */}
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-gray-900 text-white hover:bg-gray-800"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
