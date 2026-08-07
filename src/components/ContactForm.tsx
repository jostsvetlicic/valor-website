"use client";

import { useState } from "react";
import { brand } from "@/config/brand";

/**
 * Simple contact form that composes a message and opens the visitor's own
 * WhatsApp (or mail client once a real inbox exists). No backend —
 * deliberately, for now. When a real form endpoint exists, swap the
 * handleSubmit body.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `New enquiry from ${name || "a visitor"}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      "",
      message,
    ].join("\n");

    // While the email inbox isn't live yet, route the message to WhatsApp so it
    // actually reaches us — a form that silently mails a dead address is worse
    // than no form. Once brand.emailIsPlaceholder is false, it uses email.
    if (brand.emailIsPlaceholder) {
      const text = `${subject}\n\n${body}`;
      window.open(
        `${brand.whatsappUrl}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
    }
    setSent(true);
  }

  const fieldClass =
    "w-full rounded-2xl border border-gold/15 bg-obsidian/60 px-5 py-4 text-cream placeholder:text-grey outline-none transition-colors focus:border-gold/50";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">
            Your name
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Your email"
            className={fieldClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="sr-only">
          Company
        </label>
        <input
          id="company"
          name="company"
          placeholder="Company (optional)"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What's the most manual part of your operation right now?"
          className={`${fieldClass} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-pill bg-gold px-8 py-4 text-sm font-semibold text-obsidian transition-colors hover:bg-gold-light sm:w-auto"
      >
        Send message
      </button>
      {sent && (
        <p className="text-sm text-gold">
          {brand.emailIsPlaceholder
            ? "Thanks — WhatsApp should have opened with your message ready to send. If not, reach us on WhatsApp or by phone above."
            : "Your mail app should have opened with the message ready to send. If not, reach us on WhatsApp or by phone above."}
        </p>
      )}
    </form>
  );
}
