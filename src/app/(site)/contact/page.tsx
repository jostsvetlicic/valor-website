import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { BookCallButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/config/brand";
import { IconClock } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a discovery call with Valor, or reach us by phone, WhatsApp, or Instagram. Premium websites and AI booking systems for hospitality.",
};

// Email is intentionally omitted until the inbox is live (brand.emailIsPlaceholder):
// showing an address that bounces, labelled "placeholder", reads as unfinished.
const channels = [
  {
    label: "Phone",
    value: brand.phoneDisplay,
    href: brand.phoneHref,
    external: false,
  },
  {
    label: "WhatsApp",
    value: brand.phoneDisplay,
    href: brand.whatsappUrl,
    external: true,
  },
  {
    label: "Instagram",
    value: brand.instagramHandle,
    href: brand.instagramUrl,
    external: true,
  },
  ...(brand.emailIsPlaceholder
    ? []
    : [
        {
          label: "Email",
          value: brand.email,
          href: `mailto:${brand.email}`,
          external: false,
        },
      ]),
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s get you{" "}
            <span className="text-gradient-gold">booked directly.</span>
          </>
        }
        intro="The fastest way to start is a short discovery call. Prefer to write? Send a message and we'll get straight back to you."
      />

      <Section tone="base" className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Left: primary CTA + channels */}
            <Reveal className="flex flex-col">
              <div className="rounded-[2rem] border border-gold/25 bg-charcoal/60 p-8 md:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 text-gold">
                  <IconClock className="h-6 w-6" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-medium text-cream md:text-3xl">
                  Book a discovery call
                </h2>
                <p className="mt-3 leading-relaxed text-grey">
                  Fifteen focused minutes. We&rsquo;ll map where you&rsquo;re
                  losing bookings and show you exactly what we&rsquo;d build.
                </p>
                <div className="mt-7">
                  <BookCallButton className="w-full sm:w-auto" />
                </div>
              </div>

              <dl className="mt-8 grid gap-px overflow-hidden rounded-[2rem] border border-gold/12 bg-gold/10">
                {channels.map((c) => (
                  <div key={c.label} className="bg-charcoal/70 p-6">
                    <dt className="eyebrow">{c.label}</dt>
                    <dd className="mt-2">
                      <a
                        href={c.href}
                        {...(c.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-lg text-cream transition-colors hover:text-gold"
                      >
                        {c.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Right: contact form */}
            <Reveal
              delay={0.1}
              className="rounded-[2rem] border border-gold/15 bg-charcoal/40 p-8 md:p-10"
            >
              <h2 className="font-display text-2xl font-medium text-cream md:text-3xl">
                Send a message
              </h2>
              <p className="mt-3 text-grey">
                Tell us about your property and we&rsquo;ll be in touch.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
