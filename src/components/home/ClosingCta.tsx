import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import ShinyText from "@/components/reactbits/ShinyText";
import StarBorder from "@/components/reactbits/StarBorder";
import { brand } from "@/config/brand";
import { processStepsByLocale } from "@/content/process";
import { href, type Dict, type Locale } from "@/i18n";

const ui: Dict<{
  lead: string;
  gold: string;
  sub: string;
  stepsTitle: string;
  full: string;
  cta: string;
  note: string;
}> = {
  en: {
    lead: "Ready to stop doing it",
    gold: "manually?",
    sub: "Book a free 20-minute discovery call, in English or Slovenian. We find where the manual work is and what it costs.",
    stepsTitle: "What happens after you book",
    full: "The full process",
    cta: "Choose a time",
    note: "Opens our booking calendar in a new tab.",
  },
  sl: {
    lead: "Pripravljeni, da prenehate z",
    gold: "ročnim delom?",
    sub: "Rezervirajte brezplačen 20-minutni uvodni klic, v slovenščini ali angleščini. Poiščemo, kje je ročno delo in koliko vas stane.",
    stepsTitle: "Kaj se zgodi, ko rezervirate",
    full: "Celoten proces",
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
  const steps = processStepsByLocale[locale];
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
            <div className="mx-auto mt-12 max-w-5xl text-left">
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow text-[0.8rem]">{t.stepsTitle}</p>
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

            {/* React Bits StarBorder: a light travels around the button's edge. */}
            <div className="motion-keep mt-12 flex justify-center">
              <StarBorder
                as="a"
                href={brand.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="#FFF4D6"
                trailColor="#C9A84C"
                backgroundColor="#C9A84C"
                textColor="#0A0A0A"
                borderColor="rgba(201,168,76,0.35)"
                radius={999}
                thickness={2}
                duration={4}
                glow={0.6}
                hover="lap"
                className="group text-base font-semibold shadow-[0_12px_40px_-8px_rgba(201,168,76,0.65)]"
                style={{ padding: "1rem 2rem" }}
              >
                <span className="inline-flex items-center gap-2">
                  {t.cta}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </StarBorder>
            </div>
            <p className="mt-4 text-xs text-cream/60">{t.note}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
