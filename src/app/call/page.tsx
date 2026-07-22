import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
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

        {/* 3. VIDEO — the centrepiece, tight single column */}
        <Section tone="void" edges className="py-16 md:py-24">
          <Container className="max-w-4xl">
            <LandingVideo src={video.src} poster={video.poster} />
            <Reveal>
              <p className="mx-auto mt-7 max-w-xl text-center text-base leading-relaxed text-grey">
                {video.caption}
              </p>
            </Reveal>
            {/* 4. BOOK — first push, immediately after the video */}
            <Reveal className="mt-10 flex justify-center">
              <BookingButton className="px-11 py-5 text-base" />
            </Reveal>
          </Container>
        </Section>

        {/* 5. THE PROBLEM — tight, centred, larger type, quiet list */}
        <Section tone="base" className="py-24 md:py-32">
          <Container className="max-w-3xl text-center">
            <Reveal>
              <span className="eyebrow block">{problem.eyebrow}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-[1.0] tracking-tight text-cream">
                {problem.headline}
              </h2>
            </Reveal>
          </Container>
          <Container className="mt-14 max-w-2xl">
            <RevealGroup className="flex flex-col">
              {problem.points.map((point, i) => (
                <RevealItem
                  key={i}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-5 border-t border-gold/12 py-6 first:border-t-0"
                >
                  <span className="margin-index text-3xl">0{i + 1}</span>
                  <p className="text-lg leading-relaxed text-grey">{point}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>

        {/* 6. WHAT WE BUILD — raised panel */}
        <Section tone="panel" edges className="border-y border-gold/10 py-24 md:py-32">
          <Container className="max-w-5xl">
            <div className="mx-auto max-w-2xl text-center">
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
            {/* second push */}
            <Reveal className="mt-14 flex justify-center">
              <BookingButton className="px-11 py-5 text-base" />
            </Reveal>
          </Container>
        </Section>

        {/* 7. LIVE AI AGENT — behind feature flag, default OFF */}
        {flags.liveAgent && (
          <Section tone="base" className="py-24 md:py-32">
            <Container className="max-w-4xl">
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
          </Section>
        )}

        {/* 8. HOW IT WORKS */}
        <Section tone="base" className="py-24 md:py-32">
          <Container className="max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <span className="eyebrow block">{how.eyebrow}</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-tight tracking-tight text-cream">
                  From first call to fully optimised.
                </h2>
              </Reveal>
            </div>
            <ProcessSteps steps={how.steps} />
          </Container>
        </Section>

        {/* 9. RESULTS — behind feature flag, default OFF */}
        {flags.results && (
          <Section tone="warm" className="border-y border-gold/10 py-24 md:py-32">
            <Container className="max-w-5xl">
              <div className="mx-auto max-w-3xl text-center">
                <span className="eyebrow block">{results.eyebrow}</span>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl">
                  {results.headline}
                </h2>
              </div>
              {/* Real case-study cards render here once you enable this. */}
              <div className="mt-14 grid gap-6 md:grid-cols-3" />
            </Container>
          </Section>
        )}

        {/* 10. TESTIMONIALS — behind feature flag, default OFF */}
        {flags.testimonials && (
          <Section tone="warm" className="py-24 md:py-32">
            <Container className="max-w-5xl">
              <div className="mx-auto max-w-3xl text-center">
                <span className="eyebrow block">{testimonials.eyebrow}</span>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl">
                  {testimonials.headline}
                </h2>
              </div>
              {/* Real quote cards render here once you enable this. */}
              <div className="mt-14 grid gap-6 md:grid-cols-3" />
            </Container>
          </Section>
        )}

        {/* 11. THE GUARANTEE — full-bleed statement, darkest surface */}
        <Section tone="void" glow edges className="py-24 md:py-36">
          <Container className="max-w-4xl text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 text-gold">
              <IconShield className="h-7 w-7" />
            </span>
            <Reveal>
              <h2 className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2.6rem,6.5vw,5rem)] font-medium leading-[0.96] tracking-tight text-cream">
                {guarantee.headline}
              </h2>
            </Reveal>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-grey">
              {guarantee.sub}
            </p>
          </Container>
        </Section>

        {/* 12. FINAL CTA — the single action, oversized */}
        <Section tone="base" glow className="py-28 md:py-40">
          <div className="divider-gold absolute inset-x-0 top-0" />
          <Container className="max-w-4xl text-center">
            <Reveal>
              <Sparkle id="call-final" className="mx-auto h-9 w-9" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.92] tracking-tight text-cream">
                {finalCta.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-12 flex justify-center">
              <BookingButton label={finalCta.cta} className="px-12 py-6 text-lg" />
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-sm text-grey">{finalCta.note}</p>
            </Reveal>
          </Container>
        </Section>
      </main>

      {/* 13. FOOTER — minimal, no nav links */}
      <LandingFooter />
    </>
  );
}
