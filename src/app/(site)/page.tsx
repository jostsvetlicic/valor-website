import { Container, Eyebrow } from "@/components/Container";
import Hero from "@/components/home/Hero";
import VideoBlock from "@/components/VideoBlock";
import SectionHeading from "@/components/SectionHeading";
import ServiceCards from "@/components/home/ServiceCards";
import ProcessSteps from "@/components/home/ProcessSteps";
import StatsGrid from "@/components/home/StatsGrid";
import Testimonials from "@/components/Testimonials";
import CtaBand from "@/components/CtaBand";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { TextLink } from "@/components/Button";
import { IconShield } from "@/components/Icons";
import { problems, trustStats } from "@/data/site";

export default function HomePage() {
  return (
    <>
      {/* 2. HERO (1. Nav lives in the root layout) */}
      <Hero />

      {/* 3. WELCOME VIDEO */}
      <section id="welcome" className="py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Meet Valor</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl">
              A quiet obsession with getting you booked directly.
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <VideoBlock id="welcome-video" label="Welcome video" />
          </div>
        </Container>
      </section>

      {/* 4. TRUST STRIP */}
      <section className="border-y border-gold/10 bg-charcoal/40">
        <Container className="py-8">
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {trustStats.map((stat) => (
              <li
                key={stat.label}
                className="flex flex-col items-center text-center md:flex-row md:justify-center md:gap-2.5"
              >
                <span className="font-display text-2xl font-medium text-gradient-gold">
                  {stat.value}
                </span>
                <span className="text-sm text-grey">{stat.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 5. THE PROBLEM */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="The problem"
            title={
              <>
                Your guests book whoever answers first.{" "}
                <span className="text-gradient-gold">
                  Right now, that isn&rsquo;t you.
                </span>
              </>
            }
          />
          <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3">
            {problems.map((problem, i) => (
              <RevealItem
                key={i}
                className="rounded-[1.75rem] border border-gold/12 bg-charcoal/40 p-8"
              >
                <span className="font-display text-4xl text-gold/40">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-medium text-cream">
                  {problem.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-grey">
                  {problem.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* 6. SERVICES */}
      <section id="services" className="py-24 md:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="What we do"
              title="Four systems that quietly fill your calendar."
            />
            <TextLink href="/services" className="shrink-0">
              All services
            </TextLink>
          </div>
          <div className="mt-14">
            <ServiceCards />
          </div>
        </Container>
      </section>

      {/* 7. DEMO VIDEO */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>See it in action</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl">
              Watch the AI answer, and book, a real guest.
            </h2>
          </div>
        </Container>
        <div className="mt-12">
          <Container className="max-w-6xl">
            <VideoBlock id="demo-video" label="Product demo" aspect="wide" />
          </Container>
        </div>
      </section>

      {/* 8. HOW IT WORKS */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="How we work"
              title="Done for you, from first call to fully optimised."
            />
            <TextLink href="/how-it-works" className="shrink-0">
              The full process
            </TextLink>
          </div>
          <ProcessSteps />
        </Container>
      </section>

      {/* 9. THE NUMBERS */}
      <section className="border-y border-gold/10 bg-charcoal/40 py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="What it saves you"
            title="The maths of doing it properly."
          />
          <div className="mt-16">
            <StatsGrid />
          </div>
        </Container>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="In their words"
            title="Quietly making properties busier."
            intro="Placeholder quotes for now — ready to swap in your real clients."
          />
          <div className="mt-14">
            <Testimonials />
          </div>
        </Container>
      </section>

      {/* 11. GUARANTEE */}
      <section className="py-16 md:py-24">
        <Container>
          <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-gold/30 bg-charcoal/70 p-12 text-center gold-glow md:p-16">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-60" />
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 text-gold">
              <IconShield className="h-7 w-7" />
            </span>
            <h2 className="mt-7 font-display text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl">
              Live in 14 days, or you do not pay.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-grey">
              We launch your site and system within 14 days. If we do not, you
              pay nothing more until it is live. Then we keep optimizing until
              it is converting.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 12. FINAL CTA */}
      <CtaBand
        title="Ready to stop losing bookings?"
        sub="Only 3 founding clients taken this month."
      />

      {/* 13. Footer lives in the root layout */}
    </>
  );
}
