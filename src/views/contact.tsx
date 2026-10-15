import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import StarBookButton from "@/components/StarBookButton";
import BookingSteps from "@/components/BookingSteps";
import ZoneClock from "@/components/ZoneClock";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import Faq from "@/components/home/Faq";
import { team } from "@/content/team";
import { brand } from "@/config/brand";
import { IconChat, IconClock, IconMail, IconMobile } from "@/components/Icons";
import { type Dict, type Locale } from "@/i18n";
import { seoMetadata } from "@/lib/seo";
import { pageNames } from "@/content/seo";

const copy: Dict<{
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: [string, string];
  intro: string;
  bookTitle: string;
  bookText: string;
  bookCta: string;
  phone: string;
  email: string;
  formTitle: string;
  formText: string;
  talkTo: string;
  talkToText: string;
  timeTitle: string;
  languages: string;
  channelsTitle: string;
}> = {
  en: {
    metaTitle: "Contact",
    metaDescription:
      "Book a call with VALOR, or reach us by phone, WhatsApp or Instagram. We build the system your business runs on.",
    eyebrow: "Contact",
    title: ["Let's find where the", "manual work is."],
    intro: "The fastest way to start is a short call. Prefer to write? Send a message and we'll get straight back to you.",
    bookTitle: "Book a call",
    bookText: "Twenty minutes. We'll find where the manual work is and what it costs. No deck, no obligation.",
    bookCta: "Book a call",
    phone: "Phone",
    email: "Email",
    formTitle: "Send a message",
    formText: "Tell us how the work runs today and we'll be in touch.",
    talkTo: "You talk to",
    talkToText: "Your first contact on every project.",
    timeTitle: "Where we are",
    languages: "Calls in English or Slovenian",
    channelsTitle: "Or reach us directly",
  },
  sl: {
    metaTitle: "Kontakt",
    metaDescription:
      "Rezervirajte klic z VALOR ali nas dosezite po telefonu, WhatsAppu ali Instagramu. Gradimo sistem, na katerem deluje vaše podjetje.",
    eyebrow: "Kontakt",
    title: ["Poiščimo, kje je", "ročno delo."],
    intro: "Najhitreje začnemo s kratkim klicem. Raje pišete? Pošljite sporočilo in hitro se vam oglasimo.",
    bookTitle: "Rezervirajte klic",
    bookText: "Dvajset minut. Poiščemo, kje je ročno delo in koliko vas stane. Brez predstavitev, brez obveznosti.",
    bookCta: "Rezervirajte klic",
    phone: "Telefon",
    email: "E-pošta",
    formTitle: "Pošljite sporočilo",
    formText: "Povejte nam, kako delo poteka danes, in oglasili se bomo.",
    talkTo: "Pogovarjate se z",
    talkToText: "Vaš prvi kontakt pri vsakem projektu.",
    timeTitle: "Kje smo",
    languages: "Klici v slovenščini ali angleščini",
    channelsTitle: "Ali nas dosezite neposredno",
  },
};

export function contactMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "contact", "/contact");
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ContactView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const founder = team.find((m) => m.title.en === "Founder");
  // Email is omitted until the inbox is live (brand.emailIsPlaceholder).
  const channels = [
    { label: t.phone, value: brand.phoneDisplay, href: brand.phoneHref, external: false, Icon: IconMobile },
    { label: "WhatsApp", value: brand.phoneDisplay, href: brand.whatsappUrl, external: true, Icon: IconChat },
    { label: "Instagram", value: brand.instagramHandle, href: brand.instagramUrl, external: true, Icon: InstagramIcon },
    ...(brand.emailIsPlaceholder
      ? []
      : [{ label: t.email, value: brand.email, href: `mailto:${brand.email}`, external: false, Icon: IconMail }]),
  ];
  // The team works from Slovenia and Bali (content/team.ts).
  const zones = [
    { city: "Ljubljana", zone: "Europe/Ljubljana" },
    { city: "Bali", zone: "Asia/Makassar" },
  ];

  return (
    <>
      <PageHero
        crumbs={{ locale, items: [{ name: pageNames[locale].contact, path: "/contact" }] }}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.title[0]} <span className="text-gold">{t.title[1]}</span>
          </>
        }
        intro={t.intro}
        aside={
          // Who picks up: the founder, the local times and the call languages.
          <div className="relative mx-auto w-full max-w-sm rounded-[2rem] border border-gold/25 bg-charcoal/80 p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md lg:ml-auto">
            {founder?.photo && (
              <div className="flex items-center gap-4">
                <Image
                    src={founder.photo}
                    alt={founder.name[locale]}
                    width={72}
                    height={72}
                    priority
                    className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-gold/50"
                  />
                <span>
                  <span className="block text-xs uppercase tracking-[0.14em] text-grey">{t.talkTo}</span>
                  <span className="block font-display text-xl font-semibold text-cream">{founder.name[locale]}</span>
                  <span className="block text-sm text-gold">{t.talkToText}</span>
                </span>
              </div>
            )}
            <p className="eyebrow mt-6 text-[0.75rem]">{t.timeTitle}</p>
            <dl className="mt-3 grid grid-cols-2 gap-3">
              {zones.map((z) => (
                <div key={z.zone} className="rounded-2xl border border-cream/[0.08] bg-black/25 px-4 py-3">
                  <dt className="text-xs text-grey">{z.city}</dt>
                  <dd className="mt-0.5 font-mono text-2xl font-semibold tabular-nums text-cream">
                    <ZoneClock timeZone={z.zone} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 flex items-center gap-2 text-sm text-cream/80">
              <IconChat className="h-4 w-4 text-gold" />
              {t.languages}
            </p>
          </div>
        }
      />

      <Section tone="panel" className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="flex flex-col">
              <Reveal>
                <div
                  className="relative isolate overflow-hidden rounded-[2rem] border border-gold/30 p-8 md:p-10"
                  style={{
                    background:
                      "radial-gradient(90% 120% at 0% 0%, rgba(201,168,76,0.28) 0%, rgba(201,168,76,0.06) 45%, transparent 75%), linear-gradient(160deg, #2a2110 0%, #17130b 55%, #0f0d09 100%)",
                  }}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/40 bg-black/20 text-gold">
                    <IconClock className="h-6 w-6" />
                  </span>
                  <h2 className="mt-6 font-display text-2xl font-semibold text-cream md:text-3xl">{t.bookTitle}</h2>
                  <p className="mt-3 leading-relaxed text-cream/75">{t.bookText}</p>
                  <StarBookButton label={t.bookCta} align="start" className="mt-8" />
                </div>
              </Reveal>

              <p className="eyebrow mt-10">{t.channelsTitle}</p>
              <RevealGroup as="ul" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {channels.map((c) => (
                  <RevealItem as="li" key={c.label} hoverLift>
                    <SpotlightCard
                      className="h-full rounded-2xl! border border-cream/[0.08] p-0! transition-colors hover:border-gold/50"
                      spotlightColor="rgba(201, 168, 76, 0.16)"
                    >
                      <a
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex h-full items-center gap-4 p-5"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/25 text-gold transition-colors group-hover:bg-gold group-hover:text-obsidian">
                          <c.Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs uppercase tracking-[0.14em] text-grey">{c.label}</span>
                          <span className="mt-0.5 block text-cream transition-colors [overflow-wrap:anywhere] group-hover:text-gold">{c.value}</span>
                        </span>
                      </a>
                    </SpotlightCard>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <Reveal delay={0.1} className="rounded-[2rem] border border-gold/15 bg-charcoal p-8 md:p-10">
              <h2 className="font-display text-2xl font-semibold text-cream md:text-3xl">{t.formTitle}</h2>
              <p className="mt-3 text-grey">{t.formText}</p>
              <div className="mt-8">
                <ContactForm locale={locale} />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What happens after you book, then the common questions. */}
      <Section tone="base" className="py-20 md:py-24">
        <Container>
          <Reveal className="mx-auto max-w-6xl rounded-[2rem] border border-gold/15 bg-charcoal/60 p-6 md:p-10">
            <BookingSteps locale={locale} />
          </Reveal>
        </Container>
      </Section>

      <Faq locale={locale} />
    </>
  );
}
