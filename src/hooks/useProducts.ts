"use client";

import { useState, useEffect } from 'react';
import { DataManager } from '@/lib/dataManager';

export function useProducts() {
  const [products, setProducts] = useState(() => DataManager.getProducts());

  useEffect(() => {
    // Listen for storage changes (when admin panel updates data)
    const handleStorageChange = () => {
      setProducts(DataManager.getProducts());
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(() => {
      const currentProducts = DataManager.getProducts();
      setProducts(currentProducts);
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return products;
}

