"use client";

import { PerfumeCard } from "@/components/PerfumeCard";
import { useDatabaseProducts } from "@/hooks/useDatabaseProducts";

export default function PodaruchniKomplektiPage() {
  const { products, loading, error } = useDatabaseProducts();
  
  // Filter for gift sets (products with Unisex gender profile from gift_sets table)
  const giftSetProducts = products.filter(product => product.genderProfile === "Unisex");

  if (loading) {
    return (
      <div className="py-8 sm:py-16 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-purple-600 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base">Loading gift sets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 sm:py-16 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-sm sm:text-base">Error loading gift sets: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Подаръчни Комплекти
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Изберете идеалния подарък за вашите близки с нашите луксозни ароматни комплекти
          </p>
        </div>

        {/* Products Grid */}
        {giftSetProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {giftSetProducts.map((product) => (
              <PerfumeCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-base sm:text-lg text-muted-foreground mb-4 text-center px-4">
              В момента няма налични подаръчни комплекти
            </p>
            <p className="text-sm text-muted-foreground text-center px-4">
              Скоро ще добавим нови луксозни ароматни комплекти за вас
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
