import { Container } from "@/components/Container";
import { techStack, type Tech } from "@/content/techStack";
import type { Dict, Locale } from "@/i18n";

const ui: Dict<{ label: string }> = {
  en: { label: "Partners and platforms we work with" },
  sl: { label: "Partnerji in platforme, s katerimi delamo" },
};

/** Repeat the list so one copy is always wider than the screen. */
const REPEAT = 4;

function Item({ t }: { t: Tech }) {
  return (
    <li className="group flex shrink-0 items-center gap-3 px-8 md:px-10">
      {/* Logo file used as a stencil so every mark shares one colour. */}
      <span
        aria-hidden="true"
        className="h-7 w-7 bg-cream/80 transition-colors duration-300 group-hover:bg-gold md:h-8 md:w-8"
        style={{
          WebkitMaskImage: `url(${t.logo})`,
          maskImage: `url(${t.logo})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
      <span className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-cream/85 transition-colors duration-300 group-hover:text-gold md:text-2xl">
        {t.name}
      </span>
    </li>
  );
}

/**
 * "Partners and platforms we work with": the logos glide left to right in an
 * endless strip (the track holds the list twice), pausing on hover.
 */
export default function TechStrip({ locale = "en" }: { locale?: Locale }) {
  if (techStack.length === 0) return null;
  const t = ui[locale];
  const items = Array.from({ length: REPEAT }, () => techStack).flat();

  return (
    <section aria-label={t.label} className="motion-keep surface-base py-10 md:py-14">
      <Container>
        <p className="eyebrow text-center">{t.label}</p>
      </Container>
      <div className="tech-marquee relative mt-6 overflow-hidden md:mt-8">
        <div className="tech-track flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 items-center">
              {items.map((it, i) => (
                <Item key={`${copy}-${i}`} t={it} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
