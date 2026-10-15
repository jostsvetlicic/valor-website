"use client";

import { useState } from "react";
import { brand } from "@/config/brand";
import type { Dict, Locale } from "@/i18n";

const ui: Dict<{
  name: string;
  email: string;
  company: string;
  companyPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  subject: (name: string) => string;
  visitor: string;
  sent: string;
  failed: string;
  invalidEmail: string;
}> = {
  en: {
    name: "Your name",
    email: "Your email",
    company: "Company",
    companyPlaceholder: "Company (optional)",
    message: "Message",
    messagePlaceholder: "What's the most manual part of your operation right now?",
    send: "Send message",
    sending: "Sending…",
    subject: (n) => `New enquiry from ${n}`,
    visitor: "a visitor",
    sent: "Thank you, your message has been sent. We'll get back to you soon.",
    failed: "Your message could not be sent. Please try again, or reach us on WhatsApp or by phone.",
    invalidEmail: "Please check your email address.",
  },
  sl: {
    name: "Vaše ime",
    email: "Vaš e-naslov",
    company: "Podjetje",
    companyPlaceholder: "Podjetje (neobvezno)",
    message: "Sporočilo",
    messagePlaceholder: "Kateri del vašega poslovanja je trenutno najbolj ročen?",
    send: "Pošlji sporočilo",
    sending: "Pošiljanje …",
    subject: (n) => `Novo povpraševanje: ${n}`,
    visitor: "obiskovalec",
    sent: "Hvala, vaše sporočilo je poslano. Kmalu se vam oglasimo.",
    failed: "Sporočila ni bilo mogoče poslati. Poskusite znova ali nam pišite na WhatsApp oziroma nas pokličite.",
    invalidEmail: "Preverite svoj e-naslov.",
  },
};

/** Field length limits (also enforced by the inputs' maxLength). */
const LIMITS = { name: 100, email: 254, company: 120, message: 4000 };

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Contact form, delivered by Formspree (brand.formEndpoint) to the owner's
 * inbox. With JavaScript it posts in the background and shows the result in
 * place; without JavaScript the plain form posts to the same endpoint.
 * A hidden "_gotcha" field catches spam bots (Formspree drops those posts).
 */
export default function ContactForm({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale];
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    // Trim, cap the length and drop control characters before sending.
    const clean = (v: FormDataEntryValue | null, max: number) =>
      String(v ?? "")
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
        .trim()
        .slice(0, max);
    const name = clean(data.get("name"), LIMITS.name);
    const payload = {
      name,
      email: clean(data.get("email"), LIMITS.email),
      company: clean(data.get("company"), LIMITS.company),
      message: clean(data.get("message"), LIMITS.message),
      language: locale === "sl" ? "Slovenian" : "English",
      _subject: t.subject(name || t.visitor),
      _gotcha: String(data.get("_gotcha") ?? ""),
    };

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(brand.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        form.reset();
        setStatus("sent");
        return;
      }
      const body = (await res.json().catch(() => null)) as { errors?: { field?: string }[] } | null;
      setError(body?.errors?.some((er) => er.field === "email") ? t.invalidEmail : t.failed);
      setStatus("error");
    } catch {
      setError(t.failed);
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-2xl border border-gold/15 bg-obsidian/60 px-5 py-4 text-cream placeholder:text-grey outline-none transition-colors focus:border-gold/50";

  return (
    <form action={brand.formEndpoint} method="POST" onSubmit={handleSubmit} className="space-y-4">
      {/* Spam trap: hidden from people, bots fill it in. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">
            {t.name}
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={LIMITS.name}
            autoComplete="name"
            placeholder={t.name}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            {t.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={LIMITS.email}
            autoComplete="email"
            placeholder={t.email}
            className={fieldClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="sr-only">
          {t.company}
        </label>
        <input
          id="company"
          name="company"
          maxLength={LIMITS.company}
          autoComplete="organization"
          placeholder={t.companyPlaceholder}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={LIMITS.message}
          rows={5}
          placeholder={t.messagePlaceholder}
          className={`${fieldClass} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-pill bg-gold px-8 py-4 text-sm font-semibold text-obsidian transition-colors hover:bg-gold-light disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? t.sending : t.send}
      </button>
      <p role="status" aria-live="polite" className={status === "error" ? "text-sm text-[#e0795a]" : "text-sm text-gold"}>
        {status === "sent" ? t.sent : status === "error" ? error : ""}
      </p>
    </form>
  );
}
