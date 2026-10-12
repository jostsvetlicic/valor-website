"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { href, localeFromPath, type Dict } from "@/i18n";

const copy: Dict<{ title: string; text: string; home: string; contact: string }> = {
  en: {
    title: "Page not found.",
    text: "The page you’re looking for doesn’t exist or has been moved.",
    home: "Back to home",
    contact: "Contact us",
  },
  sl: {
    title: "Stran ne obstaja.",
    text: "Strani, ki jo iščete, ni ali pa je bila premaknjena.",
    home: "Nazaj na domačo stran",
    contact: "Kontaktirajte nas",
  },
};

/** 404 content; the locale comes from the requested path. */
export default function NotFoundBody() {
  const locale = localeFromPath(usePathname() ?? "/");
  const t = copy[locale];
  return (
    <div className="flex min-h-[80vh] items-center pb-24 pt-40 md:pb-32 md:pt-48">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-4 font-display t-page text-cream">{t.title}</h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-grey">{t.text}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={href(locale, "/")}
              className="rounded-pill bg-gold px-8 py-3.5 text-sm font-semibold text-obsidian transition-colors hover:bg-gold-light"
            >
              {t.home}
            </Link>
            <Link
              href={href(locale, "/contact")}
              className="rounded-pill border border-white/[0.12] px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:border-gold/40 hover:text-gold"
            >
              {t.contact}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
