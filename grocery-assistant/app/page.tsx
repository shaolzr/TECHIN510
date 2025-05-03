"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Leaf, Apple, Wheat, Egg, Milk, Fish, Nut, Cookie, User } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

export default function ProfilePage() {
  const [preferences, setPreferences] = useState({
    diabetic: false,
    glutenFree: false,
    vegan: false,
    vegetarian: false,
  })

  const [allergies, setAllergies] = useState({
    nuts: false,
    dairy: false,
    eggs: false,
    seafood: false,
    soy: false,
  })

  const handlePreferenceChange = (preference: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }))
  }

  const handleAllergyChange = (allergy: keyof typeof allergies) => {
    setAllergies((prev) => ({
      ...prev,
      [allergy]: !prev[allergy],
    }))
  }

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20">
      <header className="text-center py-6">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
          <User className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your dietary preferences</p>
      </header>

      <Tabs defaultValue="preferences" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preferences">Dietary Preferences</TabsTrigger>
          <TabsTrigger value="allergies">Allergies</TabsTrigger>
        </TabsList>
        <TabsContent value="preferences" className="mt-4 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Apple className="h-5 w-5 text-primary" />
                    <Label htmlFor="diabetic">Diabetic-Friendly</Label>
                  </div>
                  <Switch
                    id="diabetic"
                    checked={preferences.diabetic}
                    onCheckedChange={() => handlePreferenceChange("diabetic")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wheat className="h-5 w-5 text-primary" />
                    <Label htmlFor="glutenFree">Gluten-Free</Label>
                  </div>
                  <Switch
                    id="glutenFree"
                    checked={preferences.glutenFree}
                    onCheckedChange={() => handlePreferenceChange("glutenFree")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    <Label htmlFor="vegan">Vegan</Label>
                  </div>
                  <Switch
                    id="vegan"
                    checked={preferences.vegan}
                    onCheckedChange={() => handlePreferenceChange("vegan")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    <Label htmlFor="vegetarian">Vegetarian</Label>
                  </div>
                  <Switch
                    id="vegetarian"
                    checked={preferences.vegetarian}
                    onCheckedChange={() => handlePreferenceChange("vegetarian")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="allergies" className="mt-4 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Nut className="h-5 w-5 text-primary" />
                    <Label htmlFor="nuts">Tree Nuts & Peanuts</Label>
                  </div>
                  <Switch id="nuts" checked={allergies.nuts} onCheckedChange={() => handleAllergyChange("nuts")} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Milk className="h-5 w-5 text-primary" />
                    <Label htmlFor="dairy">Dairy</Label>
                  </div>
                  <Switch id="dairy" checked={allergies.dairy} onCheckedChange={() => handleAllergyChange("dairy")} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Egg className="h-5 w-5 text-primary" />
                    <Label htmlFor="eggs">Eggs</Label>
                  </div>
                  <Switch id="eggs" checked={allergies.eggs} onCheckedChange={() => handleAllergyChange("eggs")} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Fish className="h-5 w-5 text-primary" />
                    <Label htmlFor="seafood">Seafood</Label>
                  </div>
                  <Switch
                    id="seafood"
                    checked={allergies.seafood}
                    onCheckedChange={() => handleAllergyChange("seafood")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cookie className="h-5 w-5 text-primary" />
                    <Label htmlFor="soy">Soy</Label>
                  </div>
                  <Switch id="soy" checked={allergies.soy} onCheckedChange={() => handleAllergyChange("soy")} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Your preferences help us find suitable products for you
        </p>
        <Link href="/stores" className="block">
          <Button className="w-full" size="lg">
            Find Stores
          </Button>
        </Link>
      </div>

      <BottomNav />
    </div>
  )
}
