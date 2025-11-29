"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left column: text content */}
        <div className="mx-auto max-w-2xl">
          <AnimatedSection delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
              <span className="sr-only">Product highlight:</span>
              SMS-based spending tracker — no bank linking
            </div>
          </AnimatedSection>

          <AnimatedSection delay={80}>
            <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight sm:text-6xl">
              AI-powered financial coaching agent
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={140}>
            <p className="mt-5 text-pretty text-lg text-muted-foreground">
              Set monthly limits for Food, Shopping, and Travel. When we detect a transaction SMS, confirm the category
              and we'll handle the rest. Proactive alerts help you avoid overspending.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="mt-10 flex flex-col items-center justify-start gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-lg">
                <Link href="/sign-in">Get started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-lg bg-transparent">
                <Link href="/about">Learn more</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>

        {/* Right column: hero image */}
        <AnimatedSection delay={260}>
          <div className="relative hidden lg:block">
            <Image
              src="/images/financial-journey.png"
              alt="Financial journey illustration showing steps to supercharge your financial IQ"
              width={500}
              height={500}
              className="w-full h-auto"
              priority
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
