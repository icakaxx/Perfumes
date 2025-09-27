"use client";

import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  imageUrl: string; // Keep for backward compatibility
  imageUrls?: string[]; // New field for multiple images
  concentration: string;
  genderProfile: "Feminine" | "Masculine" | "Unisex";
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  variants: {
    id: string;
    volumeMl: number;
    price: number;
    inStock: boolean;
  }[];
  rating?: number;
}

export function useDatabaseProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch from women's, men's, and gift sets tables
      const [womenResponse, menResponse, giftSetsResponse] = await Promise.all([
        fetch('/api/women-perfumes'),
        fetch('/api/men-perfumes'),
        fetch('/api/gift-sets')
      ]);

      // Check each response individually for better error reporting
      if (!womenResponse.ok) {
        const womenError = await womenResponse.json().catch(() => ({ error: 'Unknown error' }));
        if (process.env.NODE_ENV === 'development') {
          console.error('Women perfumes API error:', womenResponse.status, womenError);
        }
        throw new Error(`Failed to fetch women's perfumes: ${womenResponse.status} - ${womenError.error || 'Unknown error'}`);
      }

      if (!menResponse.ok) {
        const menError = await menResponse.json().catch(() => ({ error: 'Unknown error' }));
        if (process.env.NODE_ENV === 'development') {
          console.error('Men perfumes API error:', menResponse.status, menError);
        }
        throw new Error(`Failed to fetch men's perfumes: ${menResponse.status} - ${menError.error || 'Unknown error'}`);
      }

      if (!giftSetsResponse.ok) {
        const giftSetsError = await giftSetsResponse.json().catch(() => ({ error: 'Unknown error' }));
        if (process.env.NODE_ENV === 'development') {
          console.error('Gift sets API error:', giftSetsResponse.status, giftSetsError);
        }
        throw new Error(`Failed to fetch gift sets: ${giftSetsResponse.status} - ${giftSetsError.error || 'Unknown error'}`);
      }

      const womenData = await womenResponse.json();
      const menData = await menResponse.json();
      const giftSetsData = await giftSetsResponse.json();

      // Transform database format to frontend format
      const allProducts: Product[] = [
        ...womenData.map((p: any) => ({
          id: p.id,
          name: p.name,
          brand: p.brand,
          description: p.description,
          imageUrl: p.image_url, // Keep for backward compatibility
          imageUrls: p.image_urls || (p.image_url ? [p.image_url] : []), // New multiple images
          concentration: p.concentration,
          genderProfile: "Feminine" as const,
          topNotes: p.top_notes,
          heartNotes: p.heart_notes,
          baseNotes: p.base_notes,
          variants: p.variants,
          rating: p.rating
        })),
        ...menData.map((p: any) => ({
          id: p.id,
          name: p.name,
          brand: p.brand,
          description: p.description,
          imageUrl: p.image_url, // Keep for backward compatibility
          imageUrls: p.image_urls || (p.image_url ? [p.image_url] : []), // New multiple images
          concentration: p.concentration,
          genderProfile: "Masculine" as const,
          topNotes: p.top_notes,
          heartNotes: p.heart_notes,
          baseNotes: p.base_notes,
          variants: p.variants,
          rating: p.rating
        })),
        ...giftSetsData.map((p: any) => ({
          id: p.id,
          name: p.name,
          brand: p.brand,
          description: p.description,
          imageUrl: p.image_url, // Keep for backward compatibility
          imageUrls: p.image_urls || (p.image_url ? [p.image_url] : []), // New multiple images
          concentration: p.concentration,
          genderProfile: "Unisex" as const, // Gift sets are typically unisex
          topNotes: p.top_notes,
          heartNotes: p.heart_notes,
          baseNotes: p.base_notes,
          variants: p.variants,
          rating: p.rating
        }))
      ];

      setProducts(allProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching products:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchAllProducts };
}
