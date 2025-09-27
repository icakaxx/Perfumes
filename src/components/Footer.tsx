"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter, Settings } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

// Custom TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export function Footer() {
  const { isAuthenticated: isAdmin } = useAdminAuth();
  
  return (
    <footer className="bg-gray-50 border-t relative">
      {/* Admin Gear Button */}
      <Link 
        href="/admin/login"
        className="absolute top-4 right-4 z-10 p-3 bg-gradient-primary hover:opacity-90 rounded-full transition-smooth shadow-lg"
        title="Админ Панел"
      >
        <Settings className="h-6 w-6 text-white" />
      </Link>
      
      <div className="container py-8">
        {/* Brand */}
        <div className="text-center mb-6">
          <h3 className="font-serif text-xl font-bold mb-2">Luxe Parfum</h3>
        </div>

        {/* Social Media Icons Container */}
        <div className="flex justify-center items-center space-x-6 mb-6">
          <Link 
            href="#" 
            className="text-muted-foreground hover:text-accent transition-colors duration-200"
            title="Instagram"
          >
            <Instagram className="h-6 w-6" />
          </Link>
          <Link 
            href="#" 
            className="text-muted-foreground hover:text-accent transition-colors duration-200"
            title="Facebook"
          >
            <Facebook className="h-6 w-6" />
          </Link>
          <Link 
            href="#" 
            className="text-muted-foreground hover:text-accent transition-colors duration-200"
            title="Twitter"
          >
            <Twitter className="h-6 w-6" />
          </Link>
          <Link 
            href="#" 
            className="text-muted-foreground hover:text-accent transition-colors duration-200"
            title="TikTok"
          >
            <TikTokIcon className="h-6 w-6" />
          </Link>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 Luxe Parfum. Всички права запазени. | Направено с ❤️ в София</p>
        </div>
      </div>
    </footer>
  );
}
