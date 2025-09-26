"use client";
import React from "react";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import { Button } from "@/components/ui/button";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShimmeringText } from "@/components/ui/shimmering-text";
import { useCurrency } from "@/hooks/use-currency";
import { ProductLayout } from "@/components/product-layout";

const vnhaxProducts = [
    {
        name: "Vnhax iOS Frozen Key",
        price: 5,
        priceSuffix: "/ Day",
        buttonVariant: "default",
        buttonText: "Buy Now",
        href: "/products/vnhax-ios-frozen-key",
        features: [
            "100% Safe & Secure",
            "Special Kill Effects",
            "Best Recoil Control",
            "ESP, Skins & Aimbot",
            "Radar & Item Visuals",
        ],
    },
    {
        name: "Vnhax iOS Week Key",
        price: 15,
        priceSuffix: "/ Week",
        buttonVariant: "default",
        buttonText: "Buy Now",
        href: "/products/vnhax-ios-week-key",
        features: [
            "100% Safe & Secure",
            "Special Kill Effects",
            "Best Recoil Control",
            "ESP, Skins & Aimbot",
            "Radar & Item Visuals",
        ],
    },
    {
        name: "Vnhax iOS Month Key",
        price: 30,
        priceSuffix: "/ Month",
        badge: "POPULAR!",
        buttonVariant: "gradient",
        buttonText: "Buy Now",
        href: "/products/vnhax-ios-month-key",
        features: [
            "100% Safe & Secure",
            "Special Kill Effects",
            "Best Recoil Control",
            "ESP, Skins & Aimbot",
            "Radar & Item Visuals",
        ],
    },
];

const starProducts = [
    {
        name: "Star iOS Frozen Key",
        price: 5,
        priceSuffix: "/ Day",
        buttonVariant: "default",
        buttonText: "Buy Now",
        href: "/products/star-ios-frozen-key",
        features: [
            "Players, Bots & Airdrop ESP",
            "HWID Spoofer",
            "Aimbot & Recoil Control",
            "Radar & Item Visuals",
            "24/7 Dedicated Support",
        ],
    },
    {
        name: "Star iOS Week Key",
        price: 15,
        priceSuffix: "/ Week",
        buttonVariant: "default",
        buttonText: "Buy Now",
        href: "/products/star-ios-week-key",
        features: [
            "Players, Bots & Airdrop ESP",
            "HWID Spoofer",
            "Aimbot & Recoil Control",
            "Radar & Item Visuals",
            "24/7 Dedicated Support",
        ],
    },
    {
        name: "Star iOS Month Key",
        price: 30,
        priceSuffix: "/ Month",
        badge: "POPULAR!",
        buttonVariant: "gradient",
        buttonText: "Buy Now",
        href: "/products/star-ios-month-key",
        features: [
            "Players, Bots & Airdrop ESP",
            "HWID Spoofer",
            "Aimbot & Recoil Control",
            "Radar & Item Visuals",
            "24/7 Dedicated Support",
        ],
    }
];

const tornadoProducts = [
    {
        name: "Tornado iOS Week Key",
        price: 17,
        priceSuffix: "/ Week",
        buttonVariant: "default",
        buttonText: "Buy Now",
        href: "/products/tornado-ios-week-key",
        features: [
            "Silent Aimbot",
            "Aimbot FOV Value",
            "Draw FOV as Circle",
            "Show Current Aim Position",
            "Skip Knocked Enemies",
            "Draw Line to Target Bone",
        ],
    },
    {
        name: "Tornado iOS Month Key",
        price: 35,
        priceSuffix: "/ Month",
        badge: "POPULAR!",
        buttonVariant: "gradient",
        buttonText: "Buy Now",
        href: "/products/tornado-ios-month-key",
        features: [
            "Silent Aimbot",
            "Aimbot FOV Value",
            "Draw FOV as Circle",
            "Show Current Aim Position",
            "Skip Knocked Enemies",
            "Draw Line to Target Bone",
        ],
    },
]

export default function IosProductsPage() {
  const { formatPrice } = useCurrency();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Header />
      <ProductLayout>
        <main className="flex-1">
            {/* Hero Section */}
            <section className="relative pt-28 md:pt-40 pb-12 md:pb-24 bg-gradient-to-b from-secondary/30 to-background">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div>
                            <div className="flex flex-col items-center text-center">
                                <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary mb-4">
                                    IOS PRODUCTS
                                </span>
                                <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl font-headline">
                                    iOS Gaming Products
                                </h1>
                            </div>
                            <p className="mt-6 text-base md:text-lg max-w-2xl mx-auto leading-8 text-muted-foreground">
                                Explore our exclusive range of iOS keys designed to deliver smooth, secure, and enhanced PUBG gameplay. Choose the plan that fits your needs and unlock premium features with ease.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="vnhax-products" className="container pb-12 md:pb-24">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl font-headline">Vnhax iOS</h2>
                    <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto leading-8 text-muted-foreground">
                        Experience the ultimate competitive edge. Our Vnhax iOS keys offer maximum security and game-changing features.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
                    {vnhaxProducts.map((product) => (
                        <div key={product.name + product.price}>
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

            <section id="star-products" className="container pb-12 md:pb-24">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl font-headline">Star iOS</h2>
                    <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto leading-8 text-muted-foreground">
                        Enhance your gameplay with reliable ESP and aimbot solutions.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
                    {starProducts.map((product) => (
                        <div key={product.name + product.price}>
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

            <section id="tornado-products" className="container pb-12 md:pb-24">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl font-headline">Tornado iOS</h2>
                    <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto leading-8 text-muted-foreground">
                        Advanced silent aimbot and FOV controls designed for maximum performance.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">
                    {tornadoProducts.map((product) => (
                        <div key={product.name + product.price}>
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
