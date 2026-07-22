import { Container, Eyebrow } from "@/components/Container";
import { Section } from "@/components/Section";
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

      {/* 3. WELCOME VIDEO — full-bleed break, asymmetric heading offset */}
      <Section tone="void" edges className="py-24 md:py-32">
        <Container>
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow>Meet Valor</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(2.4rem,4.5vw,4rem)] font-medium leading-[0.98] tracking-tight text-cream">
                A quiet obsession with getting you{" "}
                <span className="text-gradient-gold">booked directly.</span>
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-lg leading-relaxed text-grey">
                Ninety seconds on why direct beats the platforms — and how we
                build the website and AI that make it happen.
              </p>
            </div>
          </div>
        </Container>
        {/* break the container: video runs wider than the text column */}
        <div className="mt-14 px-4 md:mt-20 md:px-10">
          <div className="mx-auto max-w-[110rem]">
            <VideoBlock
              id="welcome-video"
              src="/video/call.mp4"
              poster="/video/call-poster.jpg"
              label="Welcome video"
              aspect="wide"
            />
          </div>
        </div>
      </Section>

      {/* 4. TRUST STRIP — raised panel band, quiet */}
      <Section tone="panel" className="border-y border-gold/10">
        <Container className="py-10">
          <ul className="grid grid-cols-2 gap-8 md:grid-cols-4">
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
      </Section>

      {/* 5. THE PROBLEM — asymmetric: sticky statement left, numbered rows right */}
      <Section tone="base" className="py-24 md:py-36">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Eyebrow>The problem</Eyebrow>
                <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[0.98] tracking-tight text-cream">
                  Your guests book whoever answers first.
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-grey">
                  Right now,{" "}
                  <span className="text-cream">that isn&rsquo;t you.</span>
                </p>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <RevealGroup className="flex flex-col">
                {problems.map((problem, i) => (
                  <RevealItem
                    key={i}
                    className="grid grid-cols-[auto_1fr] gap-6 border-t border-gold/12 py-9 first:border-t-0 first:pt-0"
                  >
                    <span className="margin-index text-5xl md:text-6xl">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-medium text-cream">
                        {problem.title}
                      </h3>
                      <p className="mt-3 text-[0.98rem] leading-relaxed text-grey">
                        {problem.body}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. SERVICES — warm surface */}
      <Section tone="warm" edges id="services" className="py-24 md:py-32">
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
      </Section>

      {/* 7. DEMO VIDEO — second full-bleed break, darkest surface */}
      <Section tone="void" edges className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>See it in action</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,4.5vw,4rem)] font-medium leading-[1.02] tracking-tight text-cream">
              Watch the AI answer, and book, a real guest.
            </h2>
          </div>
        </Container>
        <div className="mt-14 px-4 md:mt-20 md:px-10">
          <div className="mx-auto max-w-[120rem]">
            <VideoBlock id="demo-video" label="Product demo" aspect="wide" />
          </div>
        </div>
      </Section>

      {/* 8. HOW IT WORKS */}
      <Section tone="base" className="py-24 md:py-32">
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
      </Section>

      {/* 9. THE NUMBERS — LOUD moment, raised panel, glow, full width */}
      <Section
        tone="panel"
        glow
        edges
        className="border-y border-gold/10 py-28 md:py-40"
      >
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>What it saves you</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[0.95] tracking-tight text-cream">
              The maths of doing it properly.
            </h2>
          </div>
          <div className="mt-20">
            <StatsGrid />
          </div>
        </Container>
      </Section>

      {/* 10. TESTIMONIALS — warm */}
      <Section tone="warm" className="py-24 md:py-32">
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
      </Section>

      {/* 11. GUARANTEE — full-bleed statement, darkest surface */}
      <Section tone="void" glow edges className="py-28 md:py-40">
        <Container className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 text-gold">
            <IconShield className="h-7 w-7" />
          </span>
          <Reveal>
            <h2 className="mx-auto mt-8 max-w-5xl font-display text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[0.95] tracking-tight text-cream">
              Live in 14 days, or you{" "}
              <span className="text-gradient-gold">do not pay.</span>
            </h2>
          </Reveal>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-grey">
            We launch your site and system within 14 days. If we do not, you pay
            nothing more until it is live. Then we keep optimizing until it is
            converting.
          </p>
        </Container>
      </Section>

      {/* 12. FINAL CTA */}
      <CtaBand
        title="Ready to stop losing bookings?"
        sub="Only 3 founding clients taken this month."
      />

      {/* 13. Footer lives in the root layout */}
    </>
  );
}
