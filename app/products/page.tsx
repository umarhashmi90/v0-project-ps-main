"use client"
import React from "react"
import Footer from "@/components/landing/footer"
import Header from "@/components/landing/header"
import { Button } from "@/components/ui/button"
import { ArrowRight, Monitor, Smartphone } from "lucide-react"
import { motion } from "framer-motion"
import { PinContainer } from "@/components/ui/3d-pin"

const categoryCards = [
  {
    title: "PC Products",
    description: "Explore our range of products for PC.",
    href: "/products/pc",
    pinTitle: "Only For PC",
    icon: <Monitor className="w-8 h-8 text-primary" />,
  },
  {
    title: "iOS Products",
    description: "Discover exclusive tools for iOS devices.",
    href: "/products/ios",
    pinTitle: "For iPhone and iPad Only",
    icon: <Smartphone className="w-8 h-8 text-primary" />,
  },
  {
    title: "Android Products",
    description: "Enhance your Android experience with our apps.",
    href: "/products/android",
    pinTitle: "For Root and Non Root Android",
    icon: <Smartphone className="w-8 h-8 text-primary" />,
  },
]

export default function ProductsPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="flex flex-col items-center text-center">
                  <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary mb-4">
                    OUR DIGITAL PRODUCTS
                  </span>
                  <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl font-headline">
                    Choose the Right Plan for You
                  </h1>
                </div>
                <p className="mt-6 text-base md:text-lg max-w-2xl mx-auto leading-8 text-muted-foreground">
                  Discover our range of premium digital services and keys. Select the plan that suits your needs best
                  and get started instantly with secure and reliable solutions.
                </p>
                <div className="mt-10">
                  <Button size="lg" asChild className="hover-shimmer-button">
                    <a href="#products-grid">
                      Explore Now <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="products-grid" className="container pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-20 max-w-5xl mx-auto">
            {categoryCards.map((card, i) => (
              <PinContainer key={i} title={card.pinTitle} href={card.href}>
                <div className="flex basis-full flex-col p-4 tracking-tight text-card-foreground sm:basis-1/2 w-full sm:w-[20rem] h-[20rem] justify-between">
                  <div>
                    <div className="flex justify-center items-center h-24 text-primary">
                      {React.cloneElement(card.icon, { className: "w-8 h-8" })}
                    </div>
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-center text-card-foreground">
                      {card.title}
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal text-center">
                      <span className="text-muted-foreground ">{card.description}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline" className="w-full hover-shimmer-button bg-transparent">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </PinContainer>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
