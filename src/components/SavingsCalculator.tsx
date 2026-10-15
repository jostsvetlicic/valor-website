"use client";

import { useId, useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/config/brand";
import type { Dict, Locale } from "@/i18n";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * What manual document work costs today, from the visitor's own numbers.
 * Deliberately shows only the current cost: an "after" figure would need an
 * assumed saving, and the one-week test is what measures the real one.
 * Runs entirely in the browser; nothing is sent anywhere.
 */

const HOURS_PER_FTE_MONTH = 160;

const copy: Dict<{
  eyebrow: string;
  title: string;
  intro: string;
  fields: { docs: string; docsHelp: string; minutes: string; days: string; rate: string };
  results: { hours: string; month: string; year: string; fte: string };
  fteNote: string;
  note: string;
  cta: string;
}> = {
  en: {
    eyebrow: "Savings calculator",
    title: "What does retyping cost you today?",
    intro: "Put in your own numbers. Nothing is sent anywhere.",
    fields: {
      docs: "Documents per day",
      docsHelp: "Orders, invoices, delivery notes",
      minutes: "Minutes per document, by hand",
      days: "Working days per month",
      rate: "Hourly cost of one employee (EUR)",
    },
    results: { hours: "Hours per month", month: "Cost per month", year: "Cost per year", fte: "Full-time people" },
    fteNote: "Based on 160 working hours a month.",
    note: "Example values. Change them to yours. The one-week test measures the real minutes on your documents, before and after.",
    cta: "Book a discovery call",
  },
  sl: {
    eyebrow: "Kalkulator prihrankov",
    title: "Koliko vas danes stane pretipkavanje?",
    intro: "Vnesite svoje številke. Nič se ne pošlje nikamor.",
    fields: {
      docs: "Dokumentov na dan",
      docsHelp: "Naročila, računi, dobavnice",
      minutes: "Minut na dokument, ročno",
      days: "Delovnih dni na mesec",
      rate: "Urna cena zaposlenega (EUR)",
    },
    results: { hours: "Ur na mesec", month: "Strošek na mesec", year: "Strošek na leto", fte: "Zaposlenih s polnim delovnim časom" },
    fteNote: "Ob 160 delovnih urah na mesec.",
    note: "Vrednosti so primer. Spremenite jih v svoje. Tedenski test izmeri prave minute na vaših dokumentih, prej in potem.",
    cta: "Rezervirajte uvodni klic",
  },
};

type FieldProps = {
  label: string;
  help?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
};

function Field({ label, help, value, min, max, step, onChange }: FieldProps) {
  const id = useId();
  const clamp = (v: number) => Math.min(max, Math.max(min, Number.isFinite(v) ? v : min));
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-cream">
          {label}
          {help && <span className="mt-0.5 block text-xs font-normal text-grey">{help}</span>}
        </label>
        <input
          type="number"
          inputMode="decimal"
          aria-label={label}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(clamp(parseFloat(e.target.value)))}
          className="w-24 rounded-lg border border-cream/15 bg-obsidian px-3 py-1.5 text-right text-sm tabular-nums text-cream outline-none focus:border-gold"
        />
      </div>
      <input
        id={id}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(clamp(parseFloat(e.target.value)))}
        className="calc-range mt-3 w-full"
      />
    </div>
  );
}

/**
 * A number that rolls to its new value (about 0.4 s, easing out) instead of
 * jumping. Screen readers get only the final value.
 */
function Rolling({ value, format }: { value: number; format: (n: number) => string }) {
  const el = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);
  // The text is written by the effect below; React only renders the first value.
  const [initial] = useState(() => format(value));

  // Animates the text directly, so dragging a slider doesn't re-render React
  // sixty times a second.
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const from = shown.current;
    if (from === value || prefersReducedMotion()) {
      shown.current = value;
      node.textContent = format(value);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / 400);
      shown.current = from + (value - from) * (1 - Math.pow(1 - p, 3));
      node.textContent = format(shown.current);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, format]);

  return (
    <>
      <span ref={el} aria-hidden="true" className="tabular-nums">
        {initial}
      </span>
      <span className="sr-only">{format(value)}</span>
    </>
  );
}

export default function SavingsCalculator({ locale = "en", id = "calculator" }: { locale?: Locale; id?: string }) {
  const t = copy[locale];
  const [docs, setDocs] = useState(40);
  const [minutes, setMinutes] = useState(6);
  const [days, setDays] = useState(21);
  const [rate, setRate] = useState(25);

  const hours = (docs * minutes * days) / 60;
  const month = hours * rate;
  const year = month * 12;
  const fte = hours / HOURS_PER_FTE_MONTH;

  const tag = locale === "sl" ? "sl-SI" : "en-GB";
  const eur = new Intl.NumberFormat(tag, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const num = new Intl.NumberFormat(tag, { maximumFractionDigits: 0 });
  const dec = new Intl.NumberFormat(tag, { maximumFractionDigits: 1 });

  return (
    <section id={id} className="surface-void border-t border-cream/[0.06] py-24 md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="mt-3 font-display t-section text-cream text-balance">{t.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl t-lead text-grey">{t.intro}</p>
        </Reveal>

        <Reveal className="mx-auto mt-12 grid max-w-5xl gap-px overflow-hidden rounded-3xl border border-cream/[0.08] bg-cream/[0.08] lg:grid-cols-2">
          <div className="space-y-7 bg-charcoal p-7 md:p-9">
            <Field label={t.fields.docs} help={t.fields.docsHelp} value={docs} min={1} max={500} step={1} onChange={setDocs} />
            <Field label={t.fields.minutes} value={minutes} min={0.5} max={60} step={0.5} onChange={setMinutes} />
            <Field label={t.fields.days} value={days} min={1} max={31} step={1} onChange={setDays} />
            <Field label={t.fields.rate} value={rate} min={5} max={150} step={1} onChange={setRate} />
          </div>

          <div className="flex flex-col justify-between bg-obsidian p-7 md:p-9" aria-live="polite">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-grey">{t.results.hours}</dt>
                <dd className="mt-2 font-display t-stat text-cream"><Rolling value={hours} format={(n) => num.format(n)} /></dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-grey">{t.results.fte}</dt>
                <dd className="mt-2 font-display t-stat text-cream"><Rolling value={fte} format={(n) => dec.format(n)} /></dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-grey">{t.results.month}</dt>
                <dd className="mt-2 font-display t-stat text-gold"><Rolling value={month} format={(n) => eur.format(n)} /></dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-grey">{t.results.year}</dt>
                <dd className="mt-2 font-display t-stat text-gold"><Rolling value={year} format={(n) => eur.format(n)} /></dd>
              </div>
            </dl>
            <div className="mt-10">
              <p className="text-xs text-grey">{t.fteNote}</p>
              <p className="mt-2 text-sm leading-relaxed text-grey">{t.note}</p>
              <a
                href={brand.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[0.9375rem] font-semibold text-obsidian transition-colors hover:bg-gold-light"
              >
                {t.cta}
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
