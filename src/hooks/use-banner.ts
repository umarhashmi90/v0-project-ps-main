import { useContext } from 'react';
import { BannerContext } from '@/context/BannerContext';

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (context === undefined) {
    throw new Error('useBanner must be used within a BannerProvider');
  }
  return context;
};
