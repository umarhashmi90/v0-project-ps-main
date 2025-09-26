'use client';

import { useFavorites } from '@/hooks/use-favorites';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrency } from '@/hooks/use-currency';
import { Skeleton } from '@/components/ui/skeleton';

export default function FavoritesPage() {
  const { favoriteItems, removeFromFavorites, loading } = useFavorites();
  const { formatPrice } = useCurrency();

  if (loading) {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-headline">
                    Your Favorites
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Loading your saved products...
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-50/50 border rounded-lg overflow-hidden flex flex-col">
                        <Skeleton className="aspect-square w-full" />
                        <div className="p-4 flex flex-col flex-1">
                            <Skeleton className="h-5 w-3/4" />
                            <div className="mt-4 flex items-center justify-between">
                                <Skeleton className="h-7 w-1/4" />
                                <Skeleton className="h-10 w-10 rounded-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
  }

  return (
    <div>
        <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-headline">
                Your Favorites
            </h1>
            <p className="mt-2 text-muted-foreground">
                Your collection of saved products. Add them to your cart when you're ready to buy.
            </p>
        </div>
        
        {favoriteItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteItems.map((item) => (
                    <div key={item.id} className="bg-gray-50/50 border rounded-lg overflow-hidden flex flex-col">
                        <Link href={item.href} className="block aspect-square relative">
                            <Image 
                                src={item.imageUrl} 
                                alt={item.name} 
                                fill
                                className="object-cover"
                                data-ai-hint={item.aiHint}
                            />
                        </Link>
                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="font-semibold font-headline text-foreground flex-1">
                                <Link href={item.href}>{item.name}</Link>
                            </h3>
                            <div className="mt-4 flex items-center justify-between">
                                <p className="font-bold text-lg">{formatPrice(item.price)}</p>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                    onClick={() => removeFromFavorites(item.id)}
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <Heart className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No favorites yet</h3>
                <p className="mt-2 text-sm text-gray-500">You haven't saved any products to your favorites.</p>
                <Button asChild className="mt-6">
                    <Link href="/products">Browse Products</Link>
                </Button>
            </div>
        )}
    </div>
  );
}
