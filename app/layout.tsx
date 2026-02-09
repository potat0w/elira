import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/contexts/cart-context'
import { CartDrawer } from '@/components/cart-drawer'
import { Toaster } from "@/components/ui/toaster";
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  style: ['normal', 'italic']
});

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['300', '400', '500'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'Elora — Modern Living Store',
  description: 'Discover handpicked products made just for you. A curated space for calm, design, and everyday elegance.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} font-body antialiased bg-white text-[#1E1E1E] overflow-x-hidden`}>
        <CartProvider>
          {children}
          <CartDrawer />
          <Toaster />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  )
}
