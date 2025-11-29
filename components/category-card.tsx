"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatCurrency } from "@/lib/format"
import type { CategoryKey } from "@/lib/types"
import { useAppState } from "@/hooks/use-app-state"

export function CategoryCard({
  category,
  title,
  currency = "INR", // switch default currency to INR so cards render rupee amounts by default
}: { category: CategoryKey; title: string; currency?: string }) {
  const { state, selectors } = useAppState()
  const limit = state.categories[category].limit
  const spent = selectors.monthlySpend(category)
  const pct = limit > 0 ? Math.min(100, Math.round((spent / limit) * 100)) : 0

  const tintVar =
    category === "food"
      ? "var(--color-tint-food)"
      : category === "shopping"
        ? "var(--color-tint-shopping)"
        : "var(--color-tint-travel)"

  return (
    <Card style={{ backgroundColor: tintVar }}>
      <CardHeader>
        <CardTitle className="text-pretty">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Monthly limit</span>
          <span className="text-foreground">{limit > 0 ? formatCurrency(limit, currency) : "Not set"}</span>
        </div>
        <Progress value={pct} aria-label="spend progress" />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Spent this month</span>
          <span className={spent >= limit && limit > 0 ? "text-destructive-foreground" : "text-foreground"}>
            {formatCurrency(spent, currency)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
