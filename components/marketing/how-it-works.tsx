"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ListChecks, SmartphoneNfc } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const steps = [
  {
    title: "1) Receive SMS",
    icon: SmartphoneNfc,
    desc: "A transaction SMS arrives. We parse the merchant and amount automatically.",
  },
  {
    title: "2) Confirm category",
    icon: ListChecks,
    desc: "Choose Food, Shopping, or Travel from a quick popup to confirm.",
  },
  {
    title: "3) Track + alerts",
    icon: CheckCircle,
    desc: "We add it to your monthly totals and alert you as limits are approached.",
  },
]

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <AnimatedSection delay={0}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-semibold sm:text-3xl">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            Simple, fast, and designed to keep you mindful of every purchase.
          </p>
        </div>
      </AnimatedSection>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {steps.map((s, i) => (
          <AnimatedSection key={s.title} delay={i * 120}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col items-center gap-3 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-card">
                  <s.icon className="h-6 w-6 text-primary" aria-hidden />
                </div>
                <h3 className="text-base font-medium">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
