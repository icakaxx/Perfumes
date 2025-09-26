"use client";

import { PerfumeCard } from "@/components/PerfumeCard";
import { useDatabaseProducts } from "@/hooks/useDatabaseProducts";

export default function ZaNegoPage() {
  const { products, loading, error } = useDatabaseProducts();
  const masculineProducts = products.filter(product => product.genderProfile === "Masculine");

  if (loading) {
    return (
      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading men's perfumes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading products: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            ЗА НЕГО
          </h1>
          <p className="text-lg text-blue-500">
            Силни аромати за уверения мъж
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
