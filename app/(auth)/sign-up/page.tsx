"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Topbar } from "@/components/topbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppState } from "@/hooks/use-app-state"

export default function SignUpPage() {
  const { actions } = useAppState()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  return (
    <main>
      <Topbar />
      <div className="mx-auto max-w-md px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button
              className="w-full"
              onClick={() => {
                actions.signUp(email, password)
                router.push("/profile")
              }}
            >
              Create account
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a className="text-primary underline" href="/sign-in">
                Sign in
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
