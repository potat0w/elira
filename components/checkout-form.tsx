"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { formatBDTSimple } from "@/lib/currency";
import { X, ShoppingCart, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CheckoutFormData {
  "Order ID": string;
  "Customer Name": string;
  "Phone": string;
  "Address": string;
  "Product Name": string;
  "Quantity": number;
  "Price": string;
  "Payment Method": string;
  "Order Date": string;
  "Delivery Charge": number;
  "Delivery Location": string;
}

export function CheckoutForm({ onClose }: { onClose: () => void }) {
  const { state, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    countryCode: "+880", // Fixed country code for Bangladesh
    phoneNumberDigits: "", // Remaining digits
    address: "",
    deliveryLocation: "Inside Dhaka", // Default delivery location
    paymentMethod: "Cash on Delivery"
  });

  const [deliveryCharge, setDeliveryCharge] = useState(60); // Default delivery charge for Inside Dhaka
  
  // Validation errors state
  const [errors, setErrors] = useState({
    customerName: "",
    phoneNumberDigits: "",
    address: ""
  });

  // Google Apps Script Web App URL - Your actual deployed URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxBcrcju_ewqRpHhMy24mDid-EsxBa6SddlvIYLRPL73sTod27InmW2uyoAZXcOPrY78g/exec";
  
  // Google Sheet ID for reference
  const SPREADSHEET_ID = "1-zgj6HgWWfQTEKdUOXqXB9mvsFDVtb77vgzM0mQmqoI";

  const generateOrderId = () => {
    return `ORD${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  };

  // Effect to update delivery charge based on location
  useEffect(() => {
    if (formData.deliveryLocation === "Inside Dhaka") {
      setDeliveryCharge(60);
    } else {
      setDeliveryCharge(150);
    }
  }, [formData.deliveryLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Clear previous errors
    setErrors({ customerName: "", phoneNumberDigits: "", address: "" });

    // Validate required fields
    const newErrors = {
      customerName: "",
      phoneNumberDigits: "",
      address: ""
    };

    let hasError = false;

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Please enter your full name";
      hasError = true;
    }

    if (!formData.phoneNumberDigits.trim()) {
      newErrors.phoneNumberDigits = "Please enter your phone number";
      hasError = true;
    } else if (formData.phoneNumberDigits.length !== 10) {
      newErrors.phoneNumberDigits = "Please enter a valid 10-digit phone number";
      hasError = true;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter your delivery address";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const orderId = generateOrderId();
      const orderDate = new Date().toISOString().split('T')[0];
      const totalWithDelivery = state.total + deliveryCharge;

      // Prepare data for each cart item
      const orders = state.items.map(item => ({
        "Order ID": orderId,
        "Customer Name": formData.customerName,
        "Phone": `+880${formData.phoneNumberDigits}`,
        "Address": formData.address,
        "Product Name": `${item.product.name} (${item.product.brand})`,
        "Quantity": item.quantity,
        "Price": formatBDTSimple(item.product.priceBDT),
        "Payment Method": formData.paymentMethod,
        "Order Date": orderDate,
        "Delivery Charge": deliveryCharge,
        "Delivery Location": formData.deliveryLocation
      }));

      // Log order data for testing
      console.log('Order Data:', orders);
      
      // For testing - show success without Google Sheets
      toast({
        title: "Order Placed Successfully!",
        description: `Order ID: ${orderId}\nTotal: ${formatBDTSimple(totalWithDelivery)}\nDelivery Charge: ৳${deliveryCharge}`,
      });

      // Send to Google Sheets
      for (const orderData of orders) {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(orderData as any).toString()
        });

        if (!response.ok) {
          throw new Error('Failed to submit order');
        }
      }

      // Clear cart and close form on success
      clearCart();
      setTimeout(() => onClose(), 2000); // Delay to allow user to see toast
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Order Failed",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (field in errors) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phoneNumberDigits: value }));
    // Clear phone error when user starts typing
    setErrors(prev => ({ ...prev, phoneNumberDigits: "" }));
  };

  if (state.items.length === 0) {
    return (
      <div className="p-6 text-center">
        <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <Button onClick={onClose} variant="outline">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 font-display">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Order</h2>
          <p className="text-gray-600">Fill in your details to complete your purchase</p>
        </div>

<div className="grid lg:grid-cols-2 gap-10">

  {/* Customer Information Form */}
  <div className="bg-white p-10 border border-gray-200 shadow-sm">

    <h3 className="text-2xl font-semibold text-gray-900 mb-8">
      Customer Information
    </h3>

    <form onSubmit={handleSubmit} id="checkout-form" className="space-y-7">

      <div className="grid md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <Label htmlFor="customer-name" className="text-gray-700 font-medium">
            Full Name *
          </Label>

          <Input
            id="customer-name"
            type="text"
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            placeholder="Enter your full name"
            className={`h-12 rounded-xs focus:ring-2 transition ${
              errors.customerName 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-green-500'
            }`}
          />
          {errors.customerName && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="text-red-500">•</span>
              {errors.customerName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="delivery-location" className="text-gray-700 font-medium">
            Delivery Location *
          </Label>

          <select
            id="delivery-location"
            value={formData.deliveryLocation}
            onChange={(e) => handleInputChange('deliveryLocation', e.target.value)}
            className="h-12 w-full border border-gray-300 rounded-xs px-3 focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="Inside Dhaka">Inside Dhaka</option>
            <option value="Outside Dhaka">Outside Dhaka</option>
          </select>
        </div>

      </div>

      <div className="flex flex-col lg:flex-row lg:gap-4 gap-2">
        <div className="lg:w-32 space-y-2">
          <Label htmlFor="country-code" className="text-gray-700 font-medium text-sm">
            Code *
          </Label>

          <select
            id="country-code"
            value={formData.countryCode}
            onChange={(e) => handleInputChange('countryCode', e.target.value)}
            className="h-12 w-full border border-gray-300 rounded-xs px-2 focus:ring-2 focus:ring-green-500 transition text-sm"
          >
            <option value="+880">+880</option>
          </select>
        </div>

        <div className="flex-1 space-y-2">
          <Label htmlFor="phone-digits" className="text-gray-700 font-medium">
            Phone Number *
          </Label>

          <Input
            id="phone-digits"
            type="tel"
            value={formData.phoneNumberDigits}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="XXXXXXXXXX"
            maxLength={10}
            className={`h-12 rounded-xs focus:ring-2 transition ${
              errors.phoneNumberDigits 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-green-500'
            }`}
          />

          {errors.phoneNumberDigits ? (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="text-red-500">•</span>
              {errors.phoneNumberDigits}
            </p>
          ) : (
            <p className="text-xs text-gray-400">
              Enter 10 digits only
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-gray-700 font-medium">
          Delivery Address *
        </Label>

        <textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="House, Road, Area, District"
          rows={3}
          className={`w-full rounded-xs px-4 py-3 focus:ring-2 transition resize-none ${
            errors.address 
              ? 'border border-red-500 focus:ring-red-500' 
              : 'border border-gray-300 focus:ring-green-500'
          }`}
        />
        {errors.address && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span className="text-red-500">•</span>
            {errors.address}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="payment" className="text-gray-700 font-medium">
          Payment Method *
        </Label>

        <select
          id="payment"
          value={formData.paymentMethod}
          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
          className="h-12 w-full border border-gray-300 rounded-xs px-3 focus:ring-2 focus:ring-green-500 transition"
        >
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Bkash">Bkash</option>
          <option value="Nagad">Nagad</option>
          <option value="Rocket">Rocket</option>
          <option value="Upay">Upay</option>
        </select>
      </div>

    </form>
  </div>

  {/* Order Summary */}
  <div className="bg-white p-10 border border-gray-200 shadow-sm">

    <h3 className="text-2xl font-semibold text-gray-900 mb-8">
      Order Summary
    </h3>

    <div className="space-y-5">

      {state.items.map((item) => (
        <div
          key={item.product.id}
          className="flex justify-between items-center pb-4 border-b border-gray-100"
        >
          <div>
            <p className="font-semibold text-gray-900">
              {item.product.name}
            </p>

            <p className="text-sm text-gray-500">
              {item.product.brand}
            </p>

            <p className="text-sm text-gray-400">
              Quantity: {item.quantity}
            </p>
          </div>

          <p className="font-semibold text-gray-900 text-lg">
            {formatBDTSimple(item.product.priceBDT * item.quantity)}
          </p>
        </div>
      ))}

      <div className="pt-6 space-y-4">

        <div className="flex justify-between text-gray-700">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold text-lg">
            {formatBDTSimple(state.total)}
          </span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span className="font-medium">Delivery Charge</span>
          <span className="font-semibold text-orange-500 text-lg">
            ৳{deliveryCharge}
          </span>
        </div>

        <div className="border-t pt-4 flex justify-between">
          <span className="text-xl font-bold text-gray-900">
            Total Amount
          </span>

          <span className="text-2xl font-bold text-green-600">
            {formatBDTSimple(state.total + deliveryCharge)}
          </span>
        </div>

      </div>
    </div>
  </div>
</div>


        {/* Submit Button */}
        <div className="mt-8 text-center">
          <Button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="px-12 py-4 bg-green-600 text-white hover:bg-green-700 text-lg font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018 8 018-8 8 018 0z"></path>
                </svg>
                Processing Order...
              </span>
            ) : (
              "Place Order Now"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
