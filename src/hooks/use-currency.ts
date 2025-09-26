import { useContext } from 'react';
import CurrencyContext from '@/context/CurrencyContext';

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
