"use client"

import { Topbar } from "@/components/topbar"

export default function AboutPage() {
  return (
    <main>
      <Topbar />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-balance">About EasyBudget</h1>
        <p className="mt-3 text-muted-foreground">
          EasyBudget helps you understand spending patterns and avoid overspending with simple, privacy-first tracking.
        </p>
        <p className="mt-3 text-muted-foreground">
          We’re designed for everyone, including those with irregular income. Whether you&apos;re a gig worker, an
          informal sector employee, or anyone whose finances don&apos;t fit a monthly paycheck, EasyBudget gives clear
          guidance on budgets, saving, and smarter choices.
        </p>
        <ul className="mt-3 list-disc pl-5 text-muted-foreground">
          <li>Gig workers: get adaptive guidance that fits variable earnings.</li>
          <li>Informal sector employees: simple, category-based budgets without linking bank accounts.</li>
          <li>Irregular finances: roll over unused limits, save, invest, or set up FDs when you stay under budget.</li>
        </ul>
      </section>
    </main>
  )
}
