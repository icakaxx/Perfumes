"use client";

import { PerfumeCard } from "@/components/PerfumeCard";
import { useProducts } from "@/hooks/useProducts";

export default function ZaNeyaPage() {
  const products = useProducts();
  const feminineProducts = products.filter(product => product.genderProfile === "Feminine");

  return (
    <div className="py-16 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-pink-600 mb-4">
            ЗА НЕЯ
          </h1>
          <p className="text-lg text-pink-500">
            Луксозни аромати за съвременната жена
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
