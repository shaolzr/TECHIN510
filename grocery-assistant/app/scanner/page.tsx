"use client"

import { useState } from "react"
import { Camera, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"

// Mock detected products
const DETECTED_PRODUCTS = [
  {
    id: 1,
    name: "Organic Almond Milk",
    price: 4.99,
    image: "/almond-milk-pouring.png",
    tags: ["Dairy-Free", "Vegan", "Low Sugar"],
    suitable: true,
    position: { top: "15%", left: "20%", width: "25%", height: "30%" },
  },
  {
    id: 2,
    name: "Whole Wheat Bread",
    price: 3.49,
    image: "/placeholder.svg?height=80&width=80&query=whole+wheat+bread",
    tags: ["Whole Grain", "High Fiber"],
    suitable: false,
    warning: "Contains Gluten",
    position: { top: "50%", left: "60%", width: "30%", height: "25%" },
  },
  {
    id: 3,
    name: "Organic Bananas",
    price: 1.99,
    image: "/placeholder.svg?height=80&width=80&query=bananas",
    tags: ["Fresh", "Organic", "Low GI"],
    suitable: true,
    position: { top: "60%", left: "10%", width: "20%", height: "20%" },
  },
]

export default function ScannerPage() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof DETECTED_PRODUCTS)[0] | null>(null)

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Product Scanner</h1>
        <Button variant="ghost" size="sm">
          <Camera className="h-5 w-5 mr-1" />
          Switch Camera
        </Button>
      </header>

      <div className="flex-1 relative">
        {/* Camera feed placeholder */}
        <div className="bg-gray-900 w-full h-[70vh] flex items-center justify-center relative">
          <div className="text-white text-center">
            <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="opacity-70">Camera feed would appear here</p>
            <p className="text-xs opacity-50 mt-1">Point your camera at products to scan</p>
          </div>

          {/* Product detection overlays */}
          <div className="camera-overlay">
            {DETECTED_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className={`product-highlight ${
                  product.suitable ? "product-highlight-suitable" : "product-highlight-unsuitable"
                }`}
                style={{
                  top: product.position.top,
                  left: product.position.left,
                  width: product.position.width,
                  height: product.position.height,
                }}
                onClick={() => setSelectedProduct(product)}
              >
                <div
                  className={`product-highlight-tag ${
                    product.suitable ? "product-highlight-tag-suitable" : "product-highlight-tag-unsuitable"
                  }`}
                >
                  {product.suitable ? "Suitable" : "Contains Allergen"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scanning instructions */}
        <Card className="mx-4 -mt-6 relative z-10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Scanning for Products</h3>
                <p className="text-sm text-muted-foreground">Tap on highlighted items to see details</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Help</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>How to Use the Scanner</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-sm">
                    <p>
                      Point your camera at grocery products to scan them. The app will analyze products in real-time and
                      highlight them on screen.
                    </p>
                    <p>
                      <span className="font-medium text-green-600">Green highlights</span> indicate products that match
                      your dietary preferences.
                    </p>
                    <p>
                      <span className="font-medium text-red-600">Red highlights</span> indicate products that contain
                      ingredients you should avoid.
                    </p>
                    <p>Tap on any highlighted product to see detailed information.</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product detail modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">{selectedProduct.name}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setSelectedProduct(null)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <p className="text-primary font-bold">${selectedProduct.price}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedProduct.tags.map((tag) => (
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
                  {!selectedProduct.suitable && <p className="text-xs text-red-500 mt-2">{selectedProduct.warning}</p>}
                </div>
              </div>
              <div className="mt-4">
                <Button className="w-full">Add to Shopping List</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
