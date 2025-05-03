"use client"
import Link from "next/link"
import { ShoppingBag, Heart, Settings, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock recently purchased products
const RECENT_PURCHASES = [
  {
    id: 1,
    name: "Organic Fresh Milk",
    price: 4.99,
    image: "/placeholder.svg?height=80&width=80",
    purchaseDate: "Today",
    quantity: 1,
  },
  {
    id: 2,
    name: "Whole Wheat Bread",
    price: 3.5,
    image: "/placeholder.svg?height=80&width=80",
    purchaseDate: "Yesterday",
    quantity: 2,
  },
  {
    id: 3,
    name: "Fresh Vegetable Salad",
    price: 5.25,
    image: "/placeholder.svg?height=80&width=80",
    purchaseDate: "3 days ago",
    quantity: 1,
  },
  {
    id: 4,
    name: "Low-fat Yogurt",
    price: 2.99,
    image: "/placeholder.svg?height=80&width=80",
    purchaseDate: "Last week",
    quantity: 3,
  },
]

// Mock favorite products
const FAVORITE_PRODUCTS = [
  {
    id: 5,
    name: "Organic Apples",
    price: 3.99,
    image: "/placeholder.svg?height=80&width=80",
    addedDate: "2 days ago",
  },
  {
    id: 6,
    name: "Gluten-Free Pasta",
    price: 4.5,
    image: "/placeholder.svg?height=80&width=80",
    addedDate: "1 week ago",
  },
]

export default function Favorites() {
  return (
    <div className="flex min-h-screen flex-col max-w-md mx-auto">
      <header className="border-b p-4">
        <h1 className="text-xl font-bold">Your Products</h1>
      </header>

      <main className="flex-1 p-4">
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="recent">Recently Purchased</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4">
            {RECENT_PURCHASES.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      {product.quantity > 1 && (
                        <Badge className="absolute -top-2 -right-2 bg-primary">x{product.quantity}</Badge>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-primary font-bold">${product.price}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Purchased: {product.purchaseDate}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Buy Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="pt-4">
              <Link href="/purchase-history" className="flex items-center justify-center text-primary text-sm">
                View Full Purchase History
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            {FAVORITE_PRODUCTS.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-primary font-bold">${product.price}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Heart className="h-3 w-3 mr-1" />
                        <span>Added: {product.addedDate}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {FAVORITE_PRODUCTS.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">You haven't added any favorites yet.</div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t">
        <div className="grid grid-cols-3 h-16">
          <Link href="/dashboard" className="flex flex-col items-center justify-center text-muted-foreground">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs mt-1">Products</span>
          </Link>
          <Link href="/favorites" className="flex flex-col items-center justify-center text-primary">
            <Heart className="h-5 w-5" />
            <span className="text-xs mt-1">Recent</span>
          </Link>
          <Link href="/preferences" className="flex flex-col items-center justify-center text-muted-foreground">
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </footer>
    </div>
  )
}
