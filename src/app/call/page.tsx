import type { Metadata } from "next";
import { Container } from "@/components/Container";
import Sparkle from "@/components/Sparkle";
import Logo from "@/components/Logo";
import { BookingButton } from "@/components/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { IconShield } from "@/components/Icons";
import ProcessSteps from "@/components/home/ProcessSteps";
import LandingHero from "@/components/landing/LandingHero";
import LandingVideo from "@/components/landing/LandingVideo";
import LandingFooter from "@/components/landing/LandingFooter";
import { landing } from "@/config/landing";

export const metadata: Metadata = {
  title: "Book a call — Valor",
  description:
    "Premium websites and AI booking systems that turn your visitors into direct bookings. Book a call with Valor.",
  alternates: { canonical: "/call" },
};

export default function CallPage() {
  const {
    video,
    problem,
    build,
    liveAgent,
    how,
    results,
    testimonials,
    guarantee,
    finalCta,
    flags,
  } = landing;

  return (
    <>
      {/* 1. LOGO ONLY — not clickable, no nav */}
      <header className="absolute inset-x-0 top-0 z-40 flex items-center px-6 py-6 md:px-10">
        <Logo priority markClassName="h-7" wordClassName="text-xl" />
      </header>

      <main>
        {/* 2. HERO */}
        <LandingHero />

        {/* 3. VIDEO — the centrepiece */}
        <section className="py-16 md:py-24">
          <Container className="max-w-5xl">
            <LandingVideo src={video.src} poster={video.poster} />
            <Reveal>
              <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-grey">
                {video.caption}
              </p>
            </Reveal>
          </Container>
        </section>

        {/* 4. BOOK A CALL */}
        <section className="py-10 md:py-14">
          <Reveal className="flex justify-center">
            <BookingButton className="px-10 py-5 text-base" />
          </Reveal>
        </section>

        {/* 5. THE PROBLEM */}
        <section className="py-24 md:py-32">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <span className="eyebrow block">{problem.eyebrow}</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-3xl font-medium leading-[1.08] tracking-tight text-cream sm:text-4xl md:text-5xl">
                  {problem.headline}
                </h2>
              </Reveal>
            </div>
            <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3">
              {problem.points.map((point, i) => (
                <RevealItem
                  key={i}
                  className="rounded-[1.75rem] border border-gold/12 bg-charcoal/40 p-8"
                >
                  <span className="font-display text-4xl text-gold/40">
                    0{i + 1}
                  </span>
                  <p className="mt-5 text-[0.98rem] leading-relaxed text-grey">
                    {point}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>

        {/* 6. WHAT WE BUILD */}
        <section className="border-y border-gold/10 bg-charcoal/40 py-24 md:py-32">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <span className="eyebrow block">{build.eyebrow}</span>
              </Reveal>
            </div>
            <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2">
              {build.cards.map((card) => {
                const Icon = card.icon;
                return (
                  <RevealItem
                    key={card.title}
                    hoverLift
                    className="flex h-full flex-col rounded-[1.75rem] border border-gold/12 bg-charcoal/60 p-8 transition-colors duration-500 hover:border-gold/30"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/25 text-gold">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-7 font-display text-2xl font-medium text-cream">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-grey">
                      {card.line}
                    </p>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </Container>
        </section>

        {/* 7. LIVE AI AGENT — behind feature flag, default OFF */}
        {flags.liveAgent && (
          <section className="py-24 md:py-32">
            <Container>
              <div className="mx-auto max-w-3xl text-center">
                <span className="eyebrow block">{liveAgent.eyebrow}</span>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl">
                  {liveAgent.headline}
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-grey">
                  {liveAgent.sub}
                </p>
              </div>
              {/* The real embedded chat widget mounts here once you have it. */}
              <div className="mx-auto mt-12 max-w-3xl" id="live-agent-widget" />
            </Container>
          </section>
        )}

        {/* 8. HOW IT WORKS */}
        <section className="py-24 md:py-32">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <span className="eyebrow block">{how.eyebrow}</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl">
                  From first call to fully optimised.
                </h2>
              </Reveal>
            </div>
            <ProcessSteps steps={how.steps} />
          </Container>
        </section>

        {/* 9. RESULTS — behind feature flag, default OFF */}
        {flags.results && (
          <section className="border-y border-gold/10 bg-charcoal/40 py-24 md:py-32">
            <Container>
              <div className="mx-auto max-w-3xl text-center">
                <span className="eyebrow block">{results.eyebrow}</span>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl">
                  {results.headline}
                </h2>
              </div>
              {/* Real case-study cards render here once you enable this. */}
              <div className="mt-14 grid gap-6 md:grid-cols-3" />
            </Container>
          </section>
        )}

        {/* 10. TESTIMONIALS — behind feature flag, default OFF */}
        {flags.testimonials && (
          <section className="py-24 md:py-32">
            <Container>
              <div className="mx-auto max-w-3xl text-center">
                <span className="eyebrow block">{testimonials.eyebrow}</span>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl">
                  {testimonials.headline}
                </h2>
              </div>
              {/* Real quote cards render here once you enable this. */}
              <div className="mt-14 grid gap-6 md:grid-cols-3" />
            </Container>
          </section>
        )}

        {/* 11. THE GUARANTEE */}
        <section className="py-16 md:py-24">
          <Container>
            <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-gold/30 bg-charcoal/70 p-12 text-center gold-glow md:p-16">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-60" />
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 text-gold">
                <IconShield className="h-7 w-7" />
              </span>
              <h2 className="mt-7 font-display text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl">
                {guarantee.headline}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-grey">
                {guarantee.sub}
              </p>
            </Reveal>
          </Container>
        </section>

        {/* 12. FINAL CTA */}
        <section className="relative overflow-hidden py-28 md:py-36">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
          <div className="divider-gold absolute inset-x-0 top-0" />
          <Container className="relative text-center">
            <Reveal>
              <Sparkle id="call-final" className="mx-auto h-9 w-9" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl md:text-6xl">
                {finalCta.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 flex justify-center">
              <BookingButton label={finalCta.cta} className="px-10 py-5 text-base" />
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-sm text-grey">{finalCta.note}</p>
            </Reveal>
          </Container>
        </section>
      </main>

      {/* 13. FOOTER — minimal, no nav links */}
      <LandingFooter />
    </>
  );
}
