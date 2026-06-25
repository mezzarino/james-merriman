"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Errors = Partial<{
  name: string;
  email: string;
  company: string;
  message: string;
}>;

type ContactEnquiryParams = {
  name: string;
  email: string;
  company?: string;
  telephone?: string;
  message: string;
};

type MCPTool<TInput, TOutput> = {
  name: string;
  description: string;
  inputSchema: object;
  execute: (params: TInput) => Promise<TOutput>;
};

interface ModelContext {
  registerTool: <TInput, TOutput>(tool: MCPTool<TInput, TOutput>) => void;
}

interface NavigatorWithMCP extends Navigator {
  modelContext?: ModelContext;
}

// ✅ Shared, WCAG-compliant input styles
const inputClassName = `
  w-full rounded
  border border-gray-500
  p-2
  focus-visible:outline-hidden
  focus-visible:ring-2
  focus-visible:ring-black
  focus-visible:ring-offset-2
`;

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const formLoadTime = useRef<number | null>(null);

  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

  const summaryRef = useRef<HTMLDivElement>(null);

  // ✅ Optional: Imperative MCP tool (progressive enhancement)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = navigator as NavigatorWithMCP;

    if (nav.modelContext) {
      try {
        nav.modelContext.registerTool<ContactEnquiryParams, { success: true }>({
          name: "send_contact_enquiry",
          description:
            "Send a contact enquiry to James Merriman including name, email, and message",
          inputSchema: {
            type: "object",
            required: ["name", "email", "message"],
            properties: {
              name: { type: "string", maxLength: 100 },
              email: { type: "string", format: "email", maxLength: 100 },
              company: { type: "string", maxLength: 100 },
              telephone: { type: "string" },
              message: { type: "string", maxLength: 500 },
            },
          },
          execute: async (params) => {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json", "X-Submission-Type": "mcp-agent" },
              body: JSON.stringify(params),
            });

            if (!res.ok) {
              throw new Error("Submission failed");
            }

            return { success: true };
          },
        });
      } catch {
        // fail silently (experimental API)
      }
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setFormError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // ✅ Improved honeypot name (less likely to be filled by agents)
    if (formData.get("website")) return;

    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const company = formData.get("company")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";
    const telephone = formData.get("telephone")?.toString().trim() || "";

    const nextErrors: Errors = {};

    if (!name) nextErrors.name = "Name is required.";
    if (!email) nextErrors.email = "Email is required.";
    if (!message) nextErrors.message = "Message is required.";

    if (name.length > 100) nextErrors.name = "Name must be under 100 characters.";
    if (email.length > 100) nextErrors.email = "Email must be under 100 characters.";
    if (company.length > 100) nextErrors.company = "Company must be under 100 characters.";
    if (message.length > 500) nextErrors.message = "Message must be 500 characters or fewer.";

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    try {
      setLoading(true);

      const timeToSubmit =
        formLoadTime.current !== null ? Date.now() - formLoadTime.current : undefined;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          telephone,
          meta: {
            timeToSubmit,
          },
        }),
      });

      if (!res.ok) throw new Error();

      setSuccess(true);
      form.reset();
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div
        role="status"
        className="rounded-lg border border-green-600 bg-green-50 p-6 text-green-800"
      >
        Thanks — your message has been sent successfully.
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl"
      // ✅ WebMCP declarative hooks (core addition)
      toolname="send_contact_enquiry"
      tooldescription="Send a contact enquiry including name, email, and message"
    >
      {/* ✅ Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Error summary */}
      {Object.keys(errors).length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          aria-live="polite"
          role="status"
          className="rounded border border-red-600 bg-red-50 p-4 text-red-700"
        >
          <p className="font-medium">Please fix the following errors:</p>
          <ul className="list-disc list-inside">
            {Object.values(errors).map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name *
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          data-purpose="full_name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClassName}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          data-purpose="email_address"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClassName}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium">
          Company
        </label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          data-purpose="company"
          aria-invalid={!!errors.company}
          aria-describedby={errors.company ? "company-error" : undefined}
          className={inputClassName}
        />
        {errors.company && (
          <p id="company-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.company}
          </p>
        )}
      </div>

      {/* Telephone */}
      <div>
        <label htmlFor="telephone" className="block text-sm font-medium">
          Telephone
        </label>
        <input
          id="telephone"
          name="telephone"
          type="tel"
          autoComplete="tel"
          data-purpose="phone_number"
          className={inputClassName}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          autoComplete="off"
          data-purpose="enquiry_message"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClassName}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {formError && (
        <p role="alert" className="text-sm text-red-600">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="
          mt-2 inline-flex items-center justify-center rounded
          bg-gray-200 px-6 py-3 text-sm font-medium
          text-black hover:bg-black hover:text-white
          transition motion-reduce:transition-none
          disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed
        "
      >
        {loading ? "Sending…" : "Send message"}
      </button>

      <p className="text-sm text-gray-500 mt-4">
        <strong>Privacy notice</strong>
        <br />
        By submitting this form, you consent to James Merriman using your information to respond to
        your enquiry. Details will not be shared. See our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </form>
  );
}
