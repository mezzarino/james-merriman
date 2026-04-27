"use client";

import { useState } from "react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      form.reset();
    } else {
      setError("Something went wrong. Please try again.");
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      {/* Honeypot */}
      <input type="text" name="botField" tabIndex={-1} autoComplete="off" className="hidden" />

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name *
        </label>
        <input
          id="name"
          name="name"
          maxLength={100}
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          maxLength={100}
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium">
          Company
        </label>
        <input id="company" name="company" maxLength={100} className="w-full rounded border p-2" />
      </div>

      <div>
        <label htmlFor="telephone" className="block text-sm font-medium">
          Telephone
        </label>
        <input id="telephone" name="telephone" type="tel" className="w-full rounded border p-2" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          maxLength={500}
          required
          rows={5}
          className="w-full rounded border p-2"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "…" : "Send"}
      </button>

      <p className="text-sm text-gray-500 mt-4">
        <strong>Privacy notice</strong>
        <br />
        By submitting this form, you consent to James Merriman using your information to respond to
        your enquiry. Your details will not be used for marketing or shared with third parties.
      </p>
    </form>
  );
}
