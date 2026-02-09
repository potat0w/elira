"use client";

import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { formatBDTSimple } from "@/lib/currency";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const { state, removeItem, updateQuantity, toggleCart, setCartOpen } = useCart();

  const handleCheckout = () => {
    // Implement checkout logic here
    alert('Checkout functionality would be implemented here');
  };

  return (
    <>
      {/* Backdrop */}
      {state.isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setCartOpen(false)}
        />
      )}
      
      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        state.isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            {state.items.length > 0 && (
              <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded-full">
                {state.items.reduce((count, item) => count + item.quantity, 0)}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCartOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button onClick={() => setCartOpen(false)} variant="outline">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  {/* Product Image */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50">
                    <Image
                      src={item.product.images[0] || '/images/placeholder.jpg'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/product/${item.product.slug}`}
                      className="block text-sm font-medium text-gray-900 hover:text-gray-600 truncate"
                      onClick={() => setCartOpen(false)}
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-gray-500">{item.product.brand}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {formatBDTSimple(item.product.priceBDT)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-6 h-6 p-0"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-6 h-6 p-0"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-red-500 hover:text-red-700 p-0 h-auto"
                      onClick={() => removeItem(item.product.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Subtotal</span>
              <span className="font-semibold text-lg">{formatBDTSimple(state.total)}</span>
            </div>
            <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout</p>
            <Button 
              onClick={handleCheckout}
              className="w-full bg-gray-900 text-white hover:bg-gray-800"
            >
              Proceed to Checkout
            </Button>
            <Button 
              variant="outline"
              onClick={() => setCartOpen(false)}
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
