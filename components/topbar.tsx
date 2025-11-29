"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAppState } from "@/hooks/use-app-state"
// Removed Avatar imports, added User icon
import { User } from "lucide-react"

export function Topbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { state, actions } = useAppState()
  const isActive = (p: string) => pathname === p

  const pill = (p: string) =>
    isActive(p)
      ? "rounded-full px-3 py-1 text-sm font-medium bg-accent text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      : "rounded-full px-3 py-1 text-sm font-medium bg-accent/20 text-foreground hover:bg-accent/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

  return (
    <header className="w-full border-b bg-card">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href={state.user ? "/dashboard" : "/"}
          className="flex items-center gap-2 rounded-md px-2 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="CAP STACK Home"
        >
          <img
            src="/images/cap-stack-logo.png"
            alt="CAP STACK"
            width={220}
            height={82}
            className="h-20 object-contain shrink-0"
          />
          <span className="sr-only">CAP STACK Home</span>
        </Link>
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-3">
            <Link href="/" aria-current={isActive("/") ? "page" : undefined} className={pill("/")}>
              Home
            </Link>
            <Link href="/service" aria-current={isActive("/service") ? "page" : undefined} className={pill("/service")}>
              Service
            </Link>
            <Link href="/about" aria-current={isActive("/about") ? "page" : undefined} className={pill("/about")}>
              About
            </Link>
            {/* // remove Pricing link and add Saving link */}
            <Link href="/saving" aria-current={isActive("/saving") ? "page" : undefined} className={pill("/saving")}>
              Saving
            </Link>
            <Link href="/blog" aria-current={isActive("/blog") ? "page" : undefined} className={pill("/blog")}>
              Blog
            </Link>
            <Link href="/contact" aria-current={isActive("/contact") ? "page" : undefined} className={pill("/contact")}>
              Contact
            </Link>
            {state.user && (
              <Link
                href="/dashboard"
                aria-current={isActive("/dashboard") ? "page" : undefined}
                className={pill("/dashboard")}
              >
                Dashboard
              </Link>
            )}
          </nav>
          {state.user ? (
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  actions.signOut()
                  router.push("/sign-in")
                }}
              >
                Sign out
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className={
                  pathname === "/profile"
                    ? "ml-1 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    : "ml-1 rounded-full hover:bg-accent/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                }
              >
                <Link href="/profile" aria-label="Profile" aria-current={pathname === "/profile" ? "page" : undefined}>
                  <User className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </>
          ) : (
            <Button onClick={() => router.push("/sign-in")}>Sign in</Button>
          )}
        </div>
      </div>
    </header>
  )
}
