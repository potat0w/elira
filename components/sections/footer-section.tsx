"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Explore Our Shop", href: "#shop" },
      { name: "Why Choose Elora", href: "#features" },
      { name: "Moments of Calm", href: "#lifestyle" },
      { name: "Testimonials", href: "#testimonials" }
    ],
  },
];

export function FooterSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <footer ref={ref} className="bg-white border-t border-[#E5E5E5]">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div
            className={`lg:col-span-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link href="/" className="font-display text-3xl text-[#1A1A1A] block mb-6">
              Elora
            </Link>
            <p className="text-[#737373] leading-relaxed mb-6 font-body">
              Clean beauty for conscious living. Natural skincare crafted with care for your skin and the planet.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {["Instagram", "Pinterest", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm text-[#737373] hover:text-[#1A1A1A] transition-colors font-body"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-8">
              {footerLinks.map((column, columnIndex) => (
                <div
                  key={column.title}
                  className={`transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${100 + columnIndex * 100}ms` }}
                >
                  <h3 className="text-sm text-[#1A1A1A] font-medium mb-4">
                    {column.title}
                  </h3>
                  <ul className="flex flex-wrap items-center gap-6">
                    {column.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#737373] hover:text-[#1A1A1A] transition-colors font-body"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E5E5E5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#737373] font-body">
            Developed by Sabr Axis IT.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-xs text-[#737373] hover:text-[#1A1A1A] transition-colors font-body"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
