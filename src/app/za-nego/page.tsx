"use client";

import { PerfumeCard } from "@/components/PerfumeCard";
import { useDatabaseProducts } from "@/hooks/useDatabaseProducts";

export default function ZaNegoPage() {
  const { products, loading, error } = useDatabaseProducts();
  const masculineProducts = products.filter(product => product.genderProfile === "Masculine");

  if (loading) {
    return (
      <div className="py-8 sm:py-16 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base">Loading men's perfumes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 sm:py-16 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-sm sm:text-base">Error loading products: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 sm:mb-4">
            ЗА НЕГО
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-blue-500">
            Силни аромати за уверения мъж
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {masculineProducts.map((product) => (
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
