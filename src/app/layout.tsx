import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/CartContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: "Luxury Perfume Shop - Discover Your Signature Scent",
  description: "Premium fragrances from the world's finest perfume houses. Find your perfect scent with our curated collection.",
  keywords: "perfume, fragrance, luxury, EDT, EDP, parfum, scent",
  openGraph: {
    title: "Luxury Perfume Shop",
    description: "Discover your signature scent",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-white`}>
      <body className="font-sans antialiased bg-white">
        <AdminAuthProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col bg-white">
              <NavBar />
              <main className="flex-1 bg-white">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </CartProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
