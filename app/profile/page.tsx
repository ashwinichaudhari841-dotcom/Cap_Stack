"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAppState } from "@/hooks/use-app-state"

export default function ProfilePage() {
  const { state, actions } = useAppState()
  const router = useRouter()
  const [name, setName] = useState(state.user?.name ?? "")
  const [phone, setPhone] = useState(state.user?.phone ?? "")
  const [salary, setSalary] = useState(state.profile.salary ?? 0)
  const [foodLimit, setFoodLimit] = useState(state.categories.food.limit)
  const [shoppingLimit, setShoppingLimit] = useState(state.categories.shopping.limit)
  const [travelLimit, setTravelLimit] = useState(state.categories.travel.limit)
  const [address, setAddress] = useState(state.profile.address ?? "")
  const [language, setLanguage] = useState(state.profile.language ?? "en")

  return (
    <main>
      <Topbar />
      <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your profile</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="enter your name " />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+ 91 Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street, City, State"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred language</Label>
              <select
                id="language"
                className="h-10 rounded-md border bg-background px-3 text-sm"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Preferred language"
              >
                <option value="en">English (EN)</option>
                <option value="hi">Hindi (HI)</option>
                <option value="mr">Marathi (MR)</option>
                <option value="ta">Tamil (TA)</option>
                <option value="te">Telugu (TE)</option>
                <option value="bn">Bengali (BN)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Monthly salary</Label>
              <Input
                id="salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number.parseFloat(e.target.value || "0"))}
              />
            </div>
            <div className="flex items-end">
              <Button
                className="w-full"
                onClick={() => {
                  actions.setProfile({ name, phone, salary, address, language })
                }}
              >
                Save profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly limits</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="food">Food</Label>
              <Input
                id="food"
                type="number"
                value={foodLimit}
                onChange={(e) => setFoodLimit(Number.parseFloat(e.target.value || "0"))}
              />
              <Button variant="secondary" onClick={() => actions.setLimit("food", foodLimit)}>
                Set limit
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopping">Shopping</Label>
              <Input
                id="shopping"
                type="number"
                value={shoppingLimit}
                onChange={(e) => setShoppingLimit(Number.parseFloat(e.target.value || "0"))}
              />
              <Button variant="secondary" onClick={() => actions.setLimit("shopping", shoppingLimit)}>
                Set limit
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="travel">Travel</Label>
              <Input
                id="travel"
                type="number"
                value={travelLimit}
                onChange={(e) => setTravelLimit(Number.parseFloat(e.target.value || "0"))}
              />
              <Button variant="secondary" onClick={() => actions.setLimit("travel", travelLimit)}>
                Set limit
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={() => router.push("/dashboard")}>Go to dashboard</Button>
        </div>
      </div>
    </main>
  )
}
