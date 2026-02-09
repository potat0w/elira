import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { NewArrivalsSection } from "@/components/sections/marquee-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { ProductDetailSection } from "@/components/sections/scrollytelling-section";
import { ProductFeaturesSection } from "@/components/sections/product-features-section";
import { BentoSection } from "@/components/sections/bento-section";
import { LifestyleGallerySection } from "@/components/sections/lifestyle-gallery-section";
import { AboutSection } from "@/components/sections/about-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />

      {/* Section 1: Hero with CTA and image */}
      <HeroSection />

      {/* Section 2: New Arrivals products */}
      <NewArrivalsSection />

      {/* Section 3: Explore Shop with sidebar filters */}
      <FeaturedProductsSection />

      {/* Section 4: Product Detail showcase */}
      <ProductDetailSection />

      {/* Section 5: Product Features - Why Choose Elira */}
      <ProductFeaturesSection />

      {/* Section 7: Bento Grid - Collections */}
      <BentoSection />

      {/* Section 8: Lifestyle Gallery */}
      <LifestyleGallerySection />

      {/* Section 9: About Elira */}
      <AboutSection />

      {/* Section 10: Customer testimonials */}
      <TestimonialsSection />

      {/* Section 11: Newsletter signup */}
      <NewsletterSection />

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
