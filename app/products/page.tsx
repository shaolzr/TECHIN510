"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, Plus, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { BottomNav } from "@/components/bottom-nav"

// Mock product data
const PRODUCTS = [
  {
    id: 1,
    name: "Organic Almond Milk",
    price: 4.99,
    image: "/almond-milk-pouring.png",
    tags: ["Dairy-Free", "Vegan", "Low Sugar"],
    suitable: true,
  },
  {
    id: 2,
    name: "Gluten-Free Bread",
    price: 5.49,
    image: "/gluten-free-bread.png",
    tags: ["Gluten-Free", "Vegan", "No Preservatives"],
    suitable: true,
  },
  {
    id: 3,
    name: "Sugar-Free Dark Chocolate",
    price: 3.99,
    image: "/sugar-free-dark-chocolate.png",
    tags: ["No Added Sugar", "Vegan", "Gluten-Free"],
    suitable: true,
  },
  {
    id: 4,
    name: "Organic Mixed Berries",
    price: 6.99,
    image: "/organic-mixed-berries.png",
    tags: ["Low GI", "Organic", "Fresh"],
    suitable: true,
  },
  {
    id: 5,
    name: "Whole Grain Pasta",
    price: 2.99,
    image: "/whole-grain-pasta.png",
    tags: ["High Fiber", "Low GI", "Vegan"],
    suitable: false,
    warning: "Contains Gluten",
  },
  {
    id: 6,
    name: "Greek Yogurt",
    price: 4.49,
    image: "/greek-yogurt-bowl.png",
    tags: ["High Protein", "Probiotic", "Low Sugar"],
    suitable: false,
    warning: "Contains Dairy",
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState(PRODUCTS)
  const [filters, setFilters] = useState({
    suitableOnly: false,
    categories: {
      dairy: false,
      bakery: false,
      produce: false,
      pantry: false,
    },
    dietary: {
      vegan: false,
      glutenFree: false,
      lowSugar: false,
      organic: false,
    },
  })
  const [cart, setCart] = useState<number[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    filterProducts()
  }

  const filterProducts = () => {
    let filtered = PRODUCTS

    // Apply search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply suitable only filter
    if (filters.suitableOnly) {
      filtered = filtered.filter((product) => product.suitable)
    }

    // Apply dietary filters
    const activeDietaryFilters = Object.entries(filters.dietary).filter(([_, value]) => value)
    if (activeDietaryFilters.length > 0) {
      filtered = filtered.filter((product) =>
        activeDietaryFilters.some(([key]) => {
          const tag =
            key === "glutenFree"
              ? "Gluten-Free"
              : key === "lowSugar"
                ? "Low Sugar"
                : key === "vegan"
                  ? "Vegan"
                  : "Organic"
          return product.tags.includes(tag)
        }),
      )
    }

    setProducts(filtered)
  }

  const handleFilterChange = (category: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [value]: !prev[category as keyof typeof prev][value as any],
      },
    }))
  }

  const toggleSuitableOnly = () => {
    setFilters((prev) => ({
      ...prev,
      suitableOnly: !prev.suitableOnly,
    }))
  }

  const toggleCartItem = (productId: number) => {
    setCart((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20">
      <header className="py-4">
        <h1 className="text-2xl font-bold">Store Products</h1>
        <p className="text-muted-foreground mt-1">Browse available products at this store</p>
      </header>

      <div className="flex gap-2 mt-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[340px]">
            <SheetHeader>
              <SheetTitle>Filter Products</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox id="suitable-only" checked={filters.suitableOnly} onCheckedChange={toggleSuitableOnly} />
                <Label htmlFor="suitable-only">Show only suitable products</Label>
              </div>

              <Separator className="my-4" />

              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="category-dairy"
                    checked={filters.categories.dairy}
                    onCheckedChange={() => handleFilterChange("categories", "dairy")}
                  />
                  <Label htmlFor="category-dairy">Dairy & Alternatives</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="category-bakery"
                    checked={filters.categories.bakery}
                    onCheckedChange={() => handleFilterChange("categories", "bakery")}
                  />
                  <Label htmlFor="category-bakery">Bakery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="category-produce"
                    checked={filters.categories.produce}
                    onCheckedChange={() => handleFilterChange("categories", "produce")}
                  />
                  <Label htmlFor="category-produce">Produce</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="category-pantry"
                    checked={filters.categories.pantry}
                    onCheckedChange={() => handleFilterChange("categories", "pantry")}
                  />
                  <Label htmlFor="category-pantry">Pantry</Label>
                </div>
              </div>

              <Separator className="my-4" />

              <h3 className="font-medium mb-2">Dietary Preferences</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dietary-vegan"
                    checked={filters.dietary.vegan}
                    onCheckedChange={() => handleFilterChange("dietary", "vegan")}
                  />
                  <Label htmlFor="dietary-vegan">Vegan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dietary-glutenFree"
                    checked={filters.dietary.glutenFree}
                    onCheckedChange={() => handleFilterChange("dietary", "glutenFree")}
                  />
                  <Label htmlFor="dietary-glutenFree">Gluten-Free</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dietary-lowSugar"
                    checked={filters.dietary.lowSugar}
                    onCheckedChange={() => handleFilterChange("dietary", "lowSugar")}
                  />
                  <Label htmlFor="dietary-lowSugar">Low Sugar</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dietary-organic"
                    checked={filters.dietary.organic}
                    onCheckedChange={() => handleFilterChange("dietary", "organic")}
                  />
                  <Label htmlFor="dietary-organic">Organic</Label>
                </div>
              </div>

              <Button className="w-full mt-6" onClick={filterProducts}>
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-6">
        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product.id} className={product.suitable ? "" : "border-red-200"}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    {!product.suitable && (
                      <Badge variant="destructive" className="absolute -top-2 -right-2">
                        Warning
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-primary font-bold">${product.price}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className={`text-xs ${
                            tag.includes("Free") || tag.includes("Low") || tag === "Vegan" || tag === "Organic"
                              ? "dietary-tag-green"
                              : ""
                          }`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {!product.suitable && <p className="text-xs text-red-500 mt-1">{product.warning}</p>}
                  </div>
                  <Button
                    variant={cart.includes(product.id) ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toggleCartItem(product.id)}
                    aria-label={cart.includes(product.id) ? "Remove from shopping list" : "Add to shopping list"}
                  >
                    {cart.includes(product.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {products.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No products match your search criteria. Try adjusting your filters.
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
