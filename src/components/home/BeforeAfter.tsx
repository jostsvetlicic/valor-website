import { clsx } from "@/lib/clsx";

import type { Dict, Locale } from "@/i18n";

// One customer order, handled by hand (left) and by a VALOR agent (right).
const copy: Dict<{
  before: string[];
  after: { title: string; done: string }[];
  opening: string;
  typing: string;
  checking: string;
  notStarted: string;
  beforeLabel: string;
  afterLabel: string;
  automated: string;
  inbox: string;
  waitingSuffix: string;
  zeroWaiting: string;
  linePrefix: string;
  lineOf: string;
  queued: string;
  footer: string;
  summary: string;
  aria: string;
}> = {
  en: {
    before: ["Order email from customer", "Retype 14 lines into ERP", "Check prices and stock", "Send confirmation"],
    after: [
      { title: "Order email read", done: "Read in seconds" },
      { title: "Draft order created in ERP", done: "14 lines drafted" },
      { title: "Exceptions flagged for review", done: "2 lines flagged for a person" },
      { title: "Confirmation sent", done: "Sent" },
    ],
    opening: "PDF attached, opening it…",
    typing: "SKU 40118, qty 24, 3.80 EUR",
    checking: "Checking price list",
    notStarted: "Not started yet…",
    beforeLabel: "Before VALOR",
    afterLabel: "After VALOR",
    automated: "Automated",
    inbox: "Inbox",
    waitingSuffix: "orders waiting",
    zeroWaiting: "0 orders waiting",
    linePrefix: "Line",
    lineOf: "of 14",
    queued: "Queued",
    footer: "Same order, side by side",
    summary: "Order handled in seconds",
    aria: "Before VALOR: a person opens an order email, retypes 14 lines into the ERP, checks prices and stock, then sends a confirmation, while more orders wait. After VALOR: the same order is read, drafted in the ERP, exceptions are flagged for a person to review, and the confirmation is sent, in seconds.",
  },
  sl: {
    before: ["Naročilo kupca po e-pošti", "Pretipkajte 14 vrstic v ERP", "Preverite cene in zalogo", "Pošljite potrditev"],
    after: [
      { title: "E-pošta z naročilom prebrana", done: "Prebrano v nekaj sekundah" },
      { title: "Osnutek naročila ustvarjen v ERP", done: "14 vrstic pripravljenih" },
      { title: "Odstopanja označena za pregled", done: "2 vrstici označeni za človeka" },
      { title: "Potrditev poslana", done: "Poslano" },
    ],
    opening: "Priložen PDF, odpiram…",
    typing: "SKU 40118, kol. 24, 3,80 EUR",
    checking: "Preverjam cenik",
    notStarted: "Še ni začeto…",
    beforeLabel: "Pred VALOR",
    afterLabel: "Z VALOR",
    automated: "Avtomatizirano",
    inbox: "Prejeto",
    waitingSuffix: "naročil čaka",
    zeroWaiting: "0 naročil čaka",
    linePrefix: "Vrstica",
    lineOf: "od 14",
    queued: "V vrsti",
    footer: "Isto naročilo, drug ob drugem",
    summary: "Naročilo obdelano v nekaj sekundah",
    aria: "Pred VALOR: oseba odpre e-pošto z naročilom, pretipka 14 vrstic v ERP, preveri cene in zalogo ter pošlje potrditev, medtem ko čakajo nova naročila. Z VALOR: isto naročilo je v nekaj sekundah prebrano, pripravljeno v ERP, odstopanja so označena za pregled in potrditev je poslana.",
  },
};

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}

function BeforeStatus({ index, t }: { index: number; t: (typeof copy)["en"] }) {
  if (index === 0) {
    return <span className="text-[0.68rem] text-grey">{t.opening}</span>;
  }
  if (index === 1) {
    return (
      <span className="block">
        <span className="block truncate rounded-md border border-cream/10 bg-obsidian px-2 py-1 font-mono text-[0.68rem] text-cream/80">
          <span className="ba-type">{t.typing}</span>
          <span className="ba-caret text-gold">|</span>
        </span>
        <span
          className="ba-line mt-1 block font-mono text-[0.62rem] tabular-nums text-grey"
          data-prefix={t.linePrefix}
          data-of={t.lineOf}
        />
      </span>
    );
  }
  if (index === 3) {
    return <span className="text-[0.7rem] text-grey">{t.notStarted}</span>;
  }
  return (
    <span className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2">
      <span className="block h-1 w-full overflow-hidden rounded-full bg-cream/10 sm:flex-1">
        <span className="ba-slow block h-full origin-left rounded-full bg-[#e0795a]/70" />
      </span>
      <span className="shrink-0 text-[0.68rem] text-grey">{t.checking}</span>
    </span>
  );
}

/**
 * Hero demo: one customer order handled by hand (left) and by a VALOR agent
 * (right). One 8s CSS loop (see `.ba-*` in globals.css), no JS, so it plays
 * even before hydration. It is a showcase, so it keeps playing under the OS
 * "reduce motion" setting (`.motion-keep`); it only fades and counts.
 */
export default function BeforeAfter({ className, locale = "en" }: { className?: string; locale?: Locale }) {
  const t = copy[locale];
  return (
    <div
      role="img"
      aria-label={t.aria}
      className={clsx(
        "motion-keep w-full overflow-hidden rounded-3xl border border-cream/[0.1] bg-charcoal shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div className="grid grid-cols-2">
        {/* BEFORE */}
        <div className="border-r border-cream/[0.08] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#e0795a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e0795a]" aria-hidden="true" />
              {t.beforeLabel}
            </span>
            <span className="ba-clock hidden font-mono text-[0.68rem] tabular-nums text-grey sm:inline" />
          </div>
          <p className="mt-1 text-[0.68rem] text-grey">
            {t.inbox} · <span className="ba-unread font-mono tabular-nums text-[#e0795a]" data-suffix={t.waitingSuffix} />
          </p>
          <ul className="mt-4 space-y-3">
            {t.before.map((title, i) => (
              <li key={title} className="rounded-lg border border-cream/[0.06] p-2.5">
                <p className="truncate text-[0.75rem] font-medium text-cream sm:text-[0.8rem]">{title}</p>
                <div className="mt-2">
                  <BeforeStatus index={i} t={t} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* AFTER */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-emerald-400">
              <span className="ops-live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              {t.afterLabel}
            </span>
            <span className="hidden text-[0.68rem] text-grey sm:inline">{t.automated}</span>
          </div>
          <p className="mt-1 text-[0.68rem] text-grey">
            {t.inbox} · <span className="font-mono text-emerald-400">{t.zeroWaiting}</span>
          </p>
          <ul className="mt-4 space-y-3">
            {t.after.map((row, i) => (
              <li key={row.title} className={`ba-row-${i + 1} rounded-lg border border-cream/[0.06] p-2.5`}>
                <p className="truncate text-[0.75rem] font-medium text-cream sm:text-[0.8rem]">{row.title}</p>
                <div className="relative mt-2 h-[1.35rem]">
                  <span className="ba-pending absolute inset-0 flex items-center gap-2 text-[0.68rem] text-grey">
                    <span className="ba-spin h-3 w-3 rounded-full border border-cream/20 border-t-emerald-400" aria-hidden="true" />
                    {t.queued}
                  </span>
                  <span className="ba-done absolute inset-0 flex items-center gap-2 text-[0.68rem] text-emerald-400">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-obsidian">
                      <Check />
                    </span>
                    <span className="truncate">{row.done}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-cream/[0.08] px-4 py-3 sm:px-5">
        <span className="text-[0.7rem] text-grey">{t.footer}</span>
        <span className="ba-summary flex items-center gap-1.5 text-[0.7rem] font-medium text-emerald-400">
          <Check />
          {t.summary}
        </span>
      </div>
    </div>
  );
}
