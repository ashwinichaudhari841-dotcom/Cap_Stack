"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, MessageSquare, PieChart, Shield } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const features = [
  {
    title: "Automatic SMS parsing",
    icon: MessageSquare,
    description:
      "We extract merchant and amount from your transaction SMS using robust parsing, so you don't enter data manually.",
    color: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    title: "Monthly category limits",
    icon: PieChart,
    description:
      "Set limits for Food, Shopping, and Travel. Track progress with clear visuals and stay in control each month.",
    color: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    title: "Real-time alerts",
    icon: Bell,
    description: "Get notified as you approach or exceed a limit. Make better, timely decisions about your spending.",
    color: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    title: "Privacy-first",
    icon: Shield,
    description:
      "No bank connections required. Your data stays on your device in this demo for a safer, simpler experience.",
    color: "bg-purple-50 dark:bg-purple-950/30",
  },
]

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <AnimatedSection delay={0}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold sm:text-4xl">Everything you need to stay on budget</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Powerful features, clear visuals, and alerts that help you avoid overspending.
          </p>
        </div>
      </AnimatedSection>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <AnimatedSection key={f.title} delay={i * 100}>
            <Card className="card-elevated group h-full">
              <CardHeader>
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-lg ${f.color} transition-transform group-hover:scale-110`}
                >
                  <f.icon className="h-6 w-6 text-primary" aria-hidden />
                </div>
                <CardTitle className="text-lg">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
