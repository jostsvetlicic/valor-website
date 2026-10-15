import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import BookingSteps from "@/components/BookingSteps";
import ShinyText from "@/components/reactbits/ShinyText";
import StarBookButton from "@/components/StarBookButton";
import type { Dict, Locale } from "@/i18n";

const ui: Dict<{
  lead: string;
  gold: string;
  sub: string;
  cta: string;
  note: string;
}> = {
  en: {
    lead: "Ready to stop doing it",
    gold: "manually?",
    sub: "Book a free 20-minute discovery call, in English or Slovenian. We find where the manual work is and what it costs.",
    cta: "Choose a time",
    note: "Opens our booking calendar in a new tab.",
  },
  sl: {
    lead: "Pripravljeni, da prenehate z",
    gold: "ročnim delom?",
    sub: "Rezervirajte brezplačen 20-minutni uvodni klic, v slovenščini ali angleščini. Poiščemo, kje je ročno delo in koliko vas stane.",
    cta: "Izberite termin",
    note: "Koledar za rezervacije se odpre v novem zavihku.",
  },
};

/**
 * The homepage's closing chapter (#book): the question, the five steps that
 * follow a booking (so the visitor knows the risk is small: a free call, a
 * one-week test, then a pilot), and the booking button, on one rounded card
 * with a dark gold gradient. The Notion booking page cannot be embedded, so
 * the button opens it in a new tab.
 */
export default function ClosingCta({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale];
  return (
    <section id="book" className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div
            className="relative isolate overflow-hidden rounded-[2rem] border border-gold/25 px-6 py-16 text-center md:px-12 md:py-20"
            style={{
              background:
                "radial-gradient(90% 120% at 50% 0%, rgba(201,168,76,0.32) 0%, rgba(201,168,76,0.08) 45%, transparent 75%), linear-gradient(160deg, #2a2110 0%, #17130b 50%, #0f0d09 100%)",
            }}
          >
            <h2 className="mx-auto max-w-3xl font-display t-statement text-cream text-balance">
              {t.lead}{" "}
              <span className="motion-keep inline-block">
                <ShinyText color="#C9A84C" shineColor="#FFF4D6" speed={3.2} delay={1.6} shineWidth={30} glow={0.25}>
                  {t.gold}
                </ShinyText>
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/80">{t.sub}</p>

            {/* What happens after you book: the five steps, joined by a line */}
            <BookingSteps locale={locale} className="mx-auto mt-12 max-w-5xl" />

            {/* React Bits StarBorder: a light travels around the button's edge. */}
            <StarBookButton label={t.cta} className="mt-12" />
            <p className="mt-4 text-xs text-cream/60">{t.note}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
