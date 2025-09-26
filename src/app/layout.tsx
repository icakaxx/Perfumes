import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/CartContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
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
  title: "Luxe Parfum - Открийте Вашия Подпис",
  description: "Луксозни аромати от най-престижните парфюмерийни къщи по света. Намерете своя идеален аромат с нашата подбрана колекция.",
  keywords: "парфюм, аромат, лукс, EDT, EDP, парфюм, мирис, българия",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "Luxe Parfum",
    description: "Открийте вашия подпис",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <AdminAuthProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col">
                <NavBar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </CartProvider>
          </AdminAuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
