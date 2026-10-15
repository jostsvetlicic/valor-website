import { Container } from "./Container";
import StarBookButton from "./StarBookButton";
import ShinyText from "./reactbits/ShinyText";
import { Reveal } from "./Reveal";

/**
 * Closing call to action for interior pages: the same rounded card on a dark
 * gold gradient, shining title and travelling-light button that end the
 * homepage, so every page finishes the same way.
 */
export default function CtaBand({
  eyebrow,
  title,
  sub,
  id,
  cta,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  id?: string;
  /** Button label; defaults to "Book a call". */
  cta?: string;
}) {
  return (
    <section id={id} className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div
            className="relative isolate overflow-hidden rounded-[2rem] border border-gold/25 px-6 py-20 text-center md:px-12 md:py-24"
            style={{
              background:
                "radial-gradient(90% 120% at 50% 0%, rgba(201,168,76,0.32) 0%, rgba(201,168,76,0.08) 45%, transparent 75%), linear-gradient(160deg, #2a2110 0%, #17130b 50%, #0f0d09 100%)",
            }}
          >
            {/* Slow drifting light behind the text. */}
            <div aria-hidden="true" className="cta-orb pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,244,214,0.18),transparent)] blur-2xl" />
            {eyebrow && <span className="eyebrow block">{eyebrow}</span>}
            <h2 className="mx-auto mt-3 max-w-3xl font-display t-statement text-cream text-balance">
              {typeof title === "string" ? (
                <span className="motion-keep inline-block">
                  <ShinyText color="#F5F0E8" shineColor="#FFF4D6" speed={3.6} delay={2} shineWidth={26} glow={0.2}>
                    {title}
                  </ShinyText>
                </span>
              ) : (
                title
              )}
            </h2>
            {sub && <p className="mx-auto mt-6 max-w-xl text-lg text-cream/80">{sub}</p>}
            <StarBookButton label={cta ?? "Book a call"} className="mt-10" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
