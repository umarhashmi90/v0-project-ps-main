"use client";

import React from "react";
import { CurrencySwitcher } from "./currency-switcher";

export function ProductLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <aside className="fixed top-1/2 -translate-y-1/2 z-50">
               <CurrencySwitcher />
            </aside>
            <div>
                {children}
            </div>
        </div>
    )
}
