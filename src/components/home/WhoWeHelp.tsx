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
                  className="group flex h-full flex-col rounded-3xl border border-obsidian/10 bg-[#fcfaf6] p-7 shadow-[0_20px_50px_-30px_rgba(10,10,10,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#b08a2e] hover:shadow-[0_30px_60px_-30px_rgba(10,10,10,0.45)]"
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

        {/* Self check: a premium dark card with a warm gold glow, so the
            booking button is the brightest thing on the light section. */}
        <Reveal className="mx-auto mt-16 max-w-4xl">
          <div
            className="relative overflow-hidden rounded-[2rem] border border-gold/30 p-7 text-cream shadow-[0_40px_90px_-40px_rgba(10,10,10,0.7)] md:p-10"
            style={{
              background:
                "radial-gradient(80% 90% at 50% 0%, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0.05) 50%, transparent 80%), linear-gradient(160deg, #1d170c 0%, #120f09 55%, #0b0a08 100%)",
            }}
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h3 className="font-display t-section text-cream">{t.quizTitle}</h3>
              <p className="text-base text-cream/80">{t.quizIntro}</p>
            </div>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {t.signs.map((s, i) => (
                <li key={s}>
                  <label
                    className={clsx(
                      "flex h-full cursor-pointer items-start gap-3 rounded-2xl border px-4 py-4 backdrop-blur-sm transition-colors duration-200",
                      checked[i] ? "border-gold bg-gold/[0.14]" : "border-cream/[0.14] bg-black/20 hover:border-gold/60",
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
                        checked[i] ? "border-gold bg-gold text-obsidian" : "border-cream/35",
                      )}
                    >
                      {checked[i] ? "✓" : ""}
                    </span>
                    <span className="text-[0.95rem] leading-snug text-cream">{s}</span>
                  </label>
                </li>
              ))}
            </ul>

            {/* How many apply, as a gold meter */}
            <div className="mt-7 flex items-center gap-4">
              <span className="font-mono text-sm text-gold">
                {count}/{t.signs.length}
              </span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream/10" aria-hidden="true">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-[width] duration-500 ease-out"
                  style={{ width: `${(count / t.signs.length) * 100}%` }}
                />
              </span>
            </div>

            <div className="mt-7 flex flex-col items-stretch gap-5 md:flex-row md:items-center md:justify-between">
              <p className="text-lg font-medium text-cream" aria-live="polite">
                {verdict}
              </p>
              <a
                href={brand.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-pulse group inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-gold px-6 py-4 text-base font-semibold sm:px-8 text-obsidian shadow-[0_12px_40px_-8px_rgba(201,168,76,0.65)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-gold-light"
              >
                {t.book}
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
