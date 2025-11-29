export type CategoryKey = "food" | "shopping" | "travel"

export interface User {
  id: string
  email: string
  name?: string
  phone?: string
}

export interface Profile {
  salary?: number
  address?: string
  language?: string // added
}

export interface CategoryLimit {
  limit: number // monthly limit in the user's currency
}

export interface Transaction {
  id: string
  amount: number
  merchant?: string
  dateISO: string
  category?: CategoryKey
  source: "sms" | "manual"
  rawText?: string
}

export interface NotificationItem {
  id: string
  type: "limit-warning" | "limit-reached"
  category: CategoryKey
  message: string
  createdAt: string
}

export interface SavingEntry {
  month: string // "YYYY-MM"
  amount: number // manual saved amount in INR for the month
}

export interface AppState {
  user: User | null
  profile: Profile
  categories: Record<CategoryKey, CategoryLimit>
  transactions: Transaction[]
  pending?: Transaction | null
  notifications: NotificationItem[]
  savings: SavingEntry[] // added
  version: number
}
