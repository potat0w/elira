"use client";

import { CheckoutForm } from "@/components/checkout-form";
import { useCart } from "@/contexts/cart-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navigation } from "@/components/navigation";

export default function CheckoutPage() {
  const { state } = useCart();
  const router = useRouter();

  // Redirect to shop if cart is empty
  useEffect(() => {
    if (state.items.length === 0) {
      router.push('/shop');
    }
  }, [state.items.length, router]);

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Redirecting to shop...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto py-8">
        <CheckoutForm onClose={() => router.push('/shop')} />
      </div>
    </div>
  );
}
