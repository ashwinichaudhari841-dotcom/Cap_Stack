import type { CategoryKey, Transaction } from "./types"

const FOOD_KEYWORDS = [
  "uber eats",
  "swiggy",
  "zomato",
  "doordash",
  "restaurant",
  "cafe",
  "pizza",
  "burger",
  "kfc",
  "mcdonald",
  "starbucks",
]
const SHOPPING_KEYWORDS = [
  "amazon",
  "flipkart",
  "target",
  "walmart",
  "best buy",
  "mall",
  "store",
  "purchase",
  "order",
  "payment pos",
  "upay",
  "upi",
]
const TRAVEL_KEYWORDS = [
  "uber",
  "ola",
  "lyft",
  "airline",
  "airways",
  "indigo",
  "spicejet",
  "train",
  "railway",
  "metro",
  "fuel",
  "petrol",
  "gas",
]

export function extractAmount(message: string): number | null {
  // Handles: INR 1,234.56, Rs. 1234, $45.67, 1,234.00 INR, etc.
  const patterns = [
    /(?:INR|Rs\.?|₹|\$)\s*([0-9]{1,3}(?:[, ][0-9]{3})*(?:\.[0-9]{1,2})|[0-9]+(?:\.[0-9]{1,2})?)/i,
    /([0-9]{1,3}(?:[, ][0-9]{3})*(?:\.[0-9]{1,2})|[0-9]+(?:\.[0-9]{1,2})?)\s*(?:INR|Rs\.?|₹|\$)/i,
  ]
  for (const re of patterns) {
    const m = message.match(re)
    if (m?.[1]) {
      const normalized = m[1].replace(/[,\s]/g, "")
      const amt = Number.parseFloat(normalized)
      if (!Number.isNaN(amt)) return amt
    }
  }
  // Fallback: first decimal number in text
  const fallback = message.match(/([0-9]+(?:\.[0-9]{1,2})?)/)
  if (fallback?.[1]) {
    const amt = Number.parseFloat(fallback[1])
    if (!Number.isNaN(amt)) return amt
  }
  return null
}

export function extractMerchant(message: string): string | undefined {
  // Try "at MERCHANT", "spent at MERCHANT", "POS MERCHANT"
  const at = message.match(/(?:at|AT)\s+([A-Za-z0-9&\-.' ]{2,30})/)
  if (at?.[1]) return at[1].trim()

  const pos = message.match(/POS\s+([A-Za-z0-9&\-.' ]{2,30})/i)
  if (pos?.[1]) return pos[1].trim()

  // fallback: any ALLCAPS token of length 3+
  const caps = message.match(/\b([A-Z][A-Z0-9&-]{2,})\b/)
  if (caps?.[1]) return caps[1].trim()

  return undefined
}

export function suggestCategory(message: string, merchant?: string): CategoryKey | undefined {
  const text = `${message} ${merchant ?? ""}`.toLowerCase()

  const score = (keys: string[]) => keys.reduce((s, k) => (text.includes(k) ? s + 1 : s), 0)

  const f = score(FOOD_KEYWORDS)
  const s = score(SHOPPING_KEYWORDS)
  const t = score(TRAVEL_KEYWORDS)

  if (f === 0 && s === 0 && t === 0) return undefined

  if (f >= s && f >= t) return "food"
  if (s >= f && s >= t) return "shopping"
  return "travel"
}

export function createPendingFromMessage(message: string): Transaction | null {
  const amount = extractAmount(message)
  if (amount == null) return null
  const merchant = extractMerchant(message)
  return {
    id: `pending_${Date.now()}`,
    amount,
    merchant,
    dateISO: new Date().toISOString(),
    source: "sms",
    rawText: message,
  }
}
