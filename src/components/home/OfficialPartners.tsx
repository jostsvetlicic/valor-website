import { Container } from "@/components/Container";
import { FEATURES } from "@/config/features";
import { officialPartners, type OfficialPartner } from "@/content/officialPartners";
import type { Dict, Locale } from "@/i18n";

const ui: Dict<{ label: string; preview: string }> = {
  en: { label: "Official partners", preview: "Preview: hidden on the live site until the partnership is confirmed" },
  sl: { label: "Uradni partnerji", preview: "Predogled: skrito na živi strani, dokler partnerstvo ni potrjeno" },
};

/** Repeat the list so one copy is always wider than the screen. */
const REPEAT = 6;

function Item({ p }: { p: OfficialPartner }) {
  return (
    <li className="flex shrink-0 items-center gap-10 pr-10">
      <span className="flex items-baseline gap-2">
        {p.logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- partner badge, arbitrary aspect ratio
          <img src={p.logoSrc} alt={p.name} className="h-7 w-auto opacity-90" />
        ) : (
          <span className="font-display text-2xl font-semibold tracking-tight text-cream md:text-3xl">{p.name}</span>
        )}
        {p.detail && <span className="text-sm font-medium text-gold">{p.detail}</span>}
      </span>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold/50" />
    </li>
  );
}

/**
 * "Official partners" band: a label, a gold line with an arrow travelling
 * along it, then the partners gliding past in an endless strip. Off on the
 * live site until FEATURES.officialPartners is on; previewed in development.
 */
export default function OfficialPartners({ locale = "en" }: { locale?: Locale }) {
  const dev = process.env.NODE_ENV === "development";
  if ((!FEATURES.officialPartners && !dev) || officialPartners.length === 0) return null;
  const t = ui[locale];
  const items = Array.from({ length: REPEAT }, () => officialPartners).flat();

  return (
    <section aria-label={t.label} className="motion-keep surface-base py-12 md:py-16">
      <Container>
        {!FEATURES.officialPartners && (
          <p className="mb-5 inline-block rounded-full border border-dashed border-gold/40 px-3 py-1 text-xs text-gold">
            {t.preview}
          </p>
        )}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
          <div className="flex shrink-0 items-center gap-4 md:w-[22rem]">
            <span className="eyebrow whitespace-nowrap">{t.label}</span>
            <span aria-hidden="true" className="partner-line relative h-px flex-1 bg-gold/25">
              <svg viewBox="0 0 16 16" className="partner-arrow absolute top-1/2 h-4 w-4 -translate-y-1/2 text-gold" fill="none">
                <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <div className="partner-marquee relative min-w-0 flex-1 overflow-hidden">
            <div className="partner-track flex w-max">
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 items-center">
                  {items.map((p, i) => (
                    <Item key={`${copy}-${i}`} p={p} />
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
