export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  concernTags: string[];
  priceBDT: number;
  images: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  isBundle?: boolean;
  description: string;
  howToUse: string;
  skinTypes?: string[];
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: string;
  brand: string;
  concern: string;
  priceRange: [number, number];
}

export interface SortOption {
  value: string;
  label: string;
}
