"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, X } from "lucide-react";
import { products, categories, brands, concerns, sortOptions } from "@/data/products";
import { useCart } from "@/contexts/cart-context";
import { Product, FilterState } from "@/types/product";

const ITEMS_PER_PAGE = 12;

export default function ShopPage() {
  const { addItem, toggleCart } = useCart();
  
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    brand: 'All',
    concern: 'All',
    priceRange: [0, 10000]
  });
  
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      if (filters.category !== 'All' && product.category !== filters.category) return false;
      if (filters.brand !== 'All' && product.brand !== filters.brand) return false;
      if (filters.concern !== 'All' && !product.concernTags.includes(filters.concern)) return false;
      if (product.priceBDT < filters.priceRange[0] || product.priceBDT > filters.priceRange[1]) return false;
      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.priceBDT - b.priceBDT);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.priceBDT - a.priceBDT);
        break;
      case 'bestsellers':
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toggleCart(); // Open cart drawer
  };

  const handleQuickView = (product: Product) => {
    // For now, just navigate to product page
    // In a real implementation, this would open a modal
    window.location.href = `/product/${product.slug}`;
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      brand: 'All',
      concern: 'All',
      priceRange: [0, 10000]
    });
    setCurrentPage(1);
  };

  const activeFilterCount = [
    filters.category !== 'All',
    filters.brand !== 'All',
    filters.concern !== 'All',
    filters.priceRange[0] > 0 || filters.priceRange[1] < 10000
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop</h1>
          <p className="text-gray-600">
            {filteredAndSortedProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Category</Label>
                  <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Brand</Label>
                  <Select value={filters.brand} onValueChange={(value) => updateFilter('brand', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Concern Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Skin Concern</Label>
                  <Select value={filters.concern} onValueChange={(value) => updateFilter('concern', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {concerns.map(concern => (
                        <SelectItem key={concern} value={concern}>
                          {concern}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Price Range (BDT)</Label>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0]}
                      onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1]}
                      onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 10000])}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters & Sort */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="ml-2 bg-gray-900 text-white text-xs px-2 py-1">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Category Filter */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Category</Label>
                      <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Brand Filter */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Brand</Label>
                      <Select value={filters.brand} onValueChange={(value) => updateFilter('brand', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map(brand => (
                            <SelectItem key={brand} value={brand}>
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Concern Filter */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Skin Concern</Label>
                      <Select value={filters.concern} onValueChange={(value) => updateFilter('concern', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {concerns.map(concern => (
                            <SelectItem key={concern} value={concern}>
                              {concern}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Price Range (BDT)</Label>
                      <div className="space-y-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={filters.priceRange[0]}
                          onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={filters.priceRange[1]}
                          onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 10000])}
                        />
                      </div>
                    </div>

                    <Button onClick={clearFilters} variant="outline" className="w-full">
                      Clear Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Sort */}
            <div className="hidden lg:flex justify-end mb-6">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No products found matching your filters.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onQuickView={handleQuickView}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
