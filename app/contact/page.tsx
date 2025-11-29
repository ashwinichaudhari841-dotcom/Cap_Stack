"use client"

import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <main>
      <Topbar />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-balance">Contact</h1>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Send us a message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Your email" />
            <Textarea rows={5} placeholder="How can we help?" />
            <Button>Send</Button>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
