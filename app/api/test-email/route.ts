import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      {
        error: "Missing RESEND_API_KEY or CONTACT_TO_EMAIL in .env.local",
      },
      { status: 500 }
    )
  }

  const resend = new Resend(apiKey)

  const { data, error } = await resend.emails.send({
    from: "Alloclinic <onboarding@resend.dev>",
    to: [toEmail],
    subject: "Test formulaire Alloclinic",
    html: "<p>Test d'envoi depuis le formulaire Alloclinic via Resend.</p>",
  })

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ ok: true, data })
}
