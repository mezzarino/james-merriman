"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Errors = Partial<{
  name: string;
  email: string;
  company: string;
  message: string;
}>;

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const summaryRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setFormError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (formData.get("botField")) return;

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

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          telephone,
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
    <form noValidate onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
        type="text"
        name="botField"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

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
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="w-full rounded border p-2"
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
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="w-full rounded border p-2"
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
          aria-invalid={!!errors.company}
          aria-describedby={errors.company ? "company-error" : undefined}
          className="w-full rounded border p-2"
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
        <input id="telephone" name="telephone" type="tel" className="w-full rounded border p-2" />
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
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full rounded border p-2"
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
          mt-2 inline-flex items-center justify-center rounded-full
          border border-gray-300 px-6 py-3 text-sm font-medium
          text-gray-600 hover:bg-black hover:text-white hover:border-black
          transition motion-reduce:transition-none
          disabled:opacity-50
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
