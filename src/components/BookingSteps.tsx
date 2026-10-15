import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { processStepsByLocale } from "@/content/process";
import { href, type Dict, type Locale } from "@/i18n";

const ui: Dict<{ title: string; full: string }> = {
  en: { title: "What happens after you book", full: "The full process" },
  sl: { title: "Kaj se zgodi, ko rezervirate", full: "Celoten proces" },
};

/**
 * The five steps that follow a booking (free call, one-week test, pilot,
 * project, support), joined by a line on desktop. Shown in the homepage's
 * closing card and on the contact page.
 */
export default function BookingSteps({ locale = "en", className }: { locale?: Locale; className?: string }) {
  const t = ui[locale];
  const steps = processStepsByLocale[locale];
  return (
    <div className={`text-left ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-[0.8rem]">{t.title}</p>
        <Link
          href={href(locale, "/process")}
          className="group hidden items-center gap-1.5 text-sm font-medium text-cream/80 transition-colors hover:text-gold sm:inline-flex"
        >
          {t.full}
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
      <RevealGroup as="ol" stagger={0.08} className="relative mt-5 grid gap-3 md:grid-cols-5 md:gap-0">
        <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-5 hidden h-px bg-gold/30 md:block" />
        {steps.map((s, i) => (
          <RevealItem
            as="li"
            key={s.number}
            className="relative flex items-start gap-4 rounded-2xl border border-gold/15 bg-black/20 p-4 md:flex-col md:items-center md:border-0 md:bg-transparent md:p-0 md:px-2 md:text-center"
          >
            <span
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold ${
                i === 0 ? "bg-gold text-obsidian" : "border border-gold/40 bg-[#17130b] text-gold"
              }`}
            >
              {s.number}
            </span>
            <span className="md:mt-4">
              <span className="block font-semibold text-cream">{s.title}</span>
              <span className="mt-0.5 block text-sm text-cream/70">{s.line}</span>
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
