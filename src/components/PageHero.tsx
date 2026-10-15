import { Container } from "./Container";
import Sparkle from "./Sparkle";
import Breadcrumbs from "./Breadcrumbs";
import HeroParticles from "./home/HeroParticles";
import type { Locale } from "@/i18n";
import type { Crumb } from "@/lib/seo";

/**
 * Shared hero for interior pages. It opens the same way as the homepage: the
 * drifting gold dot field, gold light from above, and the text entering in
 * steps. Pages can add an `aside` (a card about that page: the founder on
 * About, who you will talk to on Contact), shown on the right on desktop and
 * under the text on phones.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  aside,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Breadcrumb trail after "Home"; the last item is this page. */
  crumbs?: { locale: Locale; items: Crumb[] };
  aside?: React.ReactNode;
}) {
  return (
    <section className="surface-warm relative isolate overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
      <HeroParticles />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[34rem] w-[60rem] max-w-[160vw] -translate-x-1/2 bg-radial-gold opacity-80" />
      {/* Soft fade at the bottom so the dot field melts into the next section. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-[color:var(--color-obsidian)] opacity-60" />
      <Container className="relative">
        <div className={aside ? "grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16" : undefined}>
          <div className="enter" style={{ "--enter-y": "20px", "--enter-duration": "0.8s" } as React.CSSProperties}>
            {crumbs && <Breadcrumbs locale={crumbs.locale} items={crumbs.items} />}
            <div className="flex items-center gap-3">
              <Sparkle className="h-6 w-5" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <h1 className="mt-6 max-w-4xl font-display t-page text-cream text-balance">{title}</h1>
            {intro && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-grey md:text-xl">{intro}</p>}
          </div>
          {aside && (
            <div
              className="enter"
              style={{ "--enter-y": "28px", "--enter-duration": "0.9s", "--enter-delay": "250ms" } as React.CSSProperties}
            >
              {aside}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
