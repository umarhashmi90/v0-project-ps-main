"use client";

import React, { createContext, useState, ReactNode } from 'react';

export interface Banner {
  id: number;
  text: string;
  type: 'info' | 'discount' | 'warning';
  active: boolean;
}

interface BannerContextType {
  banners: Banner[];
}

export const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [banners] = useState<Banner[]>([]);

  // This context is now simplified and may not be strictly necessary,
  // but we'll keep it in case we need to share banner state more broadly later.
  // The primary fetching logic is moved to the Header component.
  
  return (
    <BannerContext.Provider value={{ banners }}>
      {children}
    </BannerContext.Provider>
  );
};
