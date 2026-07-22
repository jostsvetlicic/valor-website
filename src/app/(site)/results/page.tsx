import type { Metadata } from "next";
import { Container } from "@/components/Container";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Testimonials from "@/components/Testimonials";
import CtaBand from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Case studies and measured results from Valor's direct-booking websites and AI booking systems. Real numbers, coming soon.",
};

const caseStudies = [
  {
    tag: "Case study · coming soon",
    property: "Boutique hotel",
    headline: "Turning after-hours enquiries into confirmed stays.",
    metrics: [
      { value: "—", label: "direct bookings / mo" },
      { value: "—", label: "avg. reply time" },
      { value: "—", label: "commission saved" },
    ],
  },
  {
    tag: "Case study · coming soon",
    property: "Villa collection",
    headline: "One inbox, three languages, zero missed guests.",
    metrics: [
      { value: "—", label: "enquiries answered" },
      { value: "—", label: "languages handled" },
      { value: "—", label: "revenue kept direct" },
    ],
  },
];

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="Results"
        title={
          <>
            The numbers, once they&rsquo;re in.{" "}
            <span className="text-gradient-gold">Measured, not promised.</span>
          </>
        }
        intro="We're building our first founding case studies now. This is where the measured results will live — reply times, direct bookings, and commission saved."
      />

      <section className="py-12 md:py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((cs, i) => (
              <Reveal
                key={cs.property}
                delay={i * 0.08}
                className="relative overflow-hidden rounded-[2rem] border border-gold/12 bg-charcoal/50 p-8 md:p-10"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-radial-gold" />
                <span className="eyebrow">{cs.tag}</span>
                <h2 className="mt-4 font-display text-2xl font-medium text-cream md:text-3xl">
                  {cs.headline}
                </h2>
                <p className="mt-3 text-grey">{cs.property}</p>
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gold/12 pt-6">
                  {cs.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-display text-3xl text-gradient-gold">
                        {m.value}
                      </div>
                      <div className="mt-1.5 text-xs leading-snug text-grey">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="In their words"
            title="What clients say."
            intro="Placeholder quotes for now — ready to swap in your real ones."
          />
          <div className="mt-14">
            <Testimonials />
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Be one of the first"
        title="Want your property here?"
        sub="Only 3 founding clients taken this month."
      />
    </>
  );
}
