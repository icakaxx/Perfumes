"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";
import { useDatabaseProducts } from "@/hooks/useDatabaseProducts";
import { formatCurrency } from "@/lib/format";
import { ArrowLeft, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { municipalities } from "@/data/municipalities";
import { cities } from "@/data/cities";
import { setSecureStorage } from "@/lib/secure-storage";
import { getCSRFHeaders } from "@/lib/csrf-client";

export default function OrderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { items, clearCart } = useCart();
  const { products, loading, error } = useDatabaseProducts();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    municipality: "",
    municipalityId: "",
    city: "",
    cityId: "",
    phone: "",
  });
  const [showMunicipalitySuggestions, setShowMunicipalitySuggestions] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      const variant = product?.variants.find(v => v.id === item.variantId);
      if (variant) {
        return total + (variant.price * item.quantity);
      }
      return total;
    }, 0);
  };


  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.municipality-input') && !target.closest('.city-input')) {
        setShowMunicipalitySuggestions(false);
        setShowCitySuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">Зареждане...</p>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        address: formData.address,
        phone: formData.phone,
        municipality: formData.municipality,
        city: formData.city,
        country: "Bulgaria", // Always Bulgaria for dropshipping
        items: items.map(item => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: products.find(p => p.id === item.productId)?.variants.find(v => v.id === item.variantId)?.price || 0,
          productName: products.find(p => p.id === item.productId)?.name || '',
          brand: products.find(p => p.id === item.productId)?.brand || '',
          volumeMl: products.find(p => p.id === item.productId)?.variants.find(v => v.id === item.variantId)?.volumeMl || 0,
          genderProfile: products.find(p => p.id === item.productId)?.genderProfile || ''
        })),
        totalPrice,
        status: "pending", // New order - pending confirmation
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getCSRFHeaders(),
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to process order");
      }

      // Store order data for success page
      setSecureStorage("lastOrder", {
        ...orderData,
        orderId: result.orderId,
      });

      // Clear cart after successful order
      clearCart();

      // Show success notification
      toast({
        title: "Поръчката е успешна! 🎉",
        description: "Вашата поръчка е приета и ще бъде обработена скоро. Ще получите потвърждение по имейл.",
        variant: "default",
      });

      // Small delay to show the notification before redirect
      setTimeout(() => {
        router.push("/success");
      }, 1500);
    } catch (error) {
      toast({
        title: "Поръчката неуспешна",
        description: error instanceof Error ? error.message : "Нещо се обърка. Моля, опитайте отново.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container py-8 max-w-4xl">
      {loading && (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Зареждане на формата за поръчка...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-16 text-red-600">
          <p>Грешка при зареждане на продуктите: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Header */}
          <div className="mb-8">
            <Link href="/cart" className="inline-flex items-center text-muted-foreground hover:text-accent mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад към количката
            </Link>
            <h1 className="font-serif text-3xl font-bold">Завърши поръчката</h1>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Информация за доставка
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    Име *
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Първо име"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="middleName" className="block text-sm font-medium mb-1">
                    Презиме
                  </label>
                  <Input
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    placeholder="Презиме"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Фамилия *
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Фамилия"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                  Адрес *
                </label>
                <input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Въведете адрес..."
                  required
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                />
              </div>

              <div>
                <label htmlFor="municipality" className="block text-sm font-medium mb-1">
                  Община *
                </label>
                <div className="relative municipality-input">
                  <input
                    id="municipality"
                    type="text"
                    value={formData.municipality}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({
                        ...formData,
                        municipality: value,
                        municipalityId: ''
                      });
                      setShowMunicipalitySuggestions(value.length > 0);
                    }}
                    onFocus={() => setShowMunicipalitySuggestions(formData.municipality.length > 0)}
                    placeholder="Започнете да пишете община..."
                    required
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  />
                  {showMunicipalitySuggestions && formData.municipality && municipalities.some((m) => 
                    m.name.toLowerCase().includes(formData.municipality.toLowerCase())
                  ) && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {municipalities
                        .filter((m) => 
                          m.name.toLowerCase().includes(formData.municipality.toLowerCase())
                        )
                        .slice(0, 10)
                        .map((municipality) => (
                          <div
                            key={municipality.id}
                            className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                municipality: municipality.name,
                                municipalityId: municipality.id.toString()
                              });
                              setShowMunicipalitySuggestions(false);
                            }}
                          >
                            {municipality.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">
                  Град *
                </label>
                <div className="relative city-input">
                  <input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({
                        ...formData,
                        city: value,
                        cityId: ''
                      });
                      setShowCitySuggestions(value.length > 0);
                    }}
                    onFocus={() => setShowCitySuggestions(formData.city.length > 0)}
                    placeholder="Започнете да пишете град..."
                    required
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  />
                  {showCitySuggestions && formData.city && cities.some((c) => 
                    c.name.toLowerCase().includes(formData.city.toLowerCase())
                  ) && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {cities
                        .filter((c) => 
                          c.name.toLowerCase().includes(formData.city.toLowerCase())
                        )
                        .slice(0, 10)
                        .map((city) => (
                          <div
                            key={city.id}
                            className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                city: city.name,
                                cityId: city.id.toString()
                              });
                              setShowCitySuggestions(false);
                            }}
                          >
                            {city.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Телефонен номер *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+359 88 123 4567"
                  required
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong> Ще се свържем с вас за потвърждение преди обработка на поръчката. </strong>
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-sm sm:text-base py-4 sm:py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Обработва се..." : "Изпрати поръчката"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Обобщение на поръчката
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Cart Items */}
              {items.map((item) => {
                const product = products.find(p => p.id === item.productId);
                const variant = product?.variants.find(v => v.id === item.variantId);
                if (!product || !variant) return null;

                return (
                  <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      <p className="text-sm text-muted-foreground">
                        {variant.volumeMl}ml • {product.genderProfile === "Feminine" ? "Женски" : "Мъжки"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(variant.price * item.quantity)}</p>
                      <p className="text-sm text-muted-foreground">Кол: {item.quantity}</p>
                    </div>
                  </div>
                );
              })}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span>Продукти ({items.reduce((total, item) => total + item.quantity, 0)} бр.)</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Доставка</span>
                  <span className="text-green-600">8-10лв доставка с ЕКОНТ</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg"> Общо: 8-10лв доставка с ЕКОНТ + </span>
                    <span className="font-bold text-lg text-accent">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-green-800">Информация за доставка</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Ще се свържем с вас за потвърждение</li>
                  <li>• Очаквана доставка: 1-2 работни дни</li>
                  <li>• Доставка в цяла България</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
        </>
      )}
    </div>
  );
}
