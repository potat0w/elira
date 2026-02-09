"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const categories = ["All", "New Arrivals", "Best Sellers", "Serums", "Moisturizers", "Treatments"];

const products = [
  {
    id: 1,
    name: "Naturalist Face Wash",
    brand: "Naturalist",
    category: "Treatments",
    concernTags: ["Cleansing", "Natural Ingredients"],
    priceBDT: 525,
    images: ["/images/NaturalistFacewash.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Gentle face wash with natural ingredients for daily cleansing.",
    howToUse: "Apply to damp skin, massage gently, rinse thoroughly.",
    skinTypes: ["All Skin Types"],
    slug: "naturalist-face-wash"
  },
  {
    id: 2,
    name: "Alexandra Tran Lifestyle",
    brand: "Alexandra Tran",
    category: "Best Sellers",
    concernTags: ["Lifestyle", "Premium"],
    priceBDT: 750,
    images: ["/images/alexandra-tran-zZf7RA5aSTc-unsplash.jpg"],
    isBestSeller: true,
    isNew: false,
    isBundle: false,
    description: "Premium lifestyle product for everyday elegance.",
    howToUse: "Use as part of your daily lifestyle routine.",
    skinTypes: ["All Skin Types"],
    slug: "alexandra-tran-lifestyle"
  },
  {
    id: 3,
    name: "Alure Hand Cream",
    brand: "Alure",
    category: "Moisturizers",
    concernTags: ["Hydration", "Hand Care"],
    priceBDT: 450,
    images: ["/images/alurehandcream.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Nourishing hand cream for soft, smooth hands.",
    howToUse: "Apply to hands as needed throughout the day.",
    skinTypes: ["All Skin Types"],
    slug: "alure-hand-cream"
  },
  {
    id: 4,
    name: "SKIN1004 Madagascar Centella Cream",
    brand: "SKIN1004",
    category: "Best Sellers",
    concernTags: ["Soothing", "Centella"],
    priceBDT: 2100,
    images: ["/images/anna-keibalo-4W4zySfM86k-unsplash.jpg"],
    isBestSeller: true,
    isNew: false,
    isBundle: false,
    description: "Centella cream from Madagascar for calming and soothing skin.",
    howToUse: "Apply to clean skin, massage gently until absorbed.",
    skinTypes: ["Sensitive", "All Skin Types"],
    slug: "skin1004-madagascar-centella-cream"
  },
  {
    id: 5,
    name: "Aqualogica Body Mist",
    brand: "Aqualogica",
    category: "Best Sellers",
    concernTags: ["Fresh", "Body Care"],
    priceBDT: 750,
    images: ["/images/aqualogica.jpg"],
    isBestSeller: true,
    isNew: false,
    isBundle: false,
    description: "Refreshing body mist for all-day freshness.",
    howToUse: "Spray on body as needed for instant freshness.",
    skinTypes: ["All Skin Types"],
    slug: "aqualogica-body-mist"
  },
  {
    id: 6,
    name: "Bliss Cleansers",
    brand: "Bliss",
    category: "Treatments",
    concernTags: ["Cleansing", "Deep Clean"],
    priceBDT: 2100,
    images: ["/images/bliss.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Deep cleansing formula for purified skin.",
    howToUse: "Apply to damp skin, massage in circular motions, rinse.",
    skinTypes: ["Normal", "Oily"],
    slug: "bliss-cleansers"
  },
  {
    id: 7,
    name: "Brondie Toning Shampoo",
    brand: "Brondie",
    category: "Treatments",
    concernTags: ["Hair Care", "Toning"],
    priceBDT: 2500,
    images: ["/images/bronde.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Toning shampoo for beautiful bronde hair.",
    howToUse: "Apply to wet hair, lather, rinse thoroughly.",
    skinTypes: ["All Hair Types"],
    slug: "brondie-toning-shampoo"
  },
  {
    id: 8,
    name: "dot & key moisturizing cream",
    brand: "Dot & Key",
    category: "Moisturizers",
    concernTags: ["Hydration", "Moisturizing"],
    priceBDT: 1025,
    images: ["/images/dkcream.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Intense moisturizing cream for hydrated skin.",
    howToUse: "Apply to clean face and neck, massage gently.",
    skinTypes: ["Dry", "Normal"],
    slug: "dot-key-moisturizing-cream"
  },
  {
    id: 9,
    name: "dot & key vitamin c",
    brand: "Dot & Key",
    category: "Serums",
    concernTags: ["Brightening", "Vitamin C"],
    priceBDT: 1125,
    images: ["/images/dkvitc.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Vitamin C serum for bright and radiant skin.",
    howToUse: "Apply to clean skin, follow with moisturizer.",
    skinTypes: ["All Skin Types"],
    slug: "dot-key-vitamin-c"
  },
  {
    id: 10,
    name: "Ela De Pure Face Mask",
    brand: "Ela De Pure",
    category: "Treatments",
    concernTags: ["Mask", "Purifying"],
    priceBDT: 650,
    images: ["/images/ela-de-pure-nkBLQheXjsU-unsplash.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Purifying face mask for clear, clean skin.",
    howToUse: "Apply to clean face, leave for 15-20 minutes, rinse.",
    skinTypes: ["All Skin Types"],
    slug: "ela-de-pure-face-mask"
  },
  {
    id: 11,
    name: "Elena Soroka Beauty",
    brand: "Elena Soroka",
    category: "Best Sellers",
    concernTags: ["Beauty", "Premium"],
    priceBDT: 1200,
    images: ["/images/elena-soroka-jEsaxA6gD2c-unsplash.jpg"],
    isBestSeller: true,
    isNew: false,
    isBundle: false,
    description: "Premium beauty product for elegant results.",
    howToUse: "Use as directed for best results.",
    skinTypes: ["All Skin Types"],
    slug: "elena-soroka-beauty"
  },
  {
    id: 12,
    name: "Mary Kay Clinical Solutions C + Resveratrol Line-Reducer",
    brand: "Mary Kay",
    category: "Serums",
    concernTags: ["Anti-aging", "Line Reducing"],
    priceBDT: 4500,
    images: ["/images/h2.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Clinical solution with Vitamin C and Resveratrol to reduce fine lines.",
    howToUse: "Apply to targeted areas, use morning and evening.",
    skinTypes: ["Mature", "All Skin Types"],
    slug: "mary-kay-clinical-solutions-resveratrol"
  },
  {
    id: 13,
    name: "Dior Capture Totale Intensive Essence Lotion",
    brand: "Dior",
    category: "Best Sellers",
    concernTags: ["Luxury", "Essence"],
    priceBDT: 11271,
    images: ["/images/hero.png"],
    isBestSeller: true,
    isNew: false,
    isBundle: false,
    description: "Luxury intensive essence lotion for ultimate skin care.",
    howToUse: "Apply after cleansing, before other treatments.",
    skinTypes: ["All Skin Types"],
    slug: "dior-capture-totale-intensive-essence"
  },
  {
    id: 14,
    name: "Laneige Product",
    brand: "Laneige",
    category: "Treatments",
    concernTags: ["Korean Beauty", "Treatment"],
    priceBDT: 1750,
    images: ["/images/lanige.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Korean beauty treatment for radiant skin.",
    howToUse: "Apply as part of your skincare routine.",
    skinTypes: ["All Skin Types"],
    slug: "laneige-product"
  },
  {
    id: 15,
    name: "Love Beauty and Planet",
    brand: "Love Beauty and Planet",
    category: "Serums",
    concernTags: ["Natural", "Eco-friendly"],
    priceBDT: 2500,
    images: ["/images/lbp.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Eco-friendly beauty products with natural ingredients.",
    howToUse: "Use as directed for best results.",
    skinTypes: ["All Skin Types"],
    slug: "love-beauty-planet"
  },
  {
    id: 16,
    name: "mCaffeine Watermelon Lip Balm",
    brand: "mCaffeine",
    category: "Treatments",
    concernTags: ["Lip Care", "Hydrating"],
    priceBDT: 525,
    images: ["/images/lipbulm.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Watermelon lip balm for hydrated, soft lips.",
    howToUse: "Apply to lips as needed throughout the day.",
    skinTypes: ["All Skin Types"],
    slug: "mcaffeine-watermelon-lip-balm"
  },
  {
    id: 17,
    name: "mixsoon Complete Glass Skin Set",
    brand: "Mixsoon",
    category: "Best Sellers",
    concernTags: ["Glass Skin", "Complete Set"],
    priceBDT: 3315,
    images: ["/images/maria-lupan-0U4IyX7Zwhg-unsplash.jpg"],
    isBestSeller: true,
    isNew: false,
    isBundle: true,
    description: "Complete set for achieving glass skin perfection.",
    howToUse: "Use all products in the set as directed for best results.",
    skinTypes: ["All Skin Types"],
    slug: "mixsoon-complete-glass-skin-set"
  },
  {
    id: 18,
    name: "Maria Lupan Beauty 2",
    brand: "Maria Lupan",
    category: "Best Sellers",
    concernTags: ["Beauty", "Premium"],
    priceBDT: 1100,
    images: ["/images/maria-lupan-5O-uEs1yeNk-unsplash.jpg"],
    isBestSeller: true,
    isNew: false,
    isBundle: false,
    description: "Premium beauty product for stunning results.",
    howToUse: "Use as part of your beauty routine.",
    skinTypes: ["All Skin Types"],
    slug: "maria-lupan-beauty-2"
  },
  {
    id: 19,
    name: "Mayraki Scalp Scrub",
    brand: "Mayraki",
    category: "Treatments",
    concernTags: ["Scalp Care", "Exfoliating"],
    priceBDT: 3500,
    images: ["/images/mayraki.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Exfoliating scalp scrub for healthy hair growth.",
    howToUse: "Apply to scalp, massage gently, rinse thoroughly.",
    skinTypes: ["All Scalp Types"],
    slug: "mayraki-scalp-scrub"
  },
  {
    id: 20,
    name: "Micellar Water",
    brand: "Generic",
    category: "Treatments",
    concernTags: ["Cleansing", "Micellar"],
    priceBDT: 775,
    images: ["/images/micelar.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Gentle micellar water for effective cleansing.",
    howToUse: "Apply to cotton pad, wipe gently over face.",
    skinTypes: ["All Skin Types"],
    slug: "micellar-water"
  },
  {
    id: 21,
    name: "Micellar Water Orange",
    brand: "Generic",
    category: "Treatments",
    concernTags: ["Cleansing", "Orange"],
    priceBDT: 700,
    images: ["/images/micelarorng.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Orange-infused micellar water for refreshing cleanse.",
    howToUse: "Apply to cotton pad, wipe gently over face.",
    skinTypes: ["All Skin Types"],
    slug: "micellar-water-orange"
  },
  {
    id: 22,
    name: "The Ordinary Product",
    brand: "The Ordinary",
    category: "Serums",
    concernTags: ["Treatment", "Clinical"],
    priceBDT: 1200,
    images: ["/images/ordinary.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Clinical treatment from The Ordinary line.",
    howToUse: "Apply as directed for best results.",
    skinTypes: ["All Skin Types"],
    slug: "the-ordinary-product"
  },
  {
    id: 23,
    name: "Ordinary B5",
    brand: "The Ordinary",
    category: "Moisturizers",
    concernTags: ["Hydration", "Vitamin B5"],
    priceBDT: 1150,
    images: ["/images/ordinaryb5.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Hydrating B5 serum for plump, moisturized skin.",
    howToUse: "Apply to clean skin, follow with moisturizer.",
    skinTypes: ["All Skin Types"],
    slug: "ordinary-b5"
  },
  {
    id: 24,
    name: "Ordinary Vitamin C",
    brand: "The Ordinary",
    category: "Serums",
    concernTags: ["Brightening", "Vitamin C"],
    priceBDT: 1175,
    images: ["/images/ordvitc.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Vitamin C serum for bright and even skin tone.",
    howToUse: "Apply to clean skin, use in morning routine.",
    skinTypes: ["All Skin Types"],
    slug: "ordinary-vitamin-c"
  },
  {
    id: 25,
    name: "Laneige Sleep Mask",
    brand: "Laneige",
    category: "Treatments",
    concernTags: ["Sleep Mask", "Overnight Treatment"],
    priceBDT: 1750,
    images: ["/images/sleeplip.jpg"],
    isBestSeller: false,
    isNew: false,
    isBundle: false,
    description: "Overnight sleeping mask for rejuvenated skin.",
    howToUse: "Apply as last step of evening routine, rinse in morning.",
    skinTypes: ["All Skin Types"],
    slug: "laneige-sleep-mask"
  },
  {
    id: 26,
    name: "Toa Heftiba Beauty",
    brand: "Toa Heftiba",
    category: "Best Sellers",
    concernTags: ["Beauty", "Artistic"],
    priceBDT: 850,
    images: ["/images/toa-heftiba-yTKpdEWLB74-unsplash.jpg"],
    isBestSeller: true,
    isNew: false,
    isBundle: false,
    description: "Artistic beauty product for unique results.",
    howToUse: "Use as directed for best results.",
    skinTypes: ["All Skin Types"],
    slug: "toa-heftiba-beauty"
  },
  {
    id: 27,
    name: "Valeriia Miller Beauty 1",
    brand: "Valeriia Miller",
    category: "Best Sellers",
    concernTags: ["Beauty", "Premium"],
    priceBDT: 950,
    images: ["/images/valeriia-miller--BQ08InEGLI-unsplash.jpg"],
    isBestSeller: true,
    isNew: false,
    isBundle: false,
    description: "Premium beauty product for elegant results.",
    howToUse: "Use as part of your beauty routine.",
    skinTypes: ["All Skin Types"],
    slug: "valeriia-miller-beauty-1"
  },
  {
    id: 28,
    name: "Multi-Brand Korean Skincare Routine",
    brand: "Various",
    category: "Best Sellers",
    concernTags: ["Korean Beauty", "Complete Routine"],
    priceBDT: 11600,
    images: ["/images/valeriia-miller-_42NKYROG7g-unsplash.jpg"],
    isBestSeller: true,
    isNew: false,
    isBundle: true,
    description: "Complete Korean skincare routine with multiple brands.",
    howToUse: "Follow the complete routine as directed for best results.",
    skinTypes: ["All Skin Types"],
    slug: "multi-brand-korean-skincare-routine"
  },
  {
    id: 29,
    name: "Botanics All Bright Skincare",
    brand: "Botanics",
    category: "Best Sellers",
    concernTags: ["Brightening", "Natural"],
    priceBDT: 4600,
    images: ["/images/saher-suthriwala-uFDG6NsCBjY-unsplash.jpg"],
    isBestSeller: true,
    isNew: false,
    isBundle: false,
    description: "All bright skincare with natural botanical ingredients.",
    howToUse: "Use as part of your daily skincare routine.",
    skinTypes: ["All Skin Types"],
    slug: "botanics-all-bright-skincare"
  },
  {
    id: 30,
    name: "Professional Haircare Collection",
    brand: "Professional",
    category: "Best Sellers",
    concernTags: ["Hair Care", "Professional"],
    priceBDT: 21000,
    images: ["/images/sincerely-media-GOKQtGcdTR0-unsplash.jpg"],
    isBestSeller: true,
    isNew: false,
    isBundle: true,
    description: "Professional haircare collection for salon-quality results.",
    howToUse: "Use products as directed for professional results.",
    skinTypes: ["All Hair Types"],
    slug: "professional-haircare-collection"
  }
];

export function FeaturedProductsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="shop" ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] mb-4">
            Explore Elira Shop
          </h2>
          <p className="text-[#737373] text-base font-body">
            Discover our products made just for you.
          </p>
        </div>

        {/* Layout: Sidebar + Products */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Categories */}
          <div
            className={`lg:w-48 flex-shrink-0 lg:sticky lg:top-24 lg:self-start transition-all duration-300 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex flex-row lg:flex-col gap-0 border-t border-[#E5E5E5]">
              {categories.map((category) => (
                <div key={category} className="border-b border-[#E5E5E5]">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left py-4 px-2 text-sm transition-colors font-body ${
                      activeCategory === category
                        ? "text-[#1A1A1A] font-medium"
                        : "text-[#737373] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  href="#"
                  className={`group transition-all duration-300 text-center ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${100 + index * 50}ms` }}
                >
                  {/* Product Image */}
                  <div className="aspect-[4/5] relative overflow-hidden bg-[#F5F5F5] mb-4">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <h3 className="font-display text-lg text-[#1A1A1A] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[#737373] text-sm font-body">
                    ৳ {product.priceBDT.toLocaleString('en-BD')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
