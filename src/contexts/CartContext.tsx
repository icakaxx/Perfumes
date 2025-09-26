"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  productName: string;
  variantVolume: number;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'productName' | 'variantVolume' | 'price'>) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('perfume-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('perfume-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'productName' | 'variantVolume' | 'price'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.productId === newItem.productId && item.variantId === newItem.variantId
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.productId === newItem.productId && item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        // We'll add the item with basic info, details will be fetched in cart page
        return [...prevItems, {
          ...newItem,
          productName: '', // Will be filled when needed
          variantVolume: 0, // Will be filled when needed
          price: 0, // Will be filled when needed
        }];
      }
    });
  };

  const removeItem = (productId: string, variantId: string) => {
    setItems(prevItems =>
      prevItems.filter(item => !(item.productId === productId && item.variantId === variantId))
    );
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
