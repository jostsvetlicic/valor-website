import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { BookCallButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Direct-booking websites, an AI booking assistant, SEO & Google, and automation — the four systems Valor builds to turn visitors into direct bookings.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Four systems that turn visitors into{" "}
            <span className="text-gradient-gold">direct bookings.</span>
          </>
        }
        intro="Each one works on its own. Together, they make direct the easiest way for a guest to book with you — and the cheapest way for you to fill your calendar."
      />

      <div className="pb-8">
        {services.map((service, i) => {
          const Icon = service.icon;
          const reversed = i % 2 === 1;
          return (
            <Section
              key={service.slug}
              id={service.slug}
              tone={reversed ? "warm" : "base"}
              edges={reversed}
              className="scroll-mt-28 py-20 md:py-28"
            >
              <Container>
                <div
                  className={`grid items-center gap-12 md:grid-cols-2 md:gap-16 ${
                    reversed ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <Reveal>
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/25 text-gold">
                      <Icon className="h-8 w-8" />
                    </span>
                    <span className="eyebrow mt-6 block">
                      0{i + 1} — Service
                    </span>
                    <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-cream sm:text-4xl md:text-5xl">
                      {service.title}
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-grey">
                      {service.line}
                    </p>
                    <p className="mt-8 text-sm uppercase tracking-[0.24em] text-gold">
                      The outcome
                    </p>
                    <p className="mt-3 font-display text-xl italic text-cream/90">
                      {service.outcome}
                    </p>
                    <div className="mt-8">
                      <BookCallButton label="Book a call" />
                    </div>
                  </Reveal>

                  <Reveal
                    delay={0.1}
                    className="rounded-[2rem] border border-gold/15 bg-charcoal/50 p-8 md:p-10"
                  >
                    <h3 className="eyebrow">What&rsquo;s included</h3>
                    <ul className="mt-6 space-y-4">
                      {service.included.map((item) => (
                        <li key={item} className="flex gap-3.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          <span className="text-[0.98rem] leading-relaxed text-cream/85">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </Container>
            </Section>
          );
        })}
      </div>

      <CtaBand
        eyebrow="One conversation"
        title="Not sure which you need? Let's map it together."
        sub="A short discovery call is the fastest way to see where you're losing bookings."
      />
    </>
  );
}
