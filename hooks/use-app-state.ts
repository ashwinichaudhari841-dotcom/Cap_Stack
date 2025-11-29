"use client"

import useSWR from "swr"
import type { AppState, CategoryKey, Transaction, User } from "@/lib/types"
import { isInCurrentMonth } from "@/lib/format"

const STORAGE_KEY = "easybudget-app-state-v1"
const LEGACY_KEYS = ["fincoach-app-state-v1"]

const defaultState: AppState = {
  user: null,
  profile: {},
  categories: {
    food: { limit: 0 },
    shopping: { limit: 0 },
    travel: { limit: 0 },
  },
  transactions: [],
  pending: null,
  notifications: [],
  savings: [],
  version: 1,
}

function read(): AppState {
  if (typeof window === "undefined") return defaultState
  // Try new key first
  let raw = localStorage.getItem(STORAGE_KEY)
  // Fallback to any legacy key for seamless migration
  if (!raw) {
    for (const k of LEGACY_KEYS) {
      const v = localStorage.getItem(k)
      if (v) {
        raw = v
        try {
          // Write forward to new key to complete migration
          localStorage.setItem(STORAGE_KEY, v)
        } catch {}
        break
      }
    }
  }
  if (!raw) return defaultState
  try {
    const parsed = JSON.parse(raw) as AppState
    return { ...defaultState, ...parsed }
  } catch {
    return defaultState
  }
}

function write(state: AppState) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function useAppState() {
  const { data, mutate } = useSWR<AppState>(STORAGE_KEY, async () => read(), {
    fallbackData: defaultState,
  })

  const state = data ?? defaultState

  const save = (next: AppState) => {
    write(next)
    mutate(next, false)
  }

  const signUp = (email: string, _password: string) => {
    const user: User = { id: `u_${Date.now()}`, email }
    save({ ...state, user })
  }

  const signIn = (email: string, _password: string) => {
    const user: User = {
      id: state.user?.id ?? `u_${Date.now()}`,
      email,
      name: state.user?.name,
      phone: state.user?.phone,
    }
    save({ ...state, user })
  }

  const signOut = () => {
    save({ ...state, user: null })
  }

  const setProfile = (
    profile: Partial<{ name: string; phone: string; salary: number; address: string; language: string }>,
  ) => {
    const user = state.user
      ? {
          ...state.user,
          name: profile.name ?? state.user.name,
          phone: profile.phone ?? state.user.phone,
        }
      : null
    save({
      ...state,
      user,
      profile: {
        ...state.profile,
        salary: profile.salary ?? state.profile.salary,
        address: profile.address ?? state.profile.address,
        language: profile.language ?? state.profile.language,
      },
    })
  }

  const setLimit = (category: CategoryKey, limit: number) => {
    save({
      ...state,
      categories: {
        ...state.categories,
        [category]: { limit: Math.max(0, Math.round(limit * 100) / 100) },
      },
    })
  }

  const addTransaction = (tx: Transaction) => {
    const updated = { ...state, transactions: [tx, ...state.transactions], pending: null }
    const alerts = computeAlerts(updated)
    updated.notifications = [...alerts, ...updated.notifications].slice(0, 100)
    save(updated)
  }

  const setPending = (tx: Transaction | null) => {
    save({ ...state, pending: tx })
  }

  const resolvePending = (category: CategoryKey) => {
    if (!state.pending) return
    const committed: Transaction = { ...state.pending, id: `tx_${Date.now()}`, category }
    addTransaction(committed)
  }

  function currentMonthKey(date = new Date()) {
    const y = date.getFullYear()
    const m = `${date.getMonth() + 1}`.padStart(2, "0")
    return `${y}-${m}`
  }

  const monthlySpend = (category: CategoryKey) =>
    state.transactions
      .filter((t) => t.category === category && isInCurrentMonth(t.dateISO))
      .reduce((sum, t) => sum + t.amount, 0)

  const totalMonthlySpend = () => {
    return (["food", "shopping", "travel"] as CategoryKey[]).reduce((sum, c) => sum + monthlySpend(c), 0)
  }

  const potentialSavingsThisMonth = () => {
    return (["food", "shopping", "travel"] as CategoryKey[]).reduce((acc, c) => {
      const limit = state.categories[c].limit || 0
      const spent = monthlySpend(c)
      const remaining = Math.max(0, limit - spent)
      return acc + remaining
    }, 0)
  }

  const setManualSaving = (month: string, amount: number) => {
    const a = Math.max(0, Math.round(amount * 100) / 100)
    const idx = state.savings.findIndex((s) => s.month === month)
    let savings = [...state.savings]
    if (idx >= 0) {
      savings[idx] = { ...savings[idx], amount: a }
    } else {
      savings = [{ month, amount: a }, ...savings]
    }
    save({ ...state, savings })
  }

  const manualSavingForMonth = (month: string) => {
    return state.savings.find((s) => s.month === month)?.amount ?? 0
  }

  const computeAlerts = (s: AppState) => {
    const notes: AppState["notifications"] = []
    ;(["food", "shopping", "travel"] as CategoryKey[]).forEach((c) => {
      const limit = s.categories[c].limit
      if (limit <= 0) return
      const spent = s.transactions
        .filter((t) => t.category === c && isInCurrentMonth(t.dateISO))
        .reduce((sum, t) => sum + t.amount, 0)
      if (spent >= limit) {
        notes.push({
          id: `n_${c}_${Date.now()}`,
          type: "limit-reached",
          category: c,
          message: `Limit reached for ${c}. Spent ${spent.toFixed(2)} of ${limit.toFixed(2)}.`,
          createdAt: new Date().toISOString(),
        })
      } else if (spent >= limit * 0.8) {
        notes.push({
          id: `n_${c}_${Date.now()}`,
          type: "limit-warning",
          category: c,
          message: `Approaching limit for ${c}. Spent ${spent.toFixed(2)} of ${limit.toFixed(2)}.`,
          createdAt: new Date().toISOString(),
        })
      }
    })
    return notes
  }

  const clearAllData = () => {
    save({
      user: state.user,
      profile: {},
      categories: {
        food: { limit: 0 },
        shopping: { limit: 0 },
        travel: { limit: 0 },
      },
      transactions: [],
      pending: null,
      notifications: [],
      savings: [],
      version: 1,
    })
  }

  return {
    state,
    actions: {
      signUp,
      signIn,
      signOut,
      setProfile,
      setLimit,
      addTransaction,
      setPending,
      resolvePending,
      setManualSaving,
      clearAllData, // Export new clear action
    },
    selectors: {
      monthlySpend,
      totalMonthlySpend,
      potentialSavingsThisMonth,
      manualSavingForMonth,
      currentMonthKey,
    },
  }
}
