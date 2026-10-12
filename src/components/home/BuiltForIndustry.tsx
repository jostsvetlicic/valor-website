import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

/** Stands in for the welcome/demo videos until they have real embeds. */
export default function BuiltForIndustry() {
  return (
    <Section id="built-for-your-industry" className="py-24 md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-4xl">
          <p className="eyebrow">Built for your industry</p>
          <p className="mt-6 font-display t-statement text-gold text-balance">
            One system, built around how your business actually works.
          </p>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-cream md:text-xl">
            VALOR builds the backend your business runs on. We connect the tools
            you already use (WhatsApp, booking platforms, your CRM, email and
            payments) into one system that answers clients, takes bookings,
            sends the paperwork and chases payments on its own. Whether you run
            hotels and villas, a charter fleet, a real estate agency or a finance
            team, the system is shaped around your operation, not the other way
            round.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
