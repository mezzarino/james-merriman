export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  telephone?: unknown;
  message?: unknown;
  botField?: unknown;
  website?: unknown;
  meta?: {
    timeToSubmit?: unknown;
  };
};

export async function POST(req: Request) {
  const headers = req.headers;

  let data: Record<string, unknown>;

  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, company, telephone, message, botField, website, meta } =
    data as ContactPayload;

  if (botField || website) {
    return NextResponse.json({ success: true });
  }

  const submissionType = headers.get("x-submission-type");
  const isMCP = submissionType === "mcp-agent";

  const timeToSubmit = typeof meta?.timeToSubmit === "number" ? meta.timeToSubmit : undefined;
  const isFast = timeToSubmit !== undefined && timeToSubmit < 1000;

  let source: "HUMAN" | "AI_AGENT" | "LIKELY_AUTOMATION";

  if (isMCP) {
    source = "AI_AGENT";
  } else if (isFast) {
    source = "LIKELY_AUTOMATION";
  } else {
    source = "HUMAN";
  }

  console.log({
    source,
    timeToSubmit,
    userAgent: headers.get("user-agent"),
  });

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name ||
    !email ||
    !message ||
    name.length > 100 ||
    email.length > 100 ||
    (company && typeof company === "string" && company.length > 100) ||
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

        <p><strong>Source:</strong> ${source}</p>
        ${
          timeToSubmit !== undefined
            ? `<p><strong>Time to submit:</strong> ${timeToSubmit}ms</p>`
            : ""
        }

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
