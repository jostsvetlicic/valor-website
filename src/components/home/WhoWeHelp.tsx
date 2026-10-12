"use client";

import { useState } from "react";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { IconBuilding, IconBoat, IconCog } from "@/components/Icons";
import { brand } from "@/config/brand";
import { industries } from "@/content/industries";
import { href, type Dict, type Locale } from "@/i18n";
import { clsx } from "@/lib/clsx";

const industryIcons = [IconBuilding, IconBoat, IconCog];

const copy: Dict<{
  eyebrow: string;
  title: string;
  more: string;
  other: string;
  all: string;
  quizTitle: string;
  quizIntro: string;
  signs: string[];
  verdicts: [string, string, string];
  book: string;
}> = {
  en: {
    eyebrow: "Who we help",
    title: "Built for companies that run on documents.",
    more: "See how it works",
    other: "Another document-heavy business? We probably fit too.",
    all: "All industries",
    quizTitle: "Is this you?",
    quizIntro: "Tick what sounds familiar.",
    signs: [
      "Our systems don't talk to each other",
      "We retype data from emails and PDFs",
      "We handle a high volume of orders, calls or documents",
      "Good people spend their day on repetitive tasks",
    ],
    verdicts: [
      "Tick the ones that apply.",
      "There is likely one process worth automating first.",
      "We should talk. This is exactly what we fix.",
    ],
    book: "Book a 20-minute call",
  },
  sl: {
    eyebrow: "Komu pomagamo",
    title: "Za podjetja, ki delajo z dokumenti.",
    more: "Poglejte, kako deluje",
    other: "Drugo podjetje z veliko dokumentov? Verjetno ustrezate tudi vi.",
    all: "Vse panoge",
    quizTitle: "Ste to vi?",
    quizIntro: "Označite, kar vam je znano.",
    signs: [
      "Naši sistemi se med seboj ne pogovarjajo",
      "Podatke iz e-pošte in PDF pretipkavamo",
      "Imamo veliko naročil, klicev ali dokumentov",
      "Dobri ljudje dan preživijo s ponavljajočimi se opravili",
    ],
    verdicts: [
      "Označite, kar velja za vas.",
      "Verjetno obstaja en proces, ki ga je vredno avtomatizirati najprej.",
      "Pogovorimo se. Točno to rešujemo.",
    ],
    book: "Rezervirajte 20-minutni klic",
  },
};

/**
 * Who we help, on the page's one light section: the three industries with the
 * documents they live in, then a small "Is this you?" self check.
 */
export default function WhoWeHelp({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const [checked, setChecked] = useState<boolean[]>(() => t.signs.map(() => false));
  const count = checked.filter(Boolean).length;
  const verdict = count === 0 ? t.verdicts[0] : count < 3 ? t.verdicts[1] : t.verdicts[2];

  return (
    <Section id="who-we-help" tone="light" className="py-24 md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display t-section text-obsidian text-balance">{t.title}</h2>
        </Reveal>

        {/* Industries */}
        <RevealGroup as="ul" stagger={0.08} className="mt-14 grid gap-4 lg:grid-cols-3">
          {industries.map(({ slug, copy: c }, i) => {
            const ind = c[locale];
            const Icon = industryIcons[i] ?? IconBuilding;
            return (
              <RevealItem as="li" key={slug} hoverLift className="h-full">
                <Link
                  href={href(locale, `/industries/${slug}`)}
                  className="group flex h-full flex-col rounded-3xl border border-obsidian/10 bg-white p-7 shadow-[0_20px_50px_-30px_rgba(10,10,10,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#b08a2e] hover:shadow-[0_30px_60px_-30px_rgba(10,10,10,0.45)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-obsidian text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-obsidian">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-obsidian">{ind.name}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-obsidian/70">{ind.tagline}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {ind.documents.slice(0, 4).map((d) => (
                      <li key={d} className="rounded-full bg-obsidian/[0.06] px-3 py-1 text-xs font-medium text-obsidian/80">
                        {d}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-obsidian transition-colors group-hover:text-[#7a5d12]">
                    {t.more}
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
        <Reveal as="p" className="mt-6 text-center text-sm text-obsidian/70">
          {t.other}{" "}
          <Link href={href(locale, "/industries")} className="font-semibold text-obsidian underline underline-offset-4 hover:text-[#7a5d12]">
            {t.all}
          </Link>
        </Reveal>

        {/* Self check */}
        <Reveal className="mx-auto mt-16 max-w-4xl rounded-[2rem] bg-obsidian p-7 text-cream md:p-10">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h3 className="font-display t-subhead text-cream">{t.quizTitle}</h3>
            <p className="text-sm text-grey">{t.quizIntro}</p>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.signs.map((s, i) => (
              <li key={s}>
                <label
                  className={clsx(
                    "flex h-full cursor-pointer items-start gap-3 rounded-2xl border px-4 py-4 transition-colors duration-200",
                    checked[i] ? "border-gold bg-gold/[0.1]" : "border-cream/[0.12] hover:border-gold/50",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked[i]}
                    onChange={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-bold transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-gold",
                      checked[i] ? "border-gold bg-gold text-obsidian" : "border-cream/30",
                    )}
                  >
                    {checked[i] ? "✓" : ""}
                  </span>
                  <span className="text-[0.95rem] leading-snug text-cream">{s}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col items-start gap-4 border-t border-cream/10 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="flex items-center gap-3 text-base text-cream" aria-live="polite">
              <span className="font-mono text-sm text-gold">
                {count}/{t.signs.length}
              </span>
              {verdict}
            </p>
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-[0.9375rem] font-semibold transition-colors",
                count >= 3 ? "cta-pulse bg-gold text-obsidian hover:bg-gold-light" : "border border-cream/20 text-cream hover:border-gold hover:text-gold",
              )}
            >
              {t.book}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
