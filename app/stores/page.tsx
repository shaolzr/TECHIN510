"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, MapPin, Star, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"

// Mock store data
const STORES = [
  {
    id: 1,
    name: "Whole Foods Market",
    address: "123 Health St, Wellness City",
    distance: "0.8 miles",
    rating: 4.7,
    specialFeatures: ["Organic", "Vegan-Friendly"],
    image: "/whole-foods-logo.png",
  },
  {
    id: 2,
    name: "Green Grocer",
    address: "456 Nutrition Ave, Wellness City",
    distance: "1.2 miles",
    rating: 4.5,
    specialFeatures: ["Gluten-Free", "Local Produce"],
    image: "/generic-grocery-logo.png",
  },
  {
    id: 3,
    name: "Health Haven",
    address: "789 Vitamin Blvd, Wellness City",
    distance: "1.5 miles",
    rating: 4.3,
    specialFeatures: ["Diabetic-Friendly", "Allergen-Free Options"],
    image: "/placeholder.svg?key=vaq15",
  },
  {
    id: 4,
    name: "Fresh Market",
    address: "101 Produce Lane, Wellness City",
    distance: "2.0 miles",
    rating: 4.6,
    specialFeatures: ["Fresh Produce", "Organic"],
    image: "/placeholder.svg?key=vozjj",
  },
]

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [stores, setStores] = useState(STORES)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim() === "") {
      setStores(STORES)
    } else {
      const filtered = STORES.filter((store) => store.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setStores(filtered)
    }
  }

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20">
      <header className="py-4">
        <h1 className="text-2xl font-bold">Find a Store</h1>
        <p className="text-muted-foreground mt-1">Select a store to see products that match your dietary needs</p>
      </header>

      <form onSubmit={handleSearch} className="mt-4 flex gap-2">
        <Input
          placeholder="Search stores..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-medium mb-3">Nearby Stores</h2>
        <div className="space-y-4">
          {stores.map((store) => (
            <Card key={store.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <img
                        src={store.image || "/placeholder.svg"}
                        alt={store.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{store.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{store.address}</span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        <span>{store.rating}</span>
                        <span className="mx-2">•</span>
                        <span>{store.distance}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {store.specialFeatures.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="border-t">
                  <Link href={`/products?store=${store.id}`}>
                    <Button variant="ghost" className="w-full flex justify-between py-2 rounded-none">
                      <span>View Products</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
