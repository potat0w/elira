"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleCart, getItemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "#features", label: "Why Choose Elira" },
    { href: "#lifestyle", label: "Moments of Calm" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <nav 
        className={`max-w-5xl mx-auto mt-6 px-4 pointer-events-auto transition-all duration-500 ${
          mobileMenuOpen ? "" : "rounded-full"
        } ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5" 
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-14 px-2">
          {/* Logo */}
          <Link
            href="#"
            className={`font-display text-2xl tracking-tight transition-colors duration-500 ${
              isScrolled ? "text-[#1A1A1A]" : "text-white"
            }`}
          >
            Elira
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xs transition-colors duration-500 ${
                  isScrolled 
                    ? "text-[#1A1A1A] hover:text-[#737373]" 
                    : "text-white hover:text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCart}
              className={`relative p-2 rounded-full transition-colors duration-500 ${
                isScrolled 
                  ? "hover:bg-[#F5F5F5] text-[#1A1A1A]" 
                  : "hover:bg-white/10 text-white"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {getItemCount() > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 p-0 flex items-center justify-center">
                  {getItemCount()}
                </Badge>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCart}
              className={`relative p-2 rounded-full transition-colors duration-500 ${
                isScrolled 
                  ? "hover:bg-[#F5F5F5] text-[#1A1A1A]" 
                  : "hover:bg-white/10 text-white"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {getItemCount() > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 p-0 flex items-center justify-center">
                  {getItemCount()}
                </Badge>
              )}
            </Button>
            
            <button
              type="button"
              className={`p-2 rounded-full transition-colors duration-500 ${
                isScrolled 
                  ? "hover:bg-[#F5F5F5] text-[#1A1A1A]" 
                  : "hover:bg-white/10 text-white"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-8 border-t border-[#E5E5E5]/50 bg-white">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-display text-3xl text-[#1A1A1A] hover:text-[#737373] transition-colors px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
