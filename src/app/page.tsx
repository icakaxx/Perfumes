"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PerfumeCard } from "@/components/PerfumeCard";
import { useProducts } from "@/hooks/useProducts";
import { ArrowRight, Sparkles, Star, Shield } from "lucide-react";

export default function HomePage() {
  const products = useProducts();
  const featuredProducts = products.slice(0, 16);

  return (
    <div className="min-h-screen">

      {/* Value Props */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Автентичен Лукс</h3>
              <p className="text-muted-foreground">
                100% автентични аромати от престижни парфюмерийни къщи по света
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Експертна Подборка</h3>
              <p className="text-muted-foreground">
                Ръчно подбрана селекция от експерти по аромати и парфюмери
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Сигурна Доставка</h3>
              <p className="text-muted-foreground">
                Бърза, застрахована доставка с елегантна подаръчна опаковка
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Препоръчани Аромати
            </h2>
            <p className="text-lg text-muted-foreground">
              Нашите най-обичани аромати, избрани от познавачи
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <PerfumeCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" variant="outline">
                Вижте Всички Продукти
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
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
