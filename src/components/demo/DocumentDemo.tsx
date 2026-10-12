"use client";

import { useEffect, useRef, useState } from "react";
import { brand } from "@/config/brand";
import { demoSamples } from "@/content/demo";
import type { Dict, Locale } from "@/i18n";
import { clsx } from "@/lib/clsx";

type Phase = "idle" | "reading" | "extracting" | "checking" | "ready" | "approved";

const copy: Dict<{
  steps: string[];
  run: string;
  again: string;
  approve: string;
  status: Record<"idle" | "reading" | "extracting" | "checking", string>;
  ready: (n: number, f: number) => string;
  elapsed: string;
  inbox: string;
  attachment: string;
  flagged: string;
  note: string;
  ownTitle: string;
  ownText: string;
  ownCta: string;
}> = {
  en: {
    steps: ["Read", "Extract", "Check", "Ready for review"],
    run: "Run the agent",
    again: "Run again",
    approve: "Approve draft",
    status: {
      idle: "Waiting for you to run the agent.",
      reading: "Reading the email and attachment…",
      extracting: "Drafting the data…",
      checking: "Checking for exceptions…",
    },
    ready: (n, f) => `${n} lines drafted, ${f} flagged for a person to review.`,
    elapsed: "Agent time",
    inbox: "Inbox",
    attachment: "Attachment",
    flagged: "Flagged for review",
    note: "Sample data with fictional companies. Nothing is sent anywhere.",
    ownTitle: "Your own documents?",
    ownText:
      "That is what the one-week test is for: we run the agent on your real documents and measure the minutes before and after.",
    ownCta: "Book a discovery call",
  },
  sl: {
    steps: ["Branje", "Zajem", "Preverjanje", "Pripravljeno za pregled"],
    run: "Zaženi agenta",
    again: "Zaženi znova",
    approve: "Odobri osnutek",
    status: {
      idle: "Čaka, da zaženete agenta.",
      reading: "Branje e-pošte in priloge…",
      extracting: "Pripravljanje podatkov…",
      checking: "Iskanje odstopanj…",
    },
    ready: (n, f) => `Pripravljenih vrstic: ${n}. Za pregled označenih: ${f}.`,
    elapsed: "Čas agenta",
    inbox: "Prejeto",
    attachment: "Priloga",
    flagged: "Označeno za pregled",
    note: "Vzorčni podatki z izmišljenimi podjetji. Nič se nikamor ne pošlje.",
    ownTitle: "Vaši dokumenti?",
    ownText:
      "Za to je tedenski test: agenta poženemo na vaših pravih dokumentih in izmerimo minute prej in potem.",
    ownCta: "Rezervirajte uvodni klic",
  },
};

const STEP_INDEX: Record<Phase, number> = { idle: -1, reading: 0, extracting: 1, checking: 2, ready: 3, approved: 3 };

export default function DocumentDemo({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const [sampleId, setSampleId] = useState(demoSamples[0].id);
  const [phase, setPhase] = useState<Phase>("idle");
  const [rowsShown, setRowsShown] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timers = useRef<number[]>([]);
  const startedAt = useRef(0);

  const sample = demoSamples.find((s) => s.id === sampleId) ?? demoSamples[0];
  const rows = sample.table.rows[locale];
  const flaggedRows = new Set(sample.flags.map((f) => f.row));
  const showFlags = phase === "ready" || phase === "approved";

  const clear = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));

  const run = (e: React.MouseEvent) => {
    clear();
    setRowsShown(0);
    setElapsed(0);
    startedAt.current = e.timeStamp;
    const finish = () => {
      setPhase("ready");
      setElapsed(performance.now() - startedAt.current);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRowsShown(rows.length);
      finish();
      return;
    }
    setPhase("reading");
    const READ = 1100;
    const ROW = 320;
    at(READ, () => setPhase("extracting"));
    rows.forEach((_, i) => at(READ + (i + 1) * ROW, () => setRowsShown(i + 1)));
    const checkAt = READ + rows.length * ROW + 250;
    at(checkAt, () => setPhase("checking"));
    at(checkAt + 900, finish);
  };

  const pick = (id: string) => {
    clear();
    setSampleId(id);
    setPhase("idle");
    setRowsShown(0);
    setElapsed(0);
  };

  const step = STEP_INDEX[phase];
  const statusText =
    phase === "ready" || phase === "approved"
      ? t.ready(rows.length, sample.flags.length)
      : t.status[phase as keyof typeof t.status];

  return (
    <div>
      {/* Sample picker */}
      <div role="tablist" aria-label="Samples" className="flex flex-wrap justify-center gap-2">
        {demoSamples.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={s.id === sampleId}
            onClick={() => pick(s.id)}
            className={clsx(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
              s.id === sampleId
                ? "border-gold bg-gold text-obsidian"
                : "border-cream/15 text-cream hover:border-gold/60 hover:text-gold",
            )}
          >
            {s.label[locale]}
          </button>
        ))}
      </div>

      {/* Steps */}
      <ol className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs">
        {t.steps.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={clsx(
                "rounded-full border px-3 py-1 font-medium transition-colors duration-300",
                i < step || phase === "ready" || phase === "approved"
                  ? "border-emerald-400/50 text-emerald-400"
                  : i === step
                    ? "border-gold text-gold"
                    : "border-cream/15 text-grey",
              )}
            >
              {i + 1}. {label}
            </span>
            {i < t.steps.length - 1 && <span aria-hidden="true" className="text-grey">→</span>}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        {/* The incoming document */}
        <div className="relative min-w-0 overflow-hidden rounded-3xl border border-cream/[0.08] bg-charcoal p-6 md:p-7">
          {phase === "reading" && <span aria-hidden="true" className="demo-scan pointer-events-none absolute inset-x-0 h-16" />}
          <p className="text-xs uppercase tracking-[0.14em] text-grey">{t.inbox}</p>
          <p className="mt-4 font-mono text-xs text-grey">{sample.from}</p>
          <p className="mt-2 text-base font-semibold text-cream">{sample.subject[locale]}</p>
          <p className="mt-4 text-sm leading-relaxed text-grey">{sample.body[locale]}</p>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-cream/10 bg-obsidian px-4 py-3">
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e0795a]/40 font-mono text-[0.6rem] text-[#e0795a]">
              PDF
            </span>
            <span className="min-w-0">
              <span className="block text-[0.7rem] uppercase tracking-[0.14em] text-grey">{t.attachment}</span>
              <span className="block truncate text-sm text-cream">{sample.attachment}</span>
            </span>
          </div>
        </div>

        {/* The ERP draft (min-w-0 lets the table scroll instead of widening the page) */}
        <div className="min-w-0 rounded-3xl border border-cream/[0.08] bg-charcoal p-6 md:p-7">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-cream">{sample.table.title[locale]}</p>
            <p className="font-mono text-xs tabular-nums text-grey">
              {t.elapsed}: {(elapsed / 1000).toFixed(1)} s
            </p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[22rem] text-left text-sm">
              <thead>
                <tr className="border-b border-cream/10 text-xs uppercase tracking-[0.1em] text-grey">
                  {sample.table.columns[locale].map((c) => (
                    <th key={c} scope="col" className="py-2 pr-3 font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={r.join("|")}
                    className={clsx(
                      "border-b border-cream/[0.06] transition-[opacity,background-color] duration-300",
                      i < rowsShown ? "opacity-100" : "opacity-0",
                      showFlags && flaggedRows.has(i) && "bg-[#e0795a]/10",
                    )}
                  >
                    {r.map((cell, j) => (
                      <td key={j} className={clsx("py-2 pr-3", j === 0 ? "font-mono text-xs text-grey" : "text-cream")}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showFlags && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e0795a]">{t.flagged}</p>
              <ul className="mt-2 space-y-2">
                {sample.flags.map((f) => (
                  <li key={f.row} className="flex gap-2 text-sm text-cream">
                    <span aria-hidden="true" className="text-[#e0795a]">!</span>
                    {f.text[locale]}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-5 text-sm text-grey" aria-live="polite">
            {phase === "approved" ? sample.approved[locale] : statusText}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {(phase === "idle" || phase === "ready" || phase === "approved") && (
              <button
                type="button"
                onClick={run}
                className={clsx(
                  "rounded-full px-6 py-3 text-[0.9375rem] font-semibold transition-colors",
                  phase === "idle"
                    ? "cta-pulse bg-gold text-obsidian hover:bg-gold-light"
                    : "border border-cream/20 text-cream hover:border-gold hover:text-gold",
                )}
              >
                {phase === "idle" ? t.run : t.again}
              </button>
            )}
            {phase === "ready" && (
              <button
                type="button"
                onClick={() => setPhase("approved")}
                className="rounded-full bg-emerald-400 px-6 py-3 text-[0.9375rem] font-semibold text-obsidian transition-opacity hover:opacity-90"
              >
                {t.approve}
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-grey">{t.note}</p>

      <div className="mx-auto mt-14 max-w-3xl rounded-[2rem] border border-gold/25 bg-charcoal px-6 py-12 text-center md:px-12">
        <h2 className="font-display t-subhead text-cream">{t.ownTitle}</h2>
        <p className="mx-auto mt-3 max-w-xl t-lead text-grey">{t.ownText}</p>
        <a
          href={brand.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[0.9375rem] font-semibold text-obsidian transition-colors hover:bg-gold-light"
        >
          {t.ownCta}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
