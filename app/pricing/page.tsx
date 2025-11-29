"use client"

import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  return (
    <main>
      <Topbar />
      <section className="mx-auto max-w-5xl px-4 py-10 space-y-6">
        <h1 className="text-3xl font-semibold text-balance">Pricing</h1>
        <div className="grid gap-4 md:grid-cols-4">
          {/* existing code */}
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">3 categories, SMS simulation</p>
              <Button variant="secondary">Get started</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Custom categories, advanced alerts</p>
              <Button>Choose Pro</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Shared budgets, reporting</p>
              <Button>Contact sales</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Smart Savings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                If you haven’t reached your monthly limit in Food, Shopping, or Travel, roll over the remaining amount:
              </p>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                <li>Save it for next month</li>
                <li>Invest it (SIP, index funds, etc.)</li>
                <li>Create a fixed deposit (FD)</li>
              </ul>
              <Button variant="secondary">Learn more</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
