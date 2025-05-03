"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, MapPin, ShoppingCart, Camera, List } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  // Update the navItems array to reposition the Scanner to the middle
  const navItems = [
    {
      name: "Profile",
      href: "/",
      icon: User,
    },
    {
      name: "Stores",
      href: "/stores",
      icon: MapPin,
    },
    {
      name: "Scanner",
      href: "/scanner",
      icon: Camera,
    },
    {
      name: "Products",
      href: "/products",
      icon: List,
    },
    {
      name: "List",
      href: "/cart",
      icon: ShoppingCart,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 max-w-md mx-auto">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive ? "text-primary" : "text-gray-500",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
