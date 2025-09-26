"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PerfumeCard } from "@/components/PerfumeCard";
import { useDatabaseProducts } from "@/hooks/useDatabaseProducts";
import { ArrowRight, Sparkles, Star, Shield } from "lucide-react";

export default function HomePage() {
  const { products, loading, error } = useDatabaseProducts();
  const featuredProducts = products.slice(0, 16);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-accent mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-sm sm:text-base">Error loading products: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-hero">
        <div className="container px-4 sm:px-6 text-center">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-900">
            Открийте Вашия Подпис
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Луксозни аромати от най-престижните парфюмерийни къщи по света
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg transition-smooth">
              Пазарувайте Сега
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-12 sm:py-16 bg-gradient-section">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center p-4 sm:p-6 rounded-2xl bg-gradient-card transition-smooth hover:shadow-lg">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2">Автентичен Лукс</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                100% автентични аромати от престижни парфюмерийни къщи по света
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-2xl bg-gradient-card transition-smooth hover:shadow-lg">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2">Експертна Подборка</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Ръчно подбрана селекция от експерти по аромати и парфюмери
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-2xl bg-gradient-card transition-smooth hover:shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2">Сигурна Доставка</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Бърза, застрахована доставка с елегантна подаръчна опаковка
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 bg-gradient-section">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Препоръчани Аромати
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
              Нашите най-обичани аромати, избрани от познавачи
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <PerfumeCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link href="/shop">
              <Button size="lg" variant="outline" className="text-sm sm:text-base">
                Вижте Всички Продукти
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gradient-hero">
        <div className="container">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-primary bg-clip-text text-transparent">
            Пазарувайте по Стил
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/shop?genderProfiles=Feminine" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1588514727390-91fd5ebaef81?w=600"
                  alt="Женски Аромати"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-2xl font-serif font-bold">Женски</h3>
                  <p className="text-white/80">Елегантни & изискани</p>
                </div>
              </div>
            </Link>

            <Link href="/shop?genderProfiles=Masculine" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1587556930799-b8837c15d01f?w=600"
                  alt="Мъжки Аромати"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-2xl font-serif font-bold">Мъжки</h3>
                  <p className="text-white/80">Смели & уверени</p>
                </div>
              </div>
            </Link>

            <Link href="/shop?genderProfiles=Unisex" className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600"
                  alt="Унисекс Аромати"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-2xl font-serif font-bold">Унисекс</h3>
                  <p className="text-white/80">Универсални & модерни</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
