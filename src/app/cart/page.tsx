"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { formatCurrency } from "@/lib/format";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const products = useProducts();

  const getProductDetails = (productId: string, variantId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return null;
    
    const variant = product.variants.find(v => v.id === variantId);
    if (!variant) return null;
    
    return { product, variant };
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const details = getProductDetails(item.productId, item.variantId);
      if (details) {
        return total + (details.variant.price * item.quantity);
      }
      return total;
    }, 0);
  };

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="py-16">
        <div className="container">
          <div className="text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-600 mb-2">Количката е празна</h1>
            <p className="text-gray-500 mb-6">Добавете продукти, за да продължите с поръчката</p>
            <Link href="/shop">
              <Button className="bg-accent hover:bg-accent/90 text-white">
                Пазарувай Сега
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Количка</h1>
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Изчисти количката
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const details = getProductDetails(item.productId, item.variantId);
              if (!details) return null;
              
              const { product, variant } = details;
              
              return (
                <Card key={`${item.productId}-${item.variantId}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🧴</span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                        <p className="text-sm text-gray-500">{variant.volumeMl}ml</p>
                        <Badge variant="secondary" className="mt-1">
                          {product.genderProfile === "Feminine" ? "Женски" : 
                           product.genderProfile === "Masculine" ? "Мъжки" : "Унисекс"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          {formatCurrency(variant.price * item.quantity)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatCurrency(variant.price)} бр.
                        </p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Обобщение на поръчката</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Продукти ({items.reduce((total, item) => total + item.quantity, 0)} бр.)</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span className="text-green-600">Безплатна</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Общо</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                
                <Link href="/order" className="block">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                    Продължи към поръчка
                  </Button>
                </Link>
                
                <Link href="/shop" className="block">
                  <Button variant="outline" className="w-full">
                    Продължи пазаруването
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
