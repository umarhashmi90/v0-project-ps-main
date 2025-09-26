"use client";

import React, { createContext, useState, ReactNode, useCallback } from 'react';
import type { Product } from '@/lib/products';

interface FavoritesContextType {
  favoriteItems: Product[];
  addToFavorites: (item: Product) => void;
  removeFromFavorites: (id: number) => void;
  isFavorited: (id: number) => boolean;
  loading: boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteItems, setFavoriteItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const addToFavorites = useCallback((itemToAdd: Product) => {
    setFavoriteItems(prevItems => {
        if (prevItems.find(item => item.id === itemToAdd.id)) {
            return prevItems;
        }
        return [...prevItems, itemToAdd];
    });
  }, []);

  const removeFromFavorites = useCallback((id: number) => {
    setFavoriteItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const isFavorited = useCallback((id: number) => {
    return favoriteItems.some(item => item.id === id);
  }, [favoriteItems]);

  return (
    <FavoritesContext.Provider value={{ favoriteItems, addToFavorites, removeFromFavorites, isFavorited, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};
