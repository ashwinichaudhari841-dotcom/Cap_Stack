"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "left" | "right"

export function AnimatedSection({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  duration = 700,
  direction = "up",
  once = true,
}: {
  children: React.ReactNode
  className?: string
  as?: any
  delay?: number
  duration?: number
  direction?: Direction
  once?: boolean
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const el = ref.current as Element | null
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const hiddenTransform =
    direction === "up"
      ? "translate-y-4"
      : direction === "down"
        ? "-translate-y-4"
        : direction === "left"
          ? "translate-x-4"
          : "-translate-x-4"

  return (
    <Tag
      ref={ref as any}
      className={cn(
        "transition-all",
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${hiddenTransform}`,
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  )
}
