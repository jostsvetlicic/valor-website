import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import VideoPlayer from "@/components/VideoPlayer";
import { quickAnswers, videoPartner } from "@/content/videos";
import type { Dict, Locale } from "@/i18n";

const copy: Dict<{ eyebrow: string; title: string; intro: string }> = {
  en: {
    eyebrow: "Quick answers",
    title: "Four questions owners ask before a call.",
    intro: `Short answers from ${videoPartner.name}, our build partner at ${videoPartner.company}. Each one takes under a minute.`,
  },
  sl: {
    eyebrow: "Hitri odgovori",
    title: "Štiri vprašanja, ki jih lastniki zastavijo pred klicem.",
    intro: `Kratki odgovori, ki jih da ${videoPartner.name}, naš partner za razvoj pri ${videoPartner.company}. Vsak traja manj kot minuto. Videi so v angleščini.`,
  },
};

/** Homepage: the four short Q&A videos from the pre-call set, with a written answer under each. */
export default function QuickAnswers({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  return (
    <Section id="answers" tone="base" className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
        <RevealGroup as="ul" stagger={0.08} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickAnswers.map((q) => (
            <RevealItem as="li" key={q.id} className="flex flex-col">
              <VideoPlayer video={q} title={q.title[locale]} poster={q.poster} duration={q.duration} />
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-cream">{q.title[locale]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-grey">{q.answer[locale]}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
