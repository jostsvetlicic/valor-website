"use client";

import { useEffect, useRef, useState } from "react";
import { Container, Eyebrow } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { IconChat, IconDocument, IconMail } from "@/components/Icons";
import type { Dict, Locale } from "@/i18n";
import { clsx } from "@/lib/clsx";
import { prefersReducedMotion } from "@/lib/motion";

const icons = [IconMail, IconDocument, IconChat];

type Mail = { from: string; subject: string; kind: 0 | 1 | 2; time: string };

const copy: Dict<{
  eyebrow: string;
  title: string;
  intro: string;
  inbox: string;
  unread: string;
  sample: string;
  before: string;
  after: string;
  handled: string[];
  allDone: string;
  pains: { title: string; text: string }[];
  mails: Mail[];
}> = {
  en: {
    eyebrow: "The reality today",
    title: "Your team retypes the same data every day.",
    intro: "A normal Monday morning. Point at a task to see its emails, then switch to With VALOR.",
    inbox: "Inbox",
    unread: "unread",
    sample: "Example inbox, fictional senders.",
    before: "Today",
    after: "With VALOR",
    handled: ["Draft order in ERP", "Checked, ready to book", "Answered with status"],
    allDone: "Inbox clear. 2 items wait for a person to approve.",
    pains: [
      { title: "Orders retyped into the ERP", text: "Every order email and PDF is typed in line by line, by hand." },
      { title: "Documents checked line by line", text: "Invoices, delivery notes and customs papers compared against each other." },
      { title: "The same questions, answered one by one", text: "Where is my delivery? Did you get my payment? Every day, again." },
    ],
    mails: [
      { from: "Purchasing, Customer A", subject: "Order 2026-1043, 14 lines attached", kind: 0, time: "07:52" },
      { from: "Supplier B", subject: "Invoice and delivery note 7781", kind: 1, time: "08:03" },
      { from: "Customer C", subject: "Where is our delivery?", kind: 2, time: "08:10" },
      { from: "Purchasing, Customer D", subject: "Order update, see PDF", kind: 0, time: "08:24" },
      { from: "Freight partner", subject: "Customs documents for shipment 512", kind: 1, time: "08:31" },
      { from: "Customer E", subject: "Did you receive our payment?", kind: 2, time: "08:47" },
      { from: "Customer F", subject: "Repeat order, same as last month", kind: 0, time: "09:05" },
    ],
  },
  sl: {
    eyebrow: "Kako je danes",
    title: "Vaša ekipa vsak dan pretipkava iste podatke.",
    intro: "Običajno ponedeljkovo jutro. Pokažite na opravilo in poglejte njegovo pošto, nato preklopite na Z VALOR.",
    inbox: "Prejeto",
    unread: "neprebranih",
    sample: "Primer nabiralnika, izmišljeni pošiljatelji.",
    before: "Danes",
    after: "Z VALOR",
    handled: ["Osnutek naročila v ERP", "Preverjeno, pripravljeno za knjiženje", "Odgovorjeno s stanjem"],
    allDone: "Nabiralnik je prazen. 2 zadevi čakata na potrditev osebe.",
    pains: [
      { title: "Naročila, pretipkana v ERP", text: "Vsako naročilo iz e-pošte in PDF se vtipka ročno, vrstico za vrstico." },
      { title: "Dokumenti, preverjeni vrstico za vrstico", text: "Računi, dobavnice in carinski dokumenti, primerjani med seboj." },
      { title: "Ista vprašanja, odgovorjena eno za drugim", text: "Kje je moja dostava? Ste prejeli plačilo? Vsak dan znova." },
    ],
    mails: [
      { from: "Nabava, kupec A", subject: "Naročilo 2026-1043, 14 vrstic v prilogi", kind: 0, time: "07:52" },
      { from: "Dobavitelj B", subject: "Račun in dobavnica 7781", kind: 1, time: "08:03" },
      { from: "Kupec C", subject: "Kje je naša dostava?", kind: 2, time: "08:10" },
      { from: "Nabava, kupec D", subject: "Sprememba naročila, glejte PDF", kind: 0, time: "08:24" },
      { from: "Špediter", subject: "Carinski dokumenti za pošiljko 512", kind: 1, time: "08:31" },
      { from: "Kupec E", subject: "Ste prejeli naše plačilo?", kind: 2, time: "08:47" },
      { from: "Kupec F", subject: "Ponovno naročilo, enako kot prejšnji mesec", kind: 0, time: "09:05" },
    ],
  },
};

/**
 * The problem, shown rather than listed: an example inbox next to the three
 * jobs it creates. Pointing at (or tapping) a job lights up its emails.
 */
export default function Problem({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const [active, setActive] = useState<number | null>(null);
  const [withValor, setWithValor] = useState(false);
  const [done, setDone] = useState(0);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  useEffect(() => clear, []);

  // Switching on "With VALOR" works through the inbox one email at a time.
  const toggle = (on: boolean) => {
    clear();
    setWithValor(on);
    if (!on) {
      setDone(0);
      return;
    }
    if (prefersReducedMotion()) {
      setDone(t.mails.length);
      return;
    }
    setDone(0);
    t.mails.forEach((_, i) => timers.current.push(window.setTimeout(() => setDone(i + 1), 350 + i * 420)));
  };
  const unread = t.mails.length - done;

  return (
    <Section id="problem" tone="void" className="py-24 md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display t-section text-cream text-balance">{t.title}</h2>
          <p className="mx-auto mt-5 max-w-xl t-lead text-grey">{t.intro}</p>
        </Reveal>

        <Reveal className="mt-14 grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* The inbox, with a Today / With VALOR switch. min-w-0 lets long
              subjects truncate instead of widening the column on phones. */}
          <div className="min-w-0">
          <div role="group" aria-label={t.inbox} className="mb-4 inline-flex rounded-full border border-cream/[0.12] bg-charcoal p-1">
            {[false, true].map((on) => (
              <button
                key={String(on)}
                type="button"
                aria-pressed={withValor === on}
                onClick={() => toggle(on)}
                className={clsx(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300",
                  withValor === on
                    ? on
                      ? "bg-emerald-400 text-obsidian"
                      : "bg-[#e0795a] text-obsidian"
                    : "text-grey hover:text-cream",
                )}
              >
                {on ? t.after : t.before}
              </button>
            ))}
          </div>
          <div className="overflow-hidden rounded-3xl border border-cream/[0.1] bg-charcoal shadow-[0_40px_120px_-50px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between border-b border-cream/[0.08] px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#e0795a]/80" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold/60" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-cream/20" aria-hidden="true" />
                <span className="ml-3 text-sm font-semibold text-cream">{t.inbox}</span>
              </div>
              <span
                className={clsx(
                  "rounded-full px-2.5 py-1 font-mono text-xs transition-colors duration-300",
                  unread === 0 ? "bg-emerald-400/15 text-emerald-400" : "bg-[#e0795a]/15 text-[#e0795a]",
                )}
              >
                {unread} {t.unread}
              </span>
            </div>
            <ul>
              {t.mails.map((m, i) => {
                const handled = withValor && i < done;
                const lit = !withValor && active === m.kind;
                const dim = !withValor && active !== null && !lit;
                return (
                  <li
                    key={m.subject}
                    className={clsx(
                      "flex items-center gap-4 border-b border-cream/[0.05] px-5 py-3.5 transition-[background-color,opacity] duration-300 last:border-b-0",
                      lit && "bg-[#e0795a]/10",
                      dim && "opacity-35",
                      handled && "bg-emerald-400/[0.05]",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold transition-colors duration-300",
                        handled ? "bg-emerald-400 text-obsidian" : lit ? "bg-[#e0795a] text-transparent" : "bg-transparent text-transparent",
                      )}
                    >
                      {handled ? "✓" : <span className={clsx("h-2 w-2 rounded-full", lit ? "bg-[#e0795a]" : "bg-gold/70")} />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={clsx("block truncate text-sm font-semibold transition-colors", handled ? "text-cream/60" : "text-cream")}>
                        {m.from}
                      </span>
                      <span className="block truncate text-sm text-grey">{m.subject}</span>
                    </span>
                    {handled ? (
                      <span className="enter hidden shrink-0 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[0.7rem] font-medium text-emerald-400 sm:inline" style={{ "--enter-y": "0px", "--enter-duration": "0.3s" } as React.CSSProperties}>
                        {t.handled[m.kind]}
                      </span>
                    ) : (
                      <span className="shrink-0 font-mono text-xs text-grey">{m.time}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="border-t border-cream/[0.08] px-5 py-3 text-xs text-grey" aria-live="polite">
              {withValor && unread === 0 ? <span className="text-emerald-400">{t.allDone}</span> : t.sample}
            </p>
          </div>
          </div>

          {/* The three jobs it creates */}
          <ul className="grid min-w-0 gap-3">
            {t.pains.map((p, i) => {
              const Icon = icons[i];
              const on = active === i;
              const count = t.mails.filter((m) => m.kind === i).length;
              return (
                <li key={p.title}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(on ? null : i)}
                    className={clsx(
                      "flex w-full items-start gap-5 rounded-3xl border p-6 text-left transition-[border-color,background-color,transform] duration-300",
                      on
                        ? "border-[#e0795a]/60 bg-[#e0795a]/[0.07] lg:-translate-x-1"
                        : "border-cream/[0.08] bg-charcoal/60 hover:border-[#e0795a]/40",
                    )}
                  >
                    <span
                      className={clsx(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-colors duration-300",
                        on ? "border-[#e0795a] bg-[#e0795a] text-obsidian" : "border-[#e0795a]/40 text-[#e0795a]",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-xl font-semibold leading-snug text-cream">{p.title}</span>
                        <span className="shrink-0 font-mono text-xs text-[#e0795a]">×{count}</span>
                      </span>
                      <span className="mt-2 block text-[0.95rem] leading-relaxed text-grey">{p.text}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
