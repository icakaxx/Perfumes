"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PerfumeCard } from "@/components/PerfumeCard";
import { FiltersSheet, FilterState } from "@/components/FiltersSheet";
import { useDatabaseProducts } from "@/hooks/useDatabaseProducts";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="container py-8">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Loading shop...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, loading, error } = useDatabaseProducts();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Initialize filters from URL params
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    concentrations: searchParams.get("concentrations")?.split(",") || [],
    genderProfiles: searchParams.get("genderProfiles")?.split(",") || [],
    topNotes: searchParams.get("topNote")?.split(",") || [],
    heartNotes: searchParams.get("heartNote")?.split(",") || [],
    baseNotes: searchParams.get("baseNote")?.split(",") || [],
    inStockOnly: searchParams.get("inStock") === "true",
    sortBy: searchParams.get("sortBy") || "featured"
  });

  // Extract all unique notes
  const allNotes = useMemo(() => {
    const topNotes = new Set<string>();
    const heartNotes = new Set<string>();
    const baseNotes = new Set<string>();
    
    products.forEach(product => {
      product.topNotes.forEach(note => topNotes.add(note));
      product.heartNotes.forEach(note => heartNotes.add(note));
      product.baseNotes.forEach(note => baseNotes.add(note));
    });
    
    return {
      top: Array.from(topNotes).sort(),
      heart: Array.from(heartNotes).sort(),
      base: Array.from(baseNotes).sort()
    };
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Concentration filter
    if (filters.concentrations.length > 0) {
      result = result.filter(product => 
        filters.concentrations.includes(product.concentration)
      );
    }
    
    // Gender profile filter
    if (filters.genderProfiles.length > 0) {
      result = result.filter(product => 
        product.genderProfile && filters.genderProfiles.includes(product.genderProfile)
      );
    }
    
    // Notes filters
    if (filters.topNotes.length > 0) {
      result = result.filter(product => 
        product.topNotes.some(note => filters.topNotes.includes(note))
      );
    }
    if (filters.heartNotes.length > 0) {
      result = result.filter(product => 
        product.heartNotes.some(note => filters.heartNotes.includes(note))
      );
    }
    if (filters.baseNotes.length > 0) {
      result = result.filter(product => 
        product.baseNotes.some(note => filters.baseNotes.includes(note))
      );
    }
    
    // Price range filter
    result = result.filter(product => {
      const minPrice = Math.min(...product.variants.map(v => v.price));
      const maxPrice = Math.max(...product.variants.map(v => v.price));
      return minPrice <= filters.priceRange[1] && maxPrice >= filters.priceRange[0];
    });
    
    // In stock filter
    if (filters.inStockOnly) {
      result = result.filter(product => 
        product.variants.some(v => v.inStock)
      );
    }
    
    // Sorting
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => {
          const aPrice = Math.min(...a.variants.map(v => v.price));
          const bPrice = Math.min(...b.variants.map(v => v.price));
          return aPrice - bPrice;
        });
        break;
      case "price-desc":
        result.sort((a, b) => {
          const aPrice = Math.min(...a.variants.map(v => v.price));
          const bPrice = Math.min(...b.variants.map(v => v.price));
          return bPrice - aPrice;
        });
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }
    
    return result;
  }, [products, searchQuery, filters]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.concentrations.length) params.set("concentrations", filters.concentrations.join(","));
    if (filters.genderProfiles.length) params.set("genderProfiles", filters.genderProfiles.join(","));
    if (filters.topNotes.length) params.set("topNote", filters.topNotes.join(","));
    if (filters.heartNotes.length) params.set("heartNote", filters.heartNotes.join(","));
    if (filters.baseNotes.length) params.set("baseNote", filters.baseNotes.join(","));
    if (filters.inStockOnly) params.set("inStock", "true");
    if (filters.sortBy !== "featured") params.set("sortBy", filters.sortBy);
    
    const newUrl = params.toString() ? `/shop?${params.toString()}` : "/shop";
    router.replace(newUrl, { scroll: false });
  }, [filters, router]);

  const activeFilterCount = 
    filters.concentrations.length +
    filters.genderProfiles.length +
    filters.topNotes.length +
    filters.heartNotes.length +
    filters.baseNotes.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.sortBy !== "featured" ? 1 : 0);

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      concentrations: [],
      genderProfiles: [],
      topNotes: [],
      heartNotes: [],
      baseNotes: [],
      inStockOnly: false,
      sortBy: "featured"
    });
    setSearchQuery("");
  };

  return (
    <div className="container py-4 sm:py-8 px-4 sm:px-6">
      {loading && (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Loading products...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-16 text-red-600">
          <p>Error loading products: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              Колекция Парфюми
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {filteredProducts.length} продукта налични
            </p>
          </div>

      {/* Search and Filter Bar */}
      <div className="sticky top-16 z-20 glass-effect backdrop-blur-md py-3 sm:py-4 mb-4 sm:mb-6 border-b">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Търсене парфюми, марки..."
              className="pl-10 text-sm sm:text-base"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(true)}
            className="relative text-xs sm:text-sm"
          >
            <SlidersHorizontal className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Филтри</span>
            <span className="sm:hidden">Филт.</span>
            {activeFilterCount > 0 && (
              <Badge className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:px-1.5 bg-accent text-white text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
            {filters.concentrations.map(conc => (
              <Badge key={conc} variant="secondary" className="text-xs">
                {conc}
                <button
                  onClick={() => setFilters({
                    ...filters,
                    concentrations: filters.concentrations.filter(c => c !== conc)
                  })}
                  className="ml-1"
                >
                  <X className="h-2 w-2 sm:h-3 sm:w-3" />
                </button>
              </Badge>
            ))}
            {filters.genderProfiles.map(gender => (
              <Badge key={gender} variant="secondary" className="text-xs">
                {gender}
                <button
                  onClick={() => setFilters({
                    ...filters,
                    genderProfiles: filters.genderProfiles.filter(g => g !== gender)
                  })}
                  className="ml-1"
                >
                  <X className="h-2 w-2 sm:h-3 sm:w-3" />
                </button>
              </Badge>
            ))}
            {[...filters.topNotes, ...filters.heartNotes, ...filters.baseNotes].map(note => (
              <Badge key={note} variant="secondary" className="text-xs">
                {note}
                <button
                  onClick={() => setFilters({
                    ...filters,
                    topNotes: filters.topNotes.filter(n => n !== note),
                    heartNotes: filters.heartNotes.filter(n => n !== note),
                    baseNotes: filters.baseNotes.filter(n => n !== note)
                  })}
                  className="ml-1"
                >
                  <X className="h-2 w-2 sm:h-3 sm:w-3" />
                </button>
              </Badge>
            ))}
            {filters.inStockOnly && (
              <Badge variant="secondary" className="text-xs">
                In Stock
                <button
                  onClick={() => setFilters({ ...filters, inStockOnly: false })}
                  className="ml-1"
                >
                  <X className="h-2 w-2 sm:h-3 sm:w-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-5 sm:h-6 text-xs"
            >
              Изчисти всички
            </Button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <PerfumeCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16">
          <p className="text-base sm:text-lg text-muted-foreground mb-4 text-center px-4">
            Не са намерени продукти, отговарящи на вашите критерии
          </p>
          <Button onClick={clearAllFilters} variant="outline" className="text-sm">
            Изчисти филтрите
          </Button>
        </div>
      )}

          {/* Filters Sheet */}
          <FiltersSheet
            open={showFilters}
            onOpenChange={setShowFilters}
            filters={filters}
            onFiltersChange={setFilters}
            allNotes={allNotes}
          />
        </>
      )}
    </div>
  );
}
