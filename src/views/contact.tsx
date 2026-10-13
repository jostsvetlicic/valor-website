import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { BookCallButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/config/brand";
import { IconClock } from "@/components/Icons";
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
}> = {
  en: {
    metaTitle: "Contact",
    metaDescription:
      "Book a call with VALOR, or reach us by phone, WhatsApp or Instagram. AI infrastructure for companies that run on manual work.",
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
  },
  sl: {
    metaTitle: "Kontakt",
    metaDescription:
      "Rezervirajte klic z VALOR ali nas dosezite po telefonu, WhatsAppu ali Instagramu. AI infrastruktura za podjetja, ki še vedno delajo ročno.",
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
  },
};

export function contactMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "contact", "/contact");
}

export function ContactView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  // Email is omitted until the inbox is live (brand.emailIsPlaceholder).
  const channels = [
    { label: t.phone, value: brand.phoneDisplay, href: brand.phoneHref, external: false },
    { label: "WhatsApp", value: brand.phoneDisplay, href: brand.whatsappUrl, external: true },
    { label: "Instagram", value: brand.instagramHandle, href: brand.instagramUrl, external: true },
    ...(brand.emailIsPlaceholder
      ? []
      : [{ label: t.email, value: brand.email, href: `mailto:${brand.email}`, external: false }]),
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
      />

      <Section tone="panel" className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal className="flex flex-col">
              <div className="rounded-[2rem] border border-gold/25 bg-charcoal p-8 md:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 text-gold">
                  <IconClock className="h-6 w-6" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold text-cream md:text-3xl">{t.bookTitle}</h2>
                <p className="mt-3 leading-relaxed text-grey">{t.bookText}</p>
                <div className="mt-7">
                  <BookCallButton label={t.bookCta} className="w-full sm:w-auto" />
                </div>
              </div>

              <dl className="mt-8 grid gap-px overflow-hidden rounded-[2rem] border border-gold/12 bg-gold/10">
                {channels.map((c) => (
                  <div key={c.label} className="bg-charcoal p-6">
                    <dt className="eyebrow">{c.label}</dt>
                    <dd className="mt-2">
                      <a
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-lg text-cream transition-colors hover:text-gold"
                      >
                        {c.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

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
    </>
  );
}
