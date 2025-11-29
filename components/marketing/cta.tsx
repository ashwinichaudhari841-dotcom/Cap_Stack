"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <AnimatedSection delay={0}>
        <div className="rounded-lg border bg-card p-6 text-center sm:p-10">
          <h2 className="text-balance text-2xl font-semibold sm:text-3xl">Start tracking smarter today</h2>
          <p className="mt-2 text-muted-foreground">
            Set your category limits in minutes, confirm SMS transactions, and stay within budget.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild>
              <Link href="/sign-in">Create your account</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/dashboard">Preview the dashboard</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
