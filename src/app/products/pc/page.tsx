"use client";
import React from "react";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShimmeringText } from "@/components/ui/shimmering-text";
import { useCurrency } from "@/hooks/use-currency";
import { ProductLayout } from "@/components/product-layout";

const vnhaxProducts = [
    {
        name: "Vnhax Frozen Key",
        price: 5,
        priceSuffix: "/ Day",
        badge: null,
        buttonVariant: "default",
        buttonText: "Buy Now",
        href: "/products/vnhax-frozen-key",
        features: [
            "100% Safe & Secure",
            "Special Kill Effects",
            "Best Recoil Control",
            "ESP, Skins & Aimbot",
            "Integrated emulator bypass",
        ],
    },
    {
        name: "Vnhax Week Key",
        price: 15,
        priceSuffix: "/ Week",
        badge: null,
        buttonVariant: "default",
        buttonText: "Buy Now",
        href: "/products/vnhax-week-key",
        features: [
            "100% Safe & Secure",
            "Special Kill Effects",
            "Best Recoil Control",
            "ESP, Skins & Aimbot",
            "Integrated emulator bypass",
        ],
    },
    {
        name: "Vnhax Month Key",
        price: 30,
        priceSuffix: "/ Month",
        badge: "POPULAR!",
        buttonVariant: "gradient",
        buttonText: "Buy Now",
        href: "/products/vnhax-month-key",
        features: [
            "100% Safe & Secure",
            "Special Kill Effects",
            "Best Recoil Control",
            "ESP, Skins & Aimbot",
            "Integrated emulator bypass",
        ],
    },
    {
        name: "Vnhax Admin Key",
        price: 190,
        priceSuffix: "/ Lifetime",
        badge: "10% Discount",
        buttonVariant: "default",
        buttonText: "Buy Now",
        href: "/products/vnhax-admin-key",
        features: [
            "100% Safe & Secure",
            "Special Kill Effects",
            "Best Recoil Control",
            "ESP, Skins & Aimbot",
            "Integrated emulator bypass",
        ],
    }
];

const redeyeProducts = [
    {
        name: "Redeye Frozen Key",
        price: 5,
        priceSuffix: "/ Day",
        badge: null,
        buttonVariant: "default",
        buttonText: "Buy Now",
        href: "/products/redeye-frozen-key",
        features: [
            "Players, Bots & Airdrop ESP",
            "HWID Spoofer & Emulator Bypass",
            "Aimbot & Recoil Control",
            "Radar & Item Visuals",
            "24/7 Dedicated Support",
        ],
    },
    {
        name: "Redeye Week Key",
        price: 15,
        priceSuffix: "/ Week",
        badge: null,
        buttonVariant: "default",
        buttonText: "Buy Now",
        href: "/products/redeye-week-key",
        features: [
            "Players, Bots & Airdrop ESP",
            "HWID Spoofer & Emulator Bypass",
            "Aimbot & Recoil Control",
            "Radar & Item Visuals",
            "24/7 Dedicated Support",
        ],
    },
    {
        name: "Redeye Month Key",
        price: 30,
        priceSuffix: "/ Month",
        badge: "POPULAR!",
        buttonVariant: "gradient",
        buttonText: "Buy Now",
        href: "/products/redeye-month-key",
        features: [
            "Players, Bots & Airdrop ESP",
            "HWID Spoofer & Emulator Bypass",
            "Aimbot & Recoil Control",
            "Radar & Item Visuals",
            "24/7 Dedicated Support",
        ],
    }
];

const anubisProducts = [
    {
        name: "Anubis Week Key",
        price: 20,
        priceSuffix: "/ Week",
        badge: null,
        buttonVariant: "default",
        buttonText: "Buy Now",
        href: "/products/anubis-week-key",
        features: [
            "Silent Aimbot",
            "Aimbot FOV value",
            "Draw FOV as Circle",
            "Skip Knocked Enemies",
            "Show Current Aim Position",
            "Draw Line to Target bone",
        ],
    },
    {
        name: "Anubis Month Key",
        price: 40,
        priceSuffix: "/ Month",
        badge: "POPULAR!",
        buttonVariant: "gradient",
        buttonText: "Buy Now",
        href: "/products/anubis-month-key",
        features: [
            "Silent Aimbot",
            "Aimbot FOV value",
            "Draw FOV as Circle",
            "Skip Knocked Enemies",
            "Show Current Aim Position",
            "Draw Line to Target bone",
        ],
    },
]

export default function PcProductsPage() {
  const { formatPrice } = useCurrency();
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Header />
      <ProductLayout>
        <main className="flex-1">
            {/* Hero Section */}
            <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 bg-gradient-to-b from-secondary/30 to-background overflow-hidden">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div>
                            <div className="flex flex-col items-center text-center">
                                <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary mb-4">
                                    PC PRODUCTS
                                </span>
                                <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl font-headline">
                                    PC Gaming Products
                                </h1>
                            </div>
                            <p className="mt-6 text-lg max-w-2xl mx-auto leading-8 text-muted-foreground">
                                Explore our wide collection of premium PC gaming digital keys and services with PUBGSTUU. From top-rated game activations to reliable digital solutions, we provide everything you need to enhance your gaming journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="vnhax-products" className="container pb-16 md:pb-24">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl font-headline">Vnhax PC</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto leading-8 text-muted-foreground">
                        Boost PUBG Gameplay | Safe & Secure for Top Ranks
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch max-w-7xl mx-auto">
                    {vnhaxProducts.map((product) => (
                        <div key={product.name}>
                        <Card className={cn(
                            "flex flex-col rounded-2xl shadow-lg transition-all duration-300 text-left group h-full",
                            product.badge && "relative"
                            )}>
                            {product.badge && (
                            <div className="absolute top-0 right-6 -translate-y-1/2 z-10">
                                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                                    <Shield className="h-4 w-4" />
                                    {product.badge}
                                </div>
                            </div>
                            )}

                            <div className="flex flex-col flex-grow">
                            <CardHeader className={cn("p-6 rounded-t-2xl", product.buttonVariant === 'gradient' ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10' : 'bg-card')}>
                                <h3 className="text-xl font-bold font-headline">{product.name}</h3>
                                <div className="flex items-baseline gap-2 pt-2">
                                    <div className="text-4xl font-extrabold tracking-tight">
                                        <span className="group-hover:hidden">{formatPrice(product.price)}</span>
                                        <div className="hidden group-hover:block">
                                            <ShimmeringText text={formatPrice(product.price)} duration={2} />
                                        </div>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{product.priceSuffix}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 flex-1">
                                <ul className="space-y-3 text-left">
                                {product.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-white rounded-full bg-black p-1 shrink-0 mt-0.5" />
                                    <span className="text-foreground text-sm sm:text-base">{feature}</span>
                                    </li>
                                ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="p-6 mt-auto">
                            <Button asChild size="lg" className={cn("w-full text-base rounded-full hover-shimmer-button", product.buttonVariant === 'gradient' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow' : 'bg-primary text-primary-foreground')}>
                                    <Link href={product.href || '#'}>
                                        <span>{product.buttonText}</span>
                                    </Link>
                                </Button>
                            </CardFooter>
                            </div>
                        </Card>
                        </div>
                    ))}
                </div>
            </section>

            <section id="redeye-products" className="container pb-16 md:pb-24">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl font-headline">Redeye – Bypass</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto leading-8 text-muted-foreground">
                        Redeye Boost enhances your PUBG rank with safe and secure gameplay, ensuring a smooth and risk-free experience while climbing the ranks.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
                    {redeyeProducts.map((product) => (
                        <div key={product.name}>
                        <Card className={cn(
                            "flex flex-col rounded-2xl shadow-lg transition-all duration-300 text-left group h-full",
                            product.badge && "relative"
                            )}>
                                {product.badge && (
                                <div className="absolute top-0 right-6 -translate-y-1/2 z-10">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                                        <Shield className="h-4 w-4" />
                                        {product.badge}
                                    </div>
                                </div>
                                )}
                            <div className="flex flex-col flex-grow">
                            <CardHeader className={cn("p-6 rounded-t-2xl", product.buttonVariant === 'gradient' ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10' : 'bg-card')}>
                                <h3 className="text-xl font-bold font-headline">{product.name}</h3>
                                <div className="flex items-baseline gap-2 pt-2">
                                    <div className="text-4xl font-extrabold tracking-tight">
                                        <span className="group-hover:hidden">{formatPrice(product.price)}</span>
                                        <div className="hidden group-hover:block">
                                            <ShimmeringText text={formatPrice(product.price)} duration={2} />
                                        </div>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{product.priceSuffix}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 flex-1">
                                <ul className="space-y-3 text-left">
                                {product.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-white rounded-full bg-black p-1 shrink-0 mt-0.5" />
                                    <span className="text-foreground text-sm sm:text-base">{feature}</span>
                                    </li>
                                ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="p-6 mt-auto">
                            <Button asChild size="lg" className={cn("w-full text-base rounded-full hover-shimmer-button", product.buttonVariant === 'gradient' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow' : 'bg-primary text-primary-foreground')}>
                                    <Link href={product.href || '#'}>
                                        <span>{product.buttonText}</span>
                                    </Link>
                                </Button>
                            </CardFooter>
                            </div>
                        </Card>
                        </div>
                    ))}
                </div>
            </section>

            <section id="anubis-products" className="container pb-16 md:pb-24">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl font-headline">Anubis – Bypass</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto leading-8 text-muted-foreground">
                        Anubis Boost enhances your PUBG rank with safe and secure gameplay, ensuring a smooth and risk-free experience while climbing the ranks.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">
                    {anubisProducts.map((product) => (
                        <div key={product.name}>
                        <Card className={cn(
                            "flex flex-col rounded-2xl shadow-lg transition-all duration-300 text-left group h-full",
                            product.badge && "relative"
                            )}>
                                {product.badge && (
                                <div className="absolute top-0 right-6 -translate-y-1/2 z-10">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                                        <Shield className="h-4 w-4" />
                                        {product.badge}
                                    </div>
                                </div>
                                )}
                            <div className="flex flex-col flex-grow">
                            <CardHeader className={cn("p-6 rounded-t-2xl", product.buttonVariant === 'gradient' ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10' : 'bg-card')}>
                                <h3 className="text-xl font-bold font-headline">{product.name}</h3>
                                <div className="flex items-baseline gap-2 pt-2">
                                    <div className="text-4xl font-extrabold tracking-tight">
                                        <span className="group-hover:hidden">{formatPrice(product.price)}</span>
                                        <div className="hidden group-hover:block">
                                            <ShimmeringText text={formatPrice(product.price)} duration={2} />
                                        </div>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{product.priceSuffix}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 flex-1">
                                <ul className="space-y-3 text-left">
                                {product.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-white rounded-full bg-black p-1 shrink-0 mt-0.5" />
                                    <span className="text-foreground text-sm sm:text-base">{feature}</span>
                                    </li>
                                ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="p-6 mt-auto">
                            <Button asChild size="lg" className={cn("w-full text-base rounded-full hover-shimmer-button", product.buttonVariant === 'gradient' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow' : 'bg-primary text-primary-foreground')}>
                                    <Link href={product.href || '#'}>
                                        <span>{product.buttonText}</span>
                                    </Link>
                                </Button>
                            </CardFooter>
                            </div>
                        </Card>
                        </div>
                    ))}
                </div>
            </section>
        </main>
      </ProductLayout>
      <Footer />
    </div>
  );
}
