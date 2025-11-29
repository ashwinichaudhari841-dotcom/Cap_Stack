"use client"

import { Topbar } from "@/components/topbar"

export default function ServicePage() {
  return (
    <main>
      <Topbar />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-balance">Our Service</h1>
        <p className="mt-3 text-muted-foreground">
          Track spending from SMS without linking bank accounts. Categorize transactions and stay within monthly limits.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2" aria-label="Service highlights">
          <li className="rounded-xl border bg-card p-4">
            <h2 className="text-xl font-medium">AI-powered categorization</h2>
            <p className="mt-1 text-muted-foreground">
              We parse transaction SMS and suggest the right category (Food, Shopping, Travel) instantly—no manual
              entry.
            </p>
          </li>
          <li className="rounded-xl border bg-card p-4">
            <h2 className="text-xl font-medium">Smart savings & FD options</h2>
            <p className="mt-1 text-muted-foreground">
              If you stay under your monthly limits, choose to save, invest, or roll leftovers into an FD right from the
              app.
            </p>
          </li>
        </ul>
      </section>
    </main>
  )
}
