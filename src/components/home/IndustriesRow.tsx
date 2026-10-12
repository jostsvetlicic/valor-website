import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { TextLink } from "@/components/Button";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { IconBank, IconBoat, IconBuilding, IconCog, IconHotel } from "@/components/Icons";

const industries = [
  { Icon: IconHotel, name: "Hospitality", line: "Hotels, villas, guesthouses and resorts." },
  { Icon: IconBoat, name: "Boat Charter and Tourism", line: "Charter companies, tour operators and marine businesses." },
  { Icon: IconBuilding, name: "Real Estate", line: "Agencies, property managers and developers." },
  { Icon: IconBank, name: "Finance and Banking", line: "Internal automation, client communication and reporting." },
  { Icon: IconCog, name: "Any Business with Manual Work", line: "If your team does repetitive tasks by hand, we can automate it." },
];

export default function IndustriesRow() {
  return (
    <Section id="industries" className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Industries"
            title="Who we work with"
            intro="We build for businesses where manual work is the biggest cost."
          />
          <TextLink href="/industries" className="shrink-0">
            All industries
          </TextLink>
        </div>

        <RevealGroup
          as="ul"
          stagger={0.06}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {industries.map(({ Icon, name, line }) => (
            <RevealItem
              as="li"
              key={name}
              hoverLift
              className="group flex flex-col rounded-2xl border border-cream/[0.08] bg-charcoal p-6 hover:border-gold/70"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 text-gold transition-[color,border-color,box-shadow] duration-300 group-hover:border-gold group-hover:text-gold-light group-hover:shadow-[0_0_22px_-2px_color-mix(in_oklab,var(--color-gold)_65%,transparent)]">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold leading-snug text-cream transition-colors duration-300 group-hover:text-gold">
                {name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-grey">{line}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
