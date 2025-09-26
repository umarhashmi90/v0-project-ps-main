"use client";

import React, { createContext, useState, ReactNode, useCallback } from 'react';

type Currency = 'USD' | 'PKR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const PKR_CONVERSION_RATE = 310;

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const formatPrice = useCallback((price: number) => {
    if (currency === 'PKR') {
      const pkrPrice = price * PKR_CONVERSION_RATE;
      return `₨${pkrPrice.toLocaleString()}`;
    }
    return `$${price.toLocaleString()}`;
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
