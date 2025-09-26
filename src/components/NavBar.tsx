"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

export function NavBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { isAuthenticated: isAdmin } = useAdminAuth();

  const navItems = [
    { href: "/za-neya", label: "ЗА НЕЯ" },
    { href: "/za-nego", label: "ЗА НЕГО" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-white backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6 text-accent" />
          <span className="font-serif text-xl font-bold">Luxe Parfum</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isZaNeya = item.label === "ЗА НЕЯ";
            const isZaNego = item.label === "ЗА НЕГО";
            
            let colorClass = "text-muted-foreground";
            if (isActive) {
              colorClass = isZaNeya ? "text-pink-600" : isZaNego ? "text-blue-600" : "text-accent";
            } else {
              colorClass = isZaNeya ? "text-pink-500 hover:text-pink-600" : isZaNego ? "text-blue-500 hover:text-blue-600" : "text-muted-foreground hover:text-accent";
            }
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xl font-bold transition-colors ${colorClass}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart Button */}
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-accent text-white text-xs flex items-center justify-center">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Link href="/shop">
            <Button className="bg-accent hover:bg-accent/90 text-white">
              Пазарувай Сега
            </Button>
          </Link>
          
          {/* Admin Link */}
          {isAdmin && (
            <Link href="/admin">
              <Button variant="outline" size="sm">
                Админ
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const isZaNeya = item.label === "ЗА НЕЯ";
                const isZaNego = item.label === "ЗА НЕГО";
                
                let colorClass = "text-foreground";
                if (isActive) {
                  colorClass = isZaNeya ? "text-pink-600" : isZaNego ? "text-blue-600" : "text-accent";
                } else {
                  colorClass = isZaNeya ? "text-pink-500 hover:text-pink-600" : isZaNego ? "text-blue-500 hover:text-blue-600" : "text-foreground hover:text-accent";
                }
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-2xl font-bold transition-colors ${colorClass}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              {/* Mobile Cart Button */}
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full mt-4 relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Количка
                  {getTotalItems() > 0 && (
                    <Badge className="ml-2 h-5 w-5 rounded-full bg-accent text-white text-xs flex items-center justify-center">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </Link>
              
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-accent hover:bg-accent/90 text-white mt-2">
                  Пазарувай Сега
                </Button>
              </Link>
              
              {/* Mobile Admin Link */}
              {isAdmin && (
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full mt-2">
                    Админ Панел
                  </Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
