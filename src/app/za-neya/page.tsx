"use client";

import { PerfumeCard } from "@/components/PerfumeCard";
import { useDatabaseProducts } from "@/hooks/useDatabaseProducts";

export default function ZaNeyaPage() {
  const { products, loading, error } = useDatabaseProducts();
  const feminineProducts = products.filter(product => product.genderProfile === "Feminine");

  if (loading) {
    return (
      <div className="py-8 sm:py-16 bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-pink-600 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base">Loading women's perfumes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 sm:py-16 bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-sm sm:text-base">Error loading products: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-pink-600 mb-2 sm:mb-4">
            ЗА НЕЯ
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-pink-500">
            Луксозни аромати за съвременната жена
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {feminineProducts.map((product) => (
            <PerfumeCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
