"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, User, ShoppingBag, Heart, Settings, Filter, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Mock product data
const PRODUCTS = [
  {
    id: 1,
    name: "Organic Fresh Milk",
    price: 4.99,
    image: "/placeholder.svg?height=80&width=80",
    tags: ["Organic", "Low-fat"],
    match: 95,
    category: "Dairy",
    brand: "Organic Valley",
  },
  {
    id: 2,
    name: "Whole Wheat Bread",
    price: 3.5,
    image: "/placeholder.svg?height=80&width=80",
    tags: ["Whole grain", "Low sugar"],
    match: 90,
    category: "Bakery",
    brand: "Nature's Own",
  },
  {
    id: 3,
    name: "Fresh Vegetable Salad",
    price: 5.25,
    image: "/placeholder.svg?height=80&width=80",
    tags: ["Organic", "Vegetarian"],
    match: 85,
    category: "Produce",
    brand: "Fresh Express",
  },
  {
    id: 4,
    name: "Low-fat Yogurt",
    price: 2.99,
    image: "/placeholder.svg?height=80&width=80",
    tags: ["Low-fat", "Low sugar"],
    match: 80,
    category: "Dairy",
    brand: "Chobani",
  },
  {
    id: 5,
    name: "Organic Apples",
    price: 3.99,
    image: "/placeholder.svg?height=80&width=80",
    tags: ["Organic", "Fresh"],
    match: 88,
    category: "Produce",
    brand: "Earthbound Farm",
  },
  {
    id: 6,
    name: "Gluten-Free Pasta",
    price: 4.5,
    image: "/placeholder.svg?height=80&width=80",
    tags: ["Gluten-free", "Vegan"],
    match: 75,
    category: "Pantry",
    brand: "Barilla",
  },
]

// Extract unique categories and brands
const categories = [...new Set(PRODUCTS.map((product) => product.category))]
const brands = [...new Set(PRODUCTS.map((product) => product.brand))]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState(PRODUCTS)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const handleSearch = (e) => {
    e.preventDefault()
    applyFilters(searchQuery, selectedCategories, selectedBrands)
  }

  const applyFilters = (query: string, categories: string[], brands: string[]) => {
    let filtered = PRODUCTS

    // Apply search query filter
    if (query.trim() !== "") {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
    }

    // Apply category filter
    if (categories.length > 0) {
      filtered = filtered.filter((product) => categories.includes(product.category))
    }

    // Apply brand filter
    if (brands.length > 0) {
      filtered = filtered.filter((product) => brands.includes(product.brand))
    }

    setProducts(filtered)
  }

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    setSelectedCategories(updatedCategories)
    applyFilters(searchQuery, updatedCategories, selectedBrands)
  }

  const handleBrandChange = (brand: string) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand]

    setSelectedBrands(updatedBrands)
    applyFilters(searchQuery, selectedCategories, updatedBrands)
  }

  return (
    <div className="flex min-h-screen flex-col max-w-md mx-auto">
      <header className="border-b p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Smart Shopping</h1>
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="mt-4 flex gap-2">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>

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
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`category-${category}`}>{category}</Label>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <h3 className="font-medium mb-2">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                      />
                      <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </form>

        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Category <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Brand <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              {brands.map((brand) => (
                <DropdownMenuCheckboxItem
                  key={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => handleBrandChange(brand)}
                >
                  {brand}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Recommended for You</h2>
          <div className="space-y-4">
            {products.length > 0 ? (
              products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <Badge className="absolute -top-2 -right-2 bg-primary">{product.match}% Match</Badge>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-primary font-bold">${product.price}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {product.brand} • {product.category}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No products match your filters. Try adjusting your criteria.
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t">
        <div className="grid grid-cols-3 h-16">
          <Link href="/dashboard" className="flex flex-col items-center justify-center text-primary">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs mt-1">Products</span>
          </Link>
          <Link href="/favorites" className="flex flex-col items-center justify-center text-muted-foreground">
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
