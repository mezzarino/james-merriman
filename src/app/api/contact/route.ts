export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

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

  try {
    await resend.emails.send({
      from: "Website Contact <no-reply@mail.jamesmerriman.co.uk>",
      to: ["info@jamesmerriman.co.uk"],
      replyTo: email,
      subject: `Contact form message from ${name}`,
      html: `
        <h1>Website contact form submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "—"}</p>
        <p><strong>Telephone:</strong> ${telephone || "—"}</p>
        <p><strong>Message:</strong><br />${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
