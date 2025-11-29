"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useAppState } from "@/hooks/use-app-state"
import { formatCurrency, shortDate } from "@/lib/format"

export function PendingTransactionDialog() {
  const { state, actions } = useAppState()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(Boolean(state.pending))
  }, [state.pending])

  if (!state.pending) return null
  const tx = state.pending

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm transaction</DialogTitle>
          <DialogDescription>
            We detected a new transaction from your SMS. Please choose a category to save it.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-medium">{formatCurrency(tx.amount)}</span>
          </div>
          {tx.merchant && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Merchant</span>
              <Badge variant="outline">{tx.merchant}</Badge>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span>{shortDate(tx.dateISO)}</span>
          </div>
          {tx.rawText && <p className="mt-2 rounded-md bg-muted p-2 text-xs text-muted-foreground">{tx.rawText}</p>}
        </div>
        <DialogFooter>
          <div className="flex flex-col gap-2 w-full">
            <Button className="w-full" onClick={() => actions.resolvePending("food")}>
              Food
            </Button>
            <Button className="w-full" variant="secondary" onClick={() => actions.resolvePending("shopping")}>
              Shopping
            </Button>
            <Button
              className="w-full bg-transparent"
              variant="outline"
              onClick={() => actions.resolvePending("travel")}
            >
              Travel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
