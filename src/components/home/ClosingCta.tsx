import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/config/brand";
import type { Dict, Locale } from "@/i18n";

const ui: Dict<{ lead: string; gold: string; sub: string; points: string[]; cta: string; note: string }> = {
  en: {
    lead: "Ready to stop doing it",
    gold: "manually?",
    sub: "Book a 20-minute discovery call. We find where the manual work is and what it costs.",
    points: ["Free, no commitment", "In English or Slovenian", "You leave with a clear next step"],
    cta: "Choose a time",
    note: "Opens our booking calendar in a new tab.",
  },
  sl: {
    lead: "Pripravljeni, da prenehate z",
    gold: "ročnim delom?",
    sub: "Rezervirajte 20-minutni uvodni klic. Poiščemo, kje je ročno delo in koliko vas stane.",
    points: ["Brezplačno, brez obveznosti", "V slovenščini ali angleščini", "Odidete z jasnim naslednjim korakom"],
    cta: "Izberite termin",
    note: "Koledar za rezervacije se odpre v novem zavihku.",
  },
};

/**
 * Closing call to action and the homepage's one booking section (#book):
 * a rounded card on a dark gold gradient. The Notion booking page cannot be
 * embedded, so the button opens it in a new tab.
 */
export default function ClosingCta({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale];
  return (
    <section id="book" className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div
            className="relative isolate overflow-hidden rounded-[2rem] border border-gold/25 px-6 py-20 text-center md:px-12 md:py-24"
            style={{
              background:
                "radial-gradient(90% 120% at 50% 0%, rgba(201,168,76,0.32) 0%, rgba(201,168,76,0.08) 45%, transparent 75%), linear-gradient(160deg, #2a2110 0%, #17130b 50%, #0f0d09 100%)",
            }}
          >
            <h2 className="mx-auto max-w-3xl font-display t-statement text-cream text-balance">
              {t.lead} <span className="text-gold">{t.gold}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/80">{t.sub}</p>
            <ul className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-cream md:flex-row md:gap-8">
              {t.points.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-pulse group mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[0.95rem] font-semibold text-obsidian transition-colors hover:bg-gold-light"
            >
              {t.cta}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <p className="mt-4 text-xs text-cream/60">{t.note}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
