import Link from "next/link";
import { brand, nav } from "@/config/brand";
import Sparkle from "./Sparkle";
import { Container } from "./Container";

const columns = [
  {
    title: "Explore",
    links: nav.map((n) => ({ label: n.label, href: n.href, external: false })),
  },
  {
    title: "Connect",
    links: [
      { label: brand.instagramHandle, href: brand.instagramUrl, external: true },
      { label: "WhatsApp", href: brand.whatsappUrl, external: true },
      { label: brand.phoneDisplay, href: brand.phoneHref, external: false },
      { label: "Email us", href: `mailto:${brand.email}`, external: false },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/10 bg-charcoal">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 bg-radial-gold" />
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Sparkle id="footer" className="h-8 w-8" />
              <span className="font-display text-2xl font-semibold tracking-[0.2em] text-cream">
                VALOR
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-grey">
              {brand.tagline}
            </p>
            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-pill bg-gold px-6 py-3 text-sm font-semibold text-obsidian transition-colors hover:bg-gold-light"
            >
              Book a call
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) =>
                  link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-grey transition-colors hover:text-cream"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-grey transition-colors hover:text-cream"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-gold mt-14" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-grey md:flex-row">
          <p>© 2026 Valor · {brand.domain}</p>
          <p className="text-grey/70">
            Premium websites & AI booking systems for hospitality.
          </p>
        </div>
      </Container>
    </footer>
  );
}
