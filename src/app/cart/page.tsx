"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useDatabaseProducts } from "@/hooks/useDatabaseProducts";
import { formatCurrency } from "@/lib/format";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const { products, loading, error } = useDatabaseProducts();

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

  if (loading) {
    return (
      <div className="py-8 sm:py-16">
        <div className="container px-4 sm:px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-sm sm:text-base">Зареждане на количката...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 sm:py-16">
        <div className="container px-4 sm:px-6">
          <div className="text-center text-red-600">
            <p className="text-sm sm:text-base">Грешка при зареждане на продуктите: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-8 sm:py-16">
        <div className="container px-4 sm:px-6">
          <div className="text-center">
            <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-600 mb-2">Количката е празна</h1>
            <p className="text-sm sm:text-base text-gray-500 mb-6">Добавете продукти, за да продължите с поръчката</p>
            <Link href="/shop">
              <Button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 text-sm sm:text-base">
                Пазарувай Сега
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-8 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-3xl font-bold">Количка</h1>
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto text-sm sm:text-base"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Изчисти количката
          </Button>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Cart Items */}
          <div className="space-y-3 sm:space-y-4">
            {items.map((item) => {
              const details = getProductDetails(item.productId, item.variantId);
              if (!details) return null;
              
              const { product, variant } = details;
              
              return (
                <Card key={`${item.productId}-${item.variantId}`} className="overflow-hidden">
                  <CardContent className="p-3 sm:p-6">
                    {/* Mobile Layout */}
                    <div className="block sm:hidden">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <Image
                            src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : product.imageUrl}
                            alt={product.name}
                            width={56}
                            height={56}
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <span className="text-lg hidden">🧴</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                          <p className="text-xs text-gray-600">{product.brand}</p>
                          <p className="text-xs text-gray-500">{variant.volumeMl}ml</p>
                          <Badge variant="secondary" className="mt-1 text-xs px-1 py-0.5">
                            {product.genderProfile === "Feminine" ? "Женски" : 
                             product.genderProfile === "Masculine" ? "Мъжки" : "Унисекс"}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-7 w-7 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-7 w-7 p-0"
                          >
                            <span className="text-xs font-bold">-</span>
                          </Button>
                          <span className="text-sm font-medium min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                            className="h-7 w-7 p-0"
                          >
                            <span className="text-xs font-bold">+</span>
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            {formatCurrency(variant.price * item.quantity)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatCurrency(variant.price)} бр.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <Image
                          src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : product.imageUrl}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <span className="text-2xl hidden">🧴</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                        <p className="text-sm text-gray-500">{variant.volumeMl}ml</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {product.genderProfile === "Feminine" ? "Женски" : 
                           product.genderProfile === "Masculine" ? "Мъжки" : "Унисекс"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8"
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
                            className="h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-center min-w-[100px]">
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
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="w-full sm:max-w-md sm:mx-auto">
            <Card className="sticky bottom-4 sm:static sm:bottom-auto">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">Обобщение на поръчката</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Продукти ({items.reduce((total, item) => total + item.quantity, 0)} бр.)</span>
                  <span className="font-medium">{formatCurrency(totalPrice)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-base sm:text-lg font-bold">
                  <span>Общо</span>
                  <span>{formatCurrency(totalPrice)} + 8-10лв доставка с ЕКОНТ</span>
                </div>
                
                <div className="space-y-2 sm:space-y-3 pt-2">
                  <Link href="/order" className="block">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-white text-sm sm:text-base py-3 sm:py-2">
                      Продължи към поръчка
                    </Button>
                  </Link>
                  
                  <Link href="/shop" className="block">
                    <Button variant="outline" className="w-full text-sm sm:text-base py-3 sm:py-2">
                      Продължи пазаруването
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
