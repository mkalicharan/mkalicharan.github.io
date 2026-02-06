import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, interest } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      )
    }

    const lead = await db.lead.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        phone: phone ? String(phone).trim() : null,
        message: message ? String(message).trim() : null,
        interest: interest ? String(interest).trim() : null,
      },
    })

    return NextResponse.json({ success: true, id: lead.id })
  } catch (error) {
    console.error("Failed to save lead:", error)
    return NextResponse.json(
      { error: "Failed to save your information. Please try again." },
      { status: 500 }
    )
  }
}
