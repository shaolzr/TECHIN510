"use client"

import { useState } from "react"
import Link from "next/link"
import { Trash2, Check, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"

// Mock shopping list data
const INITIAL_SHOPPING_LIST = [
  {
    id: 1,
    name: "Organic Almond Milk",
    price: 4.99,
    image: "/almond-milk-pouring.png",
    tags: ["Dairy-Free", "Vegan"],
    quantity: 1,
    checked: false,
  },
  {
    id: 2,
    name: "Gluten-Free Bread",
    price: 5.49,
    image: "/placeholder.svg?key=tt3ni",
    tags: ["Gluten-Free", "Vegan"],
    quantity: 2,
    checked: false,
  },
  {
    id: 3,
    name: "Sugar-Free Dark Chocolate",
    price: 3.99,
    image: "/placeholder.svg?key=a1w57",
    tags: ["No Added Sugar", "Vegan"],
    quantity: 1,
    checked: true,
  },
  {
    id: 4,
    name: "Organic Mixed Berries",
    price: 6.99,
    image: "/placeholder.svg?key=ro69s",
    tags: ["Low GI", "Organic"],
    quantity: 1,
    checked: false,
  },
]

export default function CartPage() {
  const [shoppingList, setShoppingList] = useState(INITIAL_SHOPPING_LIST)

  const toggleChecked = (id: number) => {
    setShoppingList((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const removeItem = (id: number) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCheckedItems = () => {
    setShoppingList((prev) => prev.filter((item) => !item.checked))
  }

  const checkedCount = shoppingList.filter((item) => item.checked).length
  const totalItems = shoppingList.length

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20">
      <header className="py-4">
        <h1 className="text-2xl font-bold">Shopping List</h1>
        <div className="flex items-center justify-between mt-1">
          <p className="text-muted-foreground">
            {checkedCount} of {totalItems} items purchased
          </p>
          {checkedCount > 0 && (
            <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={clearCheckedItems}>
              Clear purchased items
            </Button>
          )}
        </div>
      </header>

      {shoppingList.length > 0 ? (
        <div className="space-y-4">
          {shoppingList.map((item) => (
            <Card key={item.id} className={item.checked ? "bg-muted/30" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant={item.checked ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={() => toggleChecked(item.id)}
                    aria-label={item.checked ? "Mark as not purchased" : "Mark as purchased"}
                  >
                    {item.checked && <Check className="h-4 w-4" />}
                  </Button>
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className={`w-16 h-16 object-cover rounded-md ${item.checked ? "opacity-60" : ""}`}
                    />
                    {item.quantity > 1 && (
                      <Badge className="absolute -top-2 -right-2 bg-primary">x{item.quantity}</Badge>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${item.checked ? "line-through text-muted-foreground" : ""}`}>
                      {item.name}
                    </h3>
                    <p className="text-primary font-bold">${item.price}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Check items as you purchase them in the store</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">Your shopping list is empty</h2>
          <p className="text-muted-foreground mb-6">Add products from the store to create your shopping list</p>
          <Link href="/products">
            <Button>
              Browse Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
