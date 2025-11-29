export function formatCurrency(value: number, currency = "INR", locale = "en-IN") {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value)
  } catch {
    return `₹${value.toFixed(2)}`
  }
}

export function startOfMonth(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export function endOfMonth(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999)
}

export function isInCurrentMonth(dateISO: string) {
  const d = new Date(dateISO)
  return d >= startOfMonth() && d <= endOfMonth()
}

export function shortDate(dateISO: string) {
  return new Date(dateISO).toLocaleDateString()
}

export function formatMonthKey(monthKey: string, locale = "en-IN") {
  // Accepts keys like "2025-10" or "2025-10-01"; returns "October 2025"
  try {
    // Try to parse YYYY-MM
    const [y, m] = monthKey.split("-").map((p) => Number.parseInt(p, 10))
    if (!isNaN(y) && !isNaN(m)) {
      const d = new Date(y, Math.max(0, m - 1), 1)
      return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(d)
    }
    // Fallback: try Date parsing
    const d2 = new Date(monthKey)
    if (!isNaN(d2.getTime())) {
      return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(d2)
    }
  } catch {
    // ignore
  }
  return monthKey
}
