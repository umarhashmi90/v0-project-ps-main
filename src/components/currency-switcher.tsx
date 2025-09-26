"use client";

import * as React from "react"
import { useCurrency } from "@/hooks/use-currency";
import { cn } from "@/lib/utils";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="group relative flex items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-r-full border border-l-0 bg-background text-lg font-bold shadow-lg transition-all duration-300 group-hover:w-28 group-hover:rounded-full">
            <span className="opacity-100 transition-opacity duration-200 group-hover:opacity-0">
                {currency === 'USD' ? '$' : '₨'}
            </span>
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex h-10 w-0 items-center justify-center gap-1 rounded-full bg-background opacity-0 transition-all duration-300 group-hover:w-28 group-hover:opacity-100">
            <button
                onClick={() => setCurrency('PKR')}
                className={cn(
                    "flex h-8 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    currency === 'PKR' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-foreground hover:bg-secondary'
                )}
            >
                PKR
            </button>
            <button
                onClick={() => setCurrency('USD')}
                className={cn(
                    "flex h-8 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    currency === 'USD' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-foreground hover:bg-secondary'
                )}
            >
                USD
            </button>
        </div>
    </div>
  )
}
