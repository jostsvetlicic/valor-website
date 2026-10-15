import { Container } from "@/components/Container";
import BeforeAfter from "@/components/home/BeforeAfter";
import LogoTicker from "@/components/home/LogoTicker";
import Link from "next/link";
import { BookCallButton } from "@/components/Button";
import { brand } from "@/config/brand";
import HeroParticles from "@/components/home/HeroParticles";
import { href, type Dict, type Locale } from "@/i18n";

// Headline, split so each word can enter on its own beat.
type Word = { text: string; gold?: boolean };
const words = (line: string, goldFrom: number): Word[] =>
  line.split(" ").map((text, i) => ({ text, gold: i >= goldFrom }));

const copy: Dict<{ headline: Word[]; description: string; book: string; solutions: string; demo: string }> = {
  en: {
    headline: words("We build the system your business runs on.", 4),
    description: brand.description,
    book: "Book a discovery call",
    solutions: "See solutions",
    demo: "Try the interactive demo",
  },
  sl: {
    headline: words("Gradimo sistem, na katerem deluje vaše podjetje.", 2),
    description: brand.descriptionSl,
    book: "Rezervirajte uvodni klic",
    solutions: "Poglejte rešitve",
    demo: "Preizkusite interaktivni demo",
  },
};

const WORD_START_MS = 120;
const WORD_STEP_MS = 55;
const WORDS_TOTAL = Math.max(copy.en.headline.length, copy.sl.headline.length);
const afterHeadline = (extra: number) => `${WORD_START_MS + WORDS_TOTAL * WORD_STEP_MS + extra}ms`;

const demoEnter = {
  "--enter-y": "24px",
  "--enter-duration": "0.8s",
  "--enter-delay": "300ms",
} as React.CSSProperties;

/**
 * Homepage hero, one viewport tall: headline + CTA left, the Before/After
 * demo right, and the client ticker along the bottom so social proof is
 * visible before any scroll. On mobile the ticker sits between the text and
 * the demo for the same reason.
 */
export default function Hero({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const headline = [t.headline];
  return (
    <section className="surface-base relative isolate flex min-h-[100svh] flex-col overflow-hidden pb-6 pt-24 lg:pt-28">
      <HeroParticles />
      <Container className="relative flex flex-1 items-center">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Left: the quiet type */}
          <div>
            <h1 className="font-display t-hero text-cream text-balance">
              {headline.map((line, li) => (
                <span key={li} className="block">
                  {line.map((word, wi) => {
                    const index = headline.slice(0, li).flat().length + wi;
                    return (
                      <span key={wi}>
                        <span
                          className={`enter inline-block${word.gold ? " text-gold" : ""}`}
                          style={
                            {
                              "--enter-y": "14px",
                              "--enter-duration": "0.5s",
                              "--enter-delay": `${WORD_START_MS + index * WORD_STEP_MS}ms`,
                            } as React.CSSProperties
                          }
                        >
                          {word.text}
                        </span>
                        {wi < line.length - 1 && " "}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <p
              style={
                {
                  "--enter-duration": "0.7s",
                  "--enter-delay": "0ms",
                } as React.CSSProperties
              }
              className="enter-settle mt-6 max-w-xl text-lg leading-relaxed text-grey"
            >
              {t.description}
            </p>

            <div
              style={
                {
                  "--enter-duration": "0.55s",
                  "--enter-delay": afterHeadline(80),
                } as React.CSSProperties
              }
              className="enter mt-8 flex flex-wrap items-center gap-3"
            >
              <BookCallButton
                href={brand.bookingUrl}
                label={t.book}
                className="cta-pulse"
              />
              <Link
                href={href(locale, "/solutions")}
                className="inline-flex items-center gap-2 rounded-pill border border-cream/25 px-6 py-3 text-[0.9375rem] font-medium text-cream transition-colors hover:border-gold hover:text-gold"
              >
                {t.solutions}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <Link
              href={href(locale, "/demo")}
              style={{ "--enter-delay": afterHeadline(160) } as React.CSSProperties}
              className="enter tap-area mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-light"
            >
              {t.demo}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Right: Before / After demo (desktop position) */}
          <div style={demoEnter} className="enter hidden lg:block">
            <BeforeAfter locale={locale} />
          </div>
        </div>
      </Container>

      {/* Social proof, inside the first viewport */}
      <div style={{ "--enter-delay": afterHeadline(200) } as React.CSSProperties} className="enter relative mt-8">
        <LogoTicker compact locale={locale} />
      </div>

      {/* Before / After demo (mobile position, after the ticker) */}
      <Container className="relative mt-6 lg:hidden">
        <div style={demoEnter} className="enter">
          <BeforeAfter locale={locale} />
        </div>
      </Container>
    </section>
  );
}
