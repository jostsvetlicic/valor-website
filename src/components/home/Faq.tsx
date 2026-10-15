"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/config/brand";
import { href, type Locale } from "@/i18n";
import { faqCopy, type Faq } from "@/content/faq";
import { safeJson } from "@/lib/seo";

const copy = faqCopy;

function FaqItem({
  faq,
  last,
  locale,
  book,
  open,
  onToggle,
}: {
  faq: Faq;
  last: boolean;
  locale: Locale;
  book: string;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();

  return (
    <li
      className={`border-b border-obsidian/10 transition-colors duration-300 first:border-t ${
        open ? "bg-[#fcfaf6] shadow-[inset_3px_0_0_#b08a2e]" : ""
      }`}
    >
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className={`flex w-full items-center justify-between gap-6 rounded-lg px-4 py-5 text-left text-base font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#b08a2e]/60 md:text-lg ${
            open ? "text-[#7a5d12]" : "text-obsidian hover:text-[#7a5d12]"
          }`}
        >
          {faq.q}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`h-5 w-5 shrink-0 rounded-full text-[#7a5d12] transition-transform duration-300 ease-out ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-6 pr-12 text-[0.95rem] leading-relaxed text-obsidian/75">
            {faq.a}
            {faq.link && (
              <>
                {" "}
                <Link href={href(locale, faq.link.path)} className="font-semibold text-[#7a5d12] underline-offset-4 hover:underline">
                  {faq.link.label}
                </Link>
              </>
            )}
            {last && (
              <>
                {" "}
                <a
                  href={brand.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#7a5d12] underline-offset-4 hover:underline"
                >
                  {book}
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function Faq({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  // One question open at a time; all start closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: t.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <Section id="faq" tone="light" className="py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 className="mt-3 font-display t-section text-obsidian">{t.title}</h2>
            <div className="mt-8 rounded-3xl bg-obsidian p-7 text-cream">
              <p className="font-display text-xl font-semibold">{t.askTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-grey">{t.askText}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={brand.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-obsidian transition-colors hover:bg-gold-light"
                >
                  WhatsApp
                </a>
                {!brand.emailIsPlaceholder && (
                  <a
                    href={`mailto:${brand.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:border-gold hover:text-gold"
                  >
                    {brand.email}
                  </a>
                )}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <ul>
              {t.faqs.map((f, i) => (
                <FaqItem
                  key={f.q}
                  faq={f}
                  last={i === t.faqs.length - 1}
                  locale={locale}
                  book={t.book}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex((o) => (o === i ? null : i))}
                />
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(schema) }} />
    </Section>
  );
}
