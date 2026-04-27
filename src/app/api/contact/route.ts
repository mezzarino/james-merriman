export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

import { EmailTemplate } from "@/lib/emails/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.json();

  const { name, email, company, telephone, message, botField } = data as Record<
    string,
    string | undefined
  >;

  // Honeypot
  if (botField) {
    return NextResponse.json({ success: true });
  }

  // Validation
  if (
    !name ||
    !email ||
    !message ||
    name.length > 100 ||
    email.length > 100 ||
    (company && company.length > 100) ||
    message.length > 500
  ) {
    return NextResponse.json({ error: "Invalid form submission" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const safeCompany = company || "";
  const safeTelephone = telephone || "";

  try {
    await resend.emails.send({
      from: "Website Contact <no-reply@mail.jamesmerriman.co.uk>",
      to: ["mezzarino@outlook.com"],
      replyTo: email,
      subject: `Contact form message from ${name}`,
      react: EmailTemplate({
        name,
        email,
        company: safeCompany,
        telephone: safeTelephone,
        message,
      }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
