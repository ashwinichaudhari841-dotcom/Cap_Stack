"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Topbar } from "@/components/topbar"
import { CategoryCard } from "@/components/category-card"
import { PendingTransactionDialog } from "@/components/pending-transaction-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useAppState } from "@/hooks/use-app-state"
import { formatCurrency, isInCurrentMonth, shortDate } from "@/lib/format"
import type { Transaction } from "@/lib/types"

export default function DashboardPage() {
  const { state, actions } = useAppState()
  const router = useRouter()
  const [smsText, setSmsText] = useState("Your a/c XXXX debited by INR 1,245.50 at ZOMATO on 12-Oct. Avl bal...")
  const recent = useMemo(
    () => state.transactions.filter((t) => isInCurrentMonth(t.dateISO)).slice(0, 8),
    [state.transactions],
  )

  useEffect(() => {
    if (!state.user) router.replace("/sign-in")
  }, [state.user, router])

  const triggerParse = async () => {
    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: smsText }),
      })
      const data = await res.json()
      if (data?.pending) {
        actions.setPending(data.pending)
      }
    } catch (e) {
      console.log("[v0] sms parse error", e)
    }
  }

  const handleClearAllData = () => {
    if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      actions.clearAllData()
      setSmsText("Your a/c XXXX debited by INR 1,245.50 at ZOMATO on 12-Oct. Avl bal...")
    }
  }

  const notifications = state.notifications.slice(0, 3)

  return (
    <main>
      <Topbar />
      <div className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={handleClearAllData}
            className="text-destructive hover:text-destructive bg-transparent"
          >
            Clear All Data
          </Button>
        </div>

        {notifications.length > 0 && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>Stay within your monthly limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {notifications.map((n) => (
                <div key={n.id} className="text-sm">
                  <span className="font-medium capitalize">{n.category}</span>: {n.message}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <section className="grid gap-4 md:grid-cols-3">
          <CategoryCard category="food" title="Food" />
          <CategoryCard category="shopping" title="Shopping" />
          <CategoryCard category="travel" title="Travel" />
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card style={{ backgroundColor: "var(--color-tint-grey)" }}>
            <CardHeader>
              <CardTitle>Recent transactions</CardTitle>
              <CardDescription>Current month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recent.length === 0 && <p className="text-sm text-muted-foreground">No transactions yet.</p>}
              {recent.map((t: Transaction) => (
                <div key={t.id} className="flex items-center justify-between rounded-md border p-2">
                  <div className="flex flex-col">
                    <span className="text-sm">{t.merchant ?? "Merchant"}</span>
                    <span className="text-xs text-muted-foreground">
                      {shortDate(t.dateISO)} • {t.category}
                    </span>
                  </div>
                  <div className={t.category ? "text-foreground" : "text-muted-foreground"}>
                    {formatCurrency(t.amount)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: "var(--color-tint-shopping)" }}>
            <CardHeader>
              <CardTitle>SMS simulator</CardTitle>
              <CardDescription>Paste a transaction SMS to simulate backend tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea value={smsText} onChange={(e) => setSmsText(e.target.value)} rows={5} />
              <Button onClick={triggerParse}>Parse SMS</Button>
              <p className="text-xs text-muted-foreground">
                The backend parses amount and merchant, then the app asks you to pick a category. No bank connections
                required.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>

      <PendingTransactionDialog />
    </main>
  )
}
