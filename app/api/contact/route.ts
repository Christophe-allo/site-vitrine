import { NextResponse } from "next/server"
import { Resend } from "resend"

const serviceLabels = {
  medical: "Cabinet médical",
  dental: "Cabinet dentaire",
  nursing: "Cabinet infirmier",
  other: "Autre cabinet",
} as const

type ContactPayload = {
  name?: string
  email?: string
  message?: string
  services?: string[]
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ??
    "Alloclinic <contact@onboarding.alloclinic.fr>"

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY or CONTACT_TO_EMAIL in .env.local" },
      { status: 500 }
    )
  }

  const body = (await request.json()) as ContactPayload
  const name = body.name?.trim() ?? ""
  const email = body.email?.trim() ?? ""
  const message = body.message?.trim() ?? ""
  const services = Array.isArray(body.services) ? body.services : []

  if (!name || !email || !message || services.length === 0) {
    return NextResponse.json(
      { error: "Missing required contact fields." },
      { status: 400 }
    )
  }

  const selectedServices = services
    .map((service) => serviceLabels[service as keyof typeof serviceLabels])
    .filter(Boolean)

  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: email,
    subject: `Nouveau message contact Alloclinic - ${name}`,
    html: `
      <h2>Nouveau message depuis le formulaire Alloclinic</h2>
      <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Types de cabinets :</strong> ${escapeHtml(selectedServices.join(", "))}</p>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
  })

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  const acknowledgment = await resend.emails.send({
    from: fromEmail,
    to: [email],
    replyTo: toEmail,
    subject: "Votre message a bien été reçu - Alloclinic",
    html: `
      <p>Bonjour ${escapeHtml(name)},</p>
      <p>Nous avons bien reçu votre message et nous vous en remercions.</p>
      <p>Nos équipes vont l'étudier avec attention et reviendront vers vous dans les plus brefs délais.</p>
      <p>Votre satisfaction est notre priorité.</p>
      <p>L'équipe <a href="https://alloclinic.fr">Alloclinic</a></p>
    `,
  })

  return NextResponse.json({
    ok: true,
    data,
    acknowledgmentSent: !acknowledgment.error,
  })
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}
