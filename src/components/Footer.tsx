"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand, nav } from "@/config/brand";
import { href, localeFromPath, type Dict } from "@/i18n";
import Logo from "./Logo";
import { Container } from "./Container";

const ui: Dict<{
  explore: string;
  resources: string;
  contact: string;
  book: string;
  websites: string;
  demo: string;
  how: string;
  infrastructure: string;
  imprint: string;
  industries: string;
  security: string;
  privacy: string;
  terms: string;
}> = {
  en: {
    explore: "Explore",
    resources: "Resources",
    contact: "Contact",
    book: "Book a call",
    websites: "We also design premium websites.",
    demo: "Interactive demo",
    how: "How it works",
    infrastructure: "Infrastructure",
    imprint: "Imprint",
    industries: "Industries",
    security: "Security and data",
    privacy: "Privacy policy",
    terms: "Terms of service",
  },
  sl: {
    explore: "Raziščite",
    resources: "Viri",
    contact: "Kontakt",
    book: "Rezervirajte klic",
    websites: "Oblikujemo tudi vrhunske spletne strani.",
    demo: "Interaktivni demo",
    how: "Kako deluje",
    infrastructure: "Infrastruktura",
    imprint: "Impresum",
    industries: "Panoge",
    security: "Varnost in podatki",
    privacy: "Politika zasebnosti",
    terms: "Pogoji poslovanja",
  },
};

type FooterLink = { label: string; href: string; external: boolean };

export default function Footer() {
  const locale = localeFromPath(usePathname());
  const t = ui[locale];

  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: t.explore,
      links: nav.map((n) => ({ label: n.label[locale], href: href(locale, n.href), external: false })),
    },
    {
      title: t.resources,
      links: [
        { label: t.how, href: href(locale, "/how-it-works"), external: false },
        { label: t.infrastructure, href: href(locale, "/infrastructure"), external: false },
        { label: t.demo, href: href(locale, "/demo"), external: false },
        { label: t.industries, href: href(locale, "/industries"), external: false },
        { label: t.security, href: href(locale, "/security"), external: false },
      ],
    },
    {
      title: t.contact,
      links: [
        { label: t.book, href: brand.bookingUrl, external: true },
        { label: brand.instagramHandle, href: brand.instagramUrl, external: true },
        { label: "WhatsApp", href: brand.whatsappUrl, external: true },
        { label: brand.phoneDisplay, href: brand.phoneHref, external: false },
        // Hidden while brand.emailIsPlaceholder is true.
        ...(brand.emailIsPlaceholder ? [] : [{ label: brand.email, href: `mailto:${brand.email}`, external: false }]),
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-gold/10 bg-charcoal">
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo markClassName="h-9" wordClassName="text-2xl" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-grey">
              {locale === "sl" ? brand.taglineSl : brand.tagline}
            </p>
            <p className="mt-3 max-w-xs text-sm text-cream">{t.websites}</p>
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-pill bg-gold px-6 py-3 text-sm font-semibold text-obsidian transition-colors hover:bg-gold-light"
            >
              {t.book}
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-grey transition-colors hover:text-cream"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-grey transition-colors hover:text-cream">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-gold mt-14" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-grey md:flex-row">
          <div className="text-center md:text-left">
            {/* Company details live on the imprint page only (owner's choice). */}
            <p>© 2026 VALOR · {brand.domain}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href={href(locale, "/privacy")} className="transition-colors hover:text-cream">
              {t.privacy}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href={href(locale, "/terms")} className="transition-colors hover:text-cream">
              {t.terms}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href={href(locale, "/imprint")} className="transition-colors hover:text-cream">
              {t.imprint}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
