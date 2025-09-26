"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"

// Mock data - replace with real data from your database
const favorites = [
  {
    id: "1",
    name: "Premium Software License",
    description: "Full-featured premium license with all modules",
    price: "$99.00",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Extended Support Package",
    description: "Priority support with extended coverage",
    price: "$49.00",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-headline">Favorites</h1>
        <p className="mt-2 text-muted-foreground">Your saved products and items you're interested in.</p>
      </div>

      {favorites.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No favorites yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Browse our products and add items to your favorites.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription className="mt-2">{item.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                    <Heart className="h-5 w-5 fill-current" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{item.price}</span>
                  <Button>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
