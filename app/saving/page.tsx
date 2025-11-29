"use client"

import { Topbar } from "@/components/topbar"
import { useAppState } from "@/hooks/use-app-state"
import { formatMonthKey } from "@/lib/format"
import { useMemo, useEffect } from "react"

function formatINR(n: number) {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(n)
  } catch {
    return `₹${n.toFixed(2)}`
  }
}

export default function SavingPage() {
  const { state, actions, selectors } = useAppState()
  const month = selectors.currentMonthKey()

  const byCategory = useMemo(() => {
    return (["food", "shopping", "travel"] as const).map((c) => {
      const limit = state.categories[c].limit || 0
      const spent = selectors.monthlySpend(c)
      const remaining = Math.max(0, limit - spent)
      return { key: c, limit, spent, remaining }
    })
  }, [state.categories, selectors])

  const potential = selectors.potentialSavingsThisMonth()

  useEffect(() => {
    const current = selectors.manualSavingForMonth(month)
    if (Math.abs((current ?? 0) - potential) > 0.01) {
      actions.setManualSaving(month, potential)
    }
  }, [month, potential, actions, selectors])

  const records = useMemo(() => {
    return [...state.savings].sort((a, b) => b.month.localeCompare(a.month))
  }, [state.savings])

  const totalSaved = useMemo(() => {
    return records.reduce((sum, r) => sum + r.amount, 0)
  }, [records])

  const avgSaved = useMemo(() => {
    return records.length ? totalSaved / records.length : 0
  }, [records, totalSaved])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Topbar />
      <section className="mx-auto max-w-5xl px-4 py-6 relative">
        <div className="relative z-10">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-pretty">Savings</h1>
            <p className="text-muted-foreground">
              Your monthly savings are automatically recorded from the remaining amounts in Food, Shopping, and Travel.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {byCategory.map((row) => (
              <div key={row.key} className="rounded-lg border bg-stone-100 p-4">
                <h2 className="text-sm font-medium capitalize">{row.key}</h2>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Limit</span>
                    <span className="font-medium">{formatINR(row.limit)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Spent</span>
                    <span className="font-medium">{formatINR(row.spent)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className="font-medium">{formatINR(row.remaining)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border bg-stone-100 p-4">
            <h3 className="text-base font-semibold">Auto-recorded savings</h3>
            <p className="text-sm text-muted-foreground">Month: {formatMonthKey(month)}</p>
            <p className="mt-2 text-sm">
              This month's savings:{" "}
              <span className="font-medium">{formatINR(selectors.manualSavingForMonth(month))}</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              We sum the remaining amounts from each category that hasn't reached its limit and store it automatically.
            </p>
          </div>

          {records.length > 0 && (
            <div className="mt-6 rounded-lg border bg-stone-100 p-4">
              <h4 className="text-base font-semibold">Monthly savings record</h4>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-2 pr-3 font-medium">Month</th>
                      <th className="py-2 pr-3 font-medium text-right">Saved</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {records.map((r) => (
                      <tr key={r.month}>
                        <td className="py-2 pr-3">{formatMonthKey(r.month)}</td>
                        <td className="py-2 pr-3 text-right font-medium">{formatINR(r.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t">
                    <tr>
                      <td className="py-2 pr-3 font-semibold">Total</td>
                      <td className="py-2 pr-3 text-right font-semibold">{formatINR(totalSaved)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">Average</td>
                      <td className="py-2 pr-3 text-right font-semibold">{formatINR(avgSaved)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Savings are recorded automatically each month from remaining budgets across Food, Shopping, and Travel.
              </p>
            </div>
          )}

          {state.savings.length > 0 && (
            <div className="mt-6 rounded-lg border bg-stone-100 p-4">
              <h4 className="text-base font-semibold">Savings history</h4>
              <ul className="mt-2 divide-y">
                {state.savings.map((s) => (
                  <li key={s.month} className="flex items-center justify-between py-2 text-sm">
                    <span className="text-muted-foreground">{formatMonthKey(s.month)}</span>
                    <span className="font-medium">{formatINR(s.amount)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
