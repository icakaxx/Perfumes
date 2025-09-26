import { products } from "@/data/products";

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  imageUrl: string;
  concentration: string;
  genderProfile: "Feminine" | "Masculine" | "Unisex";
  rating?: number;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  variants: {
    id: string;
    volumeMl: number;
    price: number;
    inStock: boolean;
  }[];
}

const STORAGE_KEY = 'luxe-parfum-products';

export class DataManager {
  // Get products from localStorage or fallback to default
  static getProducts(): Product[] {
    if (typeof window === 'undefined') {
      return products; // Server-side fallback
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log('Loaded products from localStorage:', parsed.length);
        return parsed;
      }
    } catch (error) {
      console.error('Error loading products from localStorage:', error);
    }

    // Initialize with default products if nothing stored
    this.saveProducts(products);
    return products;
  }

  // Save products to localStorage
  static saveProducts(productsData: Product[]): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productsData));
      console.log('Saved products to localStorage:', productsData.length);
    } catch (error) {
      console.error('Error saving products to localStorage:', error);
    }
  }

  // Update a single product
  static updateProduct(productId: string, updates: Partial<Product>): Product[] {
    const products = this.getProducts();
    const updatedProducts = products.map(product => 
      product.id === productId 
        ? { ...product, ...updates }
        : product
    );
    this.saveProducts(updatedProducts);
    return updatedProducts;
  }

  // Update a product variant
  static updateVariant(
    productId: string, 
    variantId: string, 
    updates: Partial<Product['variants'][0]>
  ): Product[] {
    const products = this.getProducts();
    const updatedProducts = products.map(product => 
      product.id === productId 
        ? {
            ...product,
            variants: product.variants.map(variant =>
              variant.id === variantId 
                ? { ...variant, ...updates }
                : variant
            )
          }
        : product
    );
    this.saveProducts(updatedProducts);
    return updatedProducts;
  }

  // Export products data as JSON
  static exportProducts(): string {
    const products = this.getProducts();
    return JSON.stringify(products, null, 2);
  }

  // Import products data from JSON
  static importProducts(jsonData: string): boolean {
    try {
      const importedProducts = JSON.parse(jsonData);
      if (Array.isArray(importedProducts)) {
        this.saveProducts(importedProducts);
        console.log('Successfully imported products:', importedProducts.length);
        return true;
      }
    } catch (error) {
      console.error('Error importing products:', error);
    }
    return false;
  }

  // Reset to default products
  static resetToDefault(): Product[] {
    this.saveProducts(products);
    return products;
  }

  // Get products count
  static getProductsCount(): { total: number; feminine: number; masculine: number } {
    const products = this.getProducts();
    return {
      total: products.length,
      feminine: products.filter(p => p.genderProfile === 'Feminine').length,
      masculine: products.filter(p => p.genderProfile === 'Masculine').length
    };
  }
}
