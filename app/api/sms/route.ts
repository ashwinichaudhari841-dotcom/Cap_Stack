import { NextResponse } from "next/server"
import { createPendingFromMessage, suggestCategory } from "@/lib/sms"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    if (typeof message !== "string" || message.trim().length < 6) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 })
    }
    const pending = createPendingFromMessage(message)
    if (!pending) {
      return NextResponse.json({ error: "Amount not found" }, { status: 200 })
    }
    const suggested = suggestCategory(message, pending.merchant)
    return NextResponse.json({ pending: { ...pending, category: suggested } })
  } catch (e) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 })
  }
}
