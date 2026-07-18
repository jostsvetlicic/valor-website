import { Container } from "./Container";
import { BookCallButton } from "./Button";
import Sparkle from "./Sparkle";

/**
 * Full-width final CTA band with a gold glow. Reused across pages.
 */
export default function CtaBand({
  eyebrow,
  title,
  sub,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="divider-gold absolute inset-x-0 top-0" />
      <Container className="relative text-center">
        <Sparkle id="cta" className="mx-auto h-9 w-9" />
        {eyebrow && <span className="eyebrow mt-6 block">{eyebrow}</span>}
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl md:text-6xl">
          {title}
        </h2>
        {sub && (
          <p className="mx-auto mt-6 max-w-xl text-lg text-grey">{sub}</p>
        )}
        <div className="mt-10 flex justify-center">
          <BookCallButton className="px-10 py-5 text-base" />
        </div>
      </Container>
    </section>
  );
}
