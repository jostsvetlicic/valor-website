import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import PageHero from "@/components/PageHero";
import HeroSequence from "@/components/hero/HeroSequence";
import VideoPlayer from "@/components/VideoPlayer";
import PartnerCases from "@/components/home/PartnerCases";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { brand } from "@/config/brand";
import { preCallVideo, quickAnswers, videoPartner } from "@/content/videos";
import type { Dict, Locale } from "@/i18n";

const copy: Dict<{
  metaTitle: string;
  eyebrow: string;
  title: [string, string];
  intro: string;
  steps: string[];
  stepLabel: (n: number) => string;
  watchTitle: string;
  watchNote: string;
  answersTitle: string;
  saveTitle: string;
  saveIntro: string;
  saveSteps: { title: string; text: string }[];
  doneTitle: string;
  doneText: string;
  whatsapp: string;
}> = {
  en: {
    metaTitle: "Your call is confirmed",
    eyebrow: "Your call is confirmed",
    title: ["You're almost done.", "Four short steps before we talk."],
    intro: "Watch the short video, look through the common questions and save the call in your calendar.",
    steps: ["Watch the video", "Quick answers", "Save the call", "Case studies"],
    stepLabel: (n) => `Step ${n} of 4`,
    watchTitle: "Watch this video in full before the call",
    watchNote: `${videoPartner.name} explains who you will talk to and how the call works. About six minutes, in English.`,
    answersTitle: "The questions owners ask most",
    saveTitle: "Save the call in your calendar",
    saveIntro: "Open your calendar:",
    saveSteps: [
      {
        title: "Accept the calendar invite",
        text: "Open the invite in your inbox and click Yes, so the call is saved in your calendar and you get a reminder.",
      },
      {
        title: "Find your meeting link",
        text: "The same email has the video call link. That is where we meet at the scheduled time.",
      },
    ],
    doneTitle: "See you on the call.",
    doneText: "Need to change the time or have a question first?",
    whatsapp: "Message us on WhatsApp",
  },
  sl: {
    metaTitle: "Vaš klic je potrjen",
    eyebrow: "Vaš klic je potrjen",
    title: ["Skoraj ste pripravljeni.", "Štirje kratki koraki pred pogovorom."],
    intro: "Poglejte kratek video, preberite pogosta vprašanja in shranite klic v svoj koledar.",
    steps: ["Poglejte video", "Hitri odgovori", "Shranite klic", "Primeri"],
    stepLabel: (n) => `Korak ${n} od 4`,
    watchTitle: "Pred klicem si oglejte ta video v celoti",
    watchNote: `${videoPartner.name} pove, s kom se boste pogovarjali in kako poteka klic. Približno šest minut, v angleščini.`,
    answersTitle: "Vprašanja, ki jih lastniki zastavijo najpogosteje",
    saveTitle: "Shranite klic v svoj koledar",
    saveIntro: "Odprite svoj koledar:",
    saveSteps: [
      {
        title: "Sprejmite povabilo v koledar",
        text: "Odprite povabilo v svojem e-poštnem predalu in kliknite Da, da se klic shrani v koledar in dobite opomnik.",
      },
      {
        title: "Poiščite povezavo do sestanka",
        text: "V istem e-sporočilu je povezava do video klica. Tam se dobimo ob dogovorjenem času.",
      },
    ],
    doneTitle: "Se vidimo na klicu.",
    doneText: "Želite spremeniti termin ali imate vprašanje že prej?",
    whatsapp: "Pišite nam na WhatsApp",
  },
};

const calendars = [
  { label: "Apple", href: "https://www.icloud.com/calendar" },
  { label: "Google", href: "https://calendar.google.com/" },
  { label: "Outlook", href: "https://outlook.live.com/calendar" },
];

/**
 * The page people see after booking a call (the pre-call set made with
 * Matteo Caruso): the welcome video, the four quick answers, saving the call
 * and the case studies. Not in the menu, the sitemap or search results.
 */
export function callConfirmedMetadata(locale: Locale): Metadata {
  return {
    title: copy[locale].metaTitle,
    robots: { index: false, follow: false },
    alternates: { canonical: null, languages: {} },
  };
}

function StepPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold">
      {children}
    </span>
  );
}

export function CallConfirmedView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={
          <>
            {t.title[0]} <span className="text-gold">{t.title[1]}</span>
          </>
        }
        intro={t.intro}
        aside={<HeroSequence eyebrow={t.eyebrow} items={t.steps} />}
      />

      {/* Step 1: the welcome video */}
      <Section tone="base" className="py-16 md:py-24">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <StepPill>{t.stepLabel(1)}</StepPill>
            <h2 className="mt-5 font-display t-section text-cream text-balance">{t.watchTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-grey">{t.watchNote}</p>
            <VideoPlayer
              video={preCallVideo}
              title={preCallVideo.title[locale]}
              poster={preCallVideo.poster}
              duration={preCallVideo.duration}
              size="lg"
              priority
              className="mt-10"
            />
          </Reveal>
        </Container>
      </Section>

      {/* Step 2: the four quick answers */}
      <Section tone="panel" className="py-16 md:py-24">
        <Container>
          <Reveal className="text-center">
            <StepPill>{t.stepLabel(2)}</StepPill>
            <h2 className="mt-5 font-display t-section text-cream text-balance">{t.answersTitle}</h2>
          </Reveal>
          <RevealGroup as="ul" stagger={0.08} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Step 3: save the call */}
      <Section tone="base" className="py-16 md:py-24">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <StepPill>{t.stepLabel(3)}</StepPill>
            <h2 className="mt-5 font-display t-section text-cream text-balance">{t.saveTitle}</h2>
            <p className="mt-4 text-grey">{t.saveIntro}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {calendars.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-gold/30 px-6 text-sm font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:border-gold hover:text-gold"
                >
                  {c.label}
                </a>
              ))}
            </div>
          </Reveal>
          <RevealGroup as="ol" stagger={0.1} className="mx-auto mt-12 grid max-w-3xl gap-4 md:grid-cols-2">
            {t.saveSteps.map((s, i) => (
              <RevealItem as="li" key={s.title} className="rounded-2xl border border-gold/15 bg-charcoal p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-mono text-sm font-semibold text-obsidian">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-cream">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-grey">{s.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Step 4: case studies (Matteo's, credited) */}
      <PartnerCases locale={locale} eyebrow={t.stepLabel(4)} />

      <Section tone="base" className="py-20 md:py-28">
        <Container>
          <Reveal className="text-center">
            <h2 className="font-display t-statement text-cream">{t.doneTitle}</h2>
            <p className="mt-5 text-grey">
              {t.doneText}{" "}
              <a href={brand.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4 hover:text-gold-light">
                {t.whatsapp}
              </a>
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
