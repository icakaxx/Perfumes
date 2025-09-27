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
      <section className="lg:py-20 px-4 sm:px-6" style={{ background: 'rgb(255 232 224)' }}>
        <div className="container text-center">
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


      {/* Featured Products */}
      <section className="">
        <div className="px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Препоръчани Аромати
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
              Нашите най-обичани аромати, избрани от познавачи
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4" style={{ marginLeft: '20%', marginRight: '20%' }}>
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

    </div>
  );
}
