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
  subject: (name: string) => string;
  visitor: string;
  fields: { name: string; email: string; company: string };
  sentWhatsapp: string;
  sentMail: string;
}> = {
  en: {
    name: "Your name",
    email: "Your email",
    company: "Company",
    companyPlaceholder: "Company (optional)",
    message: "Message",
    messagePlaceholder: "What's the most manual part of your operation right now?",
    send: "Send message",
    subject: (n) => `New enquiry from ${n}`,
    visitor: "a visitor",
    fields: { name: "Name", email: "Email", company: "Company" },
    sentWhatsapp:
      "Thanks! WhatsApp should have opened with your message ready to send. If not, reach us on WhatsApp or by phone above.",
    sentMail:
      "Your mail app should have opened with the message ready to send. If not, reach us on WhatsApp or by phone above.",
  },
  sl: {
    name: "Vaše ime",
    email: "Vaš e-naslov",
    company: "Podjetje",
    companyPlaceholder: "Podjetje (neobvezno)",
    message: "Sporočilo",
    messagePlaceholder: "Kateri del vašega poslovanja je trenutno najbolj ročen?",
    send: "Pošlji sporočilo",
    subject: (n) => `Novo povpraševanje: ${n}`,
    visitor: "obiskovalec",
    fields: { name: "Ime", email: "E-naslov", company: "Podjetje" },
    sentWhatsapp:
      "Hvala! Odprl bi se moral WhatsApp s pripravljenim sporočilom. Če se ni, nas pokličite ali nam pišite na WhatsApp zgoraj.",
    sentMail:
      "Odpreti bi se moral vaš poštni program s pripravljenim sporočilom. Če se ni, nas pokličite ali nam pišite na WhatsApp zgoraj.",
  },
};

/**
 * Simple contact form that composes a message and opens the visitor's own
 * WhatsApp (or mail client once a real inbox exists). No backend,
 * deliberately, for now. When a real form endpoint exists, swap the
 * handleSubmit body.
 */
export default function ContactForm({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale];
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = t.subject(name || t.visitor);
    const body = [
      `${t.fields.name}: ${name}`,
      `${t.fields.email}: ${email}`,
      `${t.fields.company}: ${company}`,
      "",
      message,
    ].join("\n");

    // While the email inbox isn't live yet, route the message to WhatsApp so it
    // actually reaches us, a form that silently mails a dead address is worse
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
            {t.name}
          </label>
          <input
            id="name"
            name="name"
            required
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
          rows={5}
          placeholder={t.messagePlaceholder}
          className={`${fieldClass} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-pill bg-gold px-8 py-4 text-sm font-semibold text-obsidian transition-colors hover:bg-gold-light sm:w-auto"
      >
        {t.send}
      </button>
      {sent && (
        <p className="text-sm text-gold">
          {brand.emailIsPlaceholder ? t.sentWhatsapp : t.sentMail}
        </p>
      )}
    </form>
  );
}
