"use client"

import { Topbar } from "@/components/topbar"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      slug: "stay-under-food-budget",
      title: "How to Stay Under Your Food Budget",
      excerpt:
        "Practical habits and market hacks to keep your monthly food spending in check without sacrificing nutrition.",
      date: "2025-07-02",
    },
    {
      slug: "sms-tracking-privacy",
      title: "SMS Tracking with Privacy in Mind",
      excerpt:
        "How on-device parsing lets you categorize expenses without linking bank accounts or sharing credentials.",
      date: "2025-06-24",
    },
    {
      slug: "optimize-shopping-spend",
      title: "Optimize Your Shopping Spend",
      excerpt: "Use category limits, seasonal sales, and per-merchant insights to reduce impulsive buys.",
      date: "2025-05-15",
    },
    {
      slug: "smarter-travel-expenses",
      title: "Smarter Travel Expenses",
      excerpt:
        "Plan trips with fixed sub-limits for commute and leisure. Track rides, fuel, and tickets automatically.",
      date: "2025-04-10",
    },
    {
      slug: "gig-worker-cashflow",
      title: "Cashflow Guidance for Gig Workers",
      excerpt:
        "Irregular income? Learn buffers, sinking funds, and paycheck-to-paycheck survival tactics tailored for gig work.",
      date: "2025-03-21",
    },
  ]
  return (
    <main>
      <Topbar />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-balance">Blog</h1>
        <p className="mt-2 text-muted-foreground text-pretty">
          Insights from our AI-powered financial coaching agent: budgeting strategies, category limits, and how
          SMS-based auto-categorization protects your privacy. We also cover advice for gig workers, informal sector
          employees, and those with irregular finances.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <article key={p.slug} className="rounded-lg border bg-card p-4 transition-colors hover:bg-accent/10">
              <h2 className="text-lg font-medium">
                <Link href={`/blog/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-3 text-xs text-muted-foreground">{p.date}</div>
              <div className="mt-4">
                <Link
                  href={`/blog/${p.slug}`}
                  className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
