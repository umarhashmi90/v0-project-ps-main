"use client"
import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useCurrency } from "@/hooks/use-currency"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  description: string
  imageUrl: string
  href: string
  category: string
  badge?: string
  buttonVariant?: "default" | "gradient"
  aiHint?: string
}

interface RelatedProductsProps {
  products: Product[]
  title?: string
  currentProductId?: number
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  title = "Related Products",
  currentProductId,
}) => {
  const { formatPrice } = useCurrency()
  const { addToCart } = useCart()
  const { toast } = useToast()

  const filteredProducts = products.filter((product) => product.id !== currentProductId)

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      href: product.href,
      category: product.category,
      aiHint: product.aiHint,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (filteredProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">{title}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Discover more products that might interest you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.slice(0, 6).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={cn("group hover:shadow-xl transition-all duration-300", product.badge && "relative")}>
                {product.badge && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
                      {product.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader
                  className={cn(
                    "p-6 rounded-t-2xl",
                    product.buttonVariant === "gradient"
                      ? "bg-gradient-to-br from-purple-500/10 to-blue-500/10"
                      : "bg-card",
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg p-2 relative">
                      <Image
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain"
                        data-ai-hint={product.aiHint}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold font-headline">{product.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <CardDescription className="text-sm text-muted-foreground mb-4">
                    {product.description}
                  </CardDescription>

                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="flex-1 bg-transparent">
                      <Link href={product.href}>View Details</Link>
                    </Button>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className={cn(
                        "flex-1",
                        product.buttonVariant === "gradient" &&
                          "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600",
                      )}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
