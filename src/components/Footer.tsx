"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Settings } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

export function Footer() {
  const { isAuthenticated: isAdmin } = useAdminAuth();
  
  return (
    <footer className="bg-white border-t relative">
      {/* Admin Gear Button */}
      <Link 
        href="/admin/login"
        className="absolute top-4 right-4 z-10 p-3 bg-accent hover:bg-accent/90 rounded-full transition-colors shadow-lg"
        title="Админ Панел"
      >
        <Settings className="h-6 w-6 text-white" />
      </Link>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">Luxe Parfum</h3>
            <p className="text-sm text-muted-foreground">
              Discover your signature scent from our curated collection of luxury fragrances.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-accent">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-accent">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?sortBy=newest" className="text-muted-foreground hover:text-accent">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop?concentrations=PARFUM" className="text-muted-foreground hover:text-accent">
                  Parfum Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?inStock=true" className="text-muted-foreground hover:text-accent">
                  In Stock Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-accent">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-accent">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-accent">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-accent">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+359 88 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@luxeparfum.bg</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  123 Vitosha Blvd<br />
                  Sofia 1000, Bulgaria
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 Luxe Parfum. All rights reserved. | Made with ❤️ in Sofia</p>
        </div>
      </div>
    </footer>
  );
}
