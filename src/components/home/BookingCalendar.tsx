import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { IconCalendar } from "@/components/Icons";
import { brand } from "@/config/brand";
import type { Dict, Locale } from "@/i18n";

const ui: Dict<{ title: string; sub: string; points: string[]; cta: string; note: string }> = {
  en: {
    title: "Book a discovery call",
    sub: "20 minutes. We find where the manual work is and what it costs.",
    points: ["Free, no commitment", "In English or Slovenian", "You leave with a clear next step"],
    cta: "Choose a time",
    note: "Opens our booking calendar in a new tab.",
  },
  sl: {
    title: "Rezervirajte uvodni klic",
    sub: "20 minut. Poiščemo, kje je ročno delo in koliko vas stane.",
    points: ["Brezplačno, brez obveznosti", "V slovenščini ali angleščini", "Odidete z jasnim naslednjim korakom"],
    cta: "Izberite termin",
    note: "Koledar za rezervacije se odpre v novem zavihku.",
  },
};

/**
 * Booking call to action. The Notion booking page cannot be embedded (its
 * frame-ancestors policy blocks other sites), so this opens it in a new tab.
 */
export default function BookingCalendar({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale];
  return (
    <section id="book" className="border-t border-cream/[0.06] py-24 md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="font-display t-section text-cream">{t.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-grey">{t.sub}</p>

          <div className="mt-12 flex flex-col items-center gap-8 rounded-3xl border border-cream/[0.08] bg-charcoal px-6 py-14 md:px-12">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
              <IconCalendar className="h-6 w-6" />
            </span>
            <ul className="flex flex-col gap-3 text-sm text-cream md:flex-row md:gap-8">
              {t.points.map((p) => (
                <li key={p} className="flex items-center justify-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-pulse inline-flex items-center gap-2 rounded-pill bg-gold px-8 py-3.5 text-sm font-semibold text-obsidian transition-colors hover:bg-gold-light"
            >
              {t.cta}
              <span aria-hidden="true">→</span>
            </a>
            <p className="text-xs text-grey">{t.note}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
