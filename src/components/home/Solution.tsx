import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import ShinyText from "@/components/reactbits/ShinyText";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import { IconDocument, IconShield, IconWorkflow } from "@/components/Icons";
import { href, type Dict, type Locale } from "@/i18n";

const icons = [IconDocument, IconWorkflow, IconShield];

const copy: Dict<{
  lead: string;
  gold: string;
  text: string;
  steps: { title: string; text: string }[];
  demo: string;
  how: string;
}> = {
  en: {
    lead: "We make it",
    gold: "stop.",
    text: "We build the exact system your business needs. Connected, automated, running 24/7. Your team focuses on what actually matters.",
    steps: [
      { title: "It reads", text: "The agent opens the email and the attachment, whatever the format." },
      { title: "It drafts", text: "Orders, checks and replies are prepared directly in your ERP and inbox." },
      { title: "You approve", text: "A person on your team confirms. Nothing is sent without them." },
    ],
    demo: "Try it on a sample document",
    how: "How it works, step by step",
  },
  sl: {
    lead: "Temu naredimo",
    gold: "konec.",
    text: "Zgradimo točno tak sistem, kot ga potrebuje vaše podjetje. Povezan, avtomatiziran, deluje 24/7. Vaša ekipa se posveti temu, kar je res pomembno.",
    steps: [
      { title: "Prebere", text: "Agent odpre e-pošto in prilogo, v kateri koli obliki." },
      { title: "Pripravi", text: "Naročila, preverjanja in odgovori so pripravljeni neposredno v vašem ERP in nabiralniku." },
      { title: "Vi potrdite", text: "Potrdi oseba iz vaše ekipe. Brez nje se nič ne pošlje." },
    ],
    demo: "Preizkusite na vzorčnem dokumentu",
    how: "Kako deluje, korak za korakom",
  },
};

/** The turn from problem to answer: the statement, then how the agent works. */
export default function Solution({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  return (
    <Section id="solution" tone="warm" className="py-24 md:py-36">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="font-display t-statement text-cream">
            {t.lead}{" "}
            <span className="solution-underline motion-keep relative inline-block">
              {/* React Bits ShinyText: a slow light sweeps across the gold word. */}
              <ShinyText color="#C9A84C" shineColor="#FFF4D6" speed={3.2} delay={1.2} shineWidth={30} glow={0.25}>
                {t.gold}
              </ShinyText>
            </span>
          </h2>
          {/* React Bits ScrollReveal (GSAP ScrollTrigger): words sharpen as you scroll. */}
          <ScrollReveal className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-cream md:text-xl">
            {t.text}
          </ScrollReveal>
        </Reveal>

        {/* Read → draft → approve, joined by a line with a travelling light. */}
        <div className="motion-keep relative mx-auto mt-16 max-w-5xl">
          <span
            aria-hidden="true"
            className="flow-line absolute left-[16.5%] right-[16.5%] top-8 hidden h-px bg-gold/30 md:block"
          />
          <RevealGroup as="ol" stagger={0.12} className="relative grid gap-6 md:grid-cols-3 md:gap-8">
            {t.steps.map((s, i) => {
              const Icon = icons[i];
              return (
                <RevealItem as="li" key={s.title} className="flex flex-col items-center text-center">
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/50 bg-[#15110a] text-gold shadow-[0_0_40px_-10px_rgba(201,168,76,0.6)]">
                    <Icon className="h-6 w-6" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold font-mono text-[0.7rem] font-semibold text-obsidian">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-cream">{s.title}</h3>
                  <p className="mt-2 max-w-xs text-[0.95rem] leading-relaxed text-grey">{s.text}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link
            href={href(locale, "/demo")}
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-[0.9375rem] font-medium text-gold transition-colors hover:bg-gold hover:text-obsidian"
          >
            {t.demo}
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href={href(locale, "/how-it-works")}
            className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-cream underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            {t.how}
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
