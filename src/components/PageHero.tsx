import { Container } from "./Container";
import Sparkle from "./Sparkle";

/**
 * Shared hero band for interior pages, quieter than the homepage hero. Sits
 * on the warm surface (gold light from above) so every page opens the same way.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <section className="surface-warm relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-24">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[50rem] -translate-x-1/2 bg-radial-gold opacity-70" />
      <Container className="relative">
        <div
          className="enter"
          style={{ "--enter-y": "20px", "--enter-duration": "0.8s" } as React.CSSProperties}
        >
          <div className="flex items-center gap-3">
            <Sparkle id="page-hero" className="h-6 w-6" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h1 className="mt-6 max-w-4xl font-display t-page text-cream">
            {title}
          </h1>
          {intro && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-grey md:text-xl">
              {intro}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
