"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brand, nav } from "@/config/brand";
import SiteSearch from "@/components/SiteSearch";
import Logo from "./Logo";
import { clsx } from "@/lib/clsx";
import { href, localeFromPath, switchPath, type Dict, type Locale } from "@/i18n";

const ui: Dict<{ book: string; open: string; close: string; home: string; language: string }> = {
  en: { book: "Book a call", open: "Open menu", close: "Close menu", home: "VALOR home", language: "Language" },
  sl: { book: "Rezervirajte klic", open: "Odpri meni", close: "Zapri meni", home: "VALOR domov", language: "Jezik" },
};

/** EN · SL switch that keeps you on the same page. */
function LanguageSwitch({ pathname, locale, className }: { pathname: string; locale: Locale; className?: string }) {
  return (
    <div role="group" aria-label={ui[locale].language} className={clsx("flex items-center rounded-full border border-obsidian/10 p-0.5 text-[0.75rem] font-semibold", className)}>
      {(["en", "sl"] as const).map((l) => (
        <Link
          key={l}
          href={switchPath(pathname, l)}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          className={clsx(
            "rounded-full px-2.5 py-1 uppercase transition-colors",
            l === locale ? "bg-obsidian text-white" : "text-obsidian/60 hover:text-obsidian",
          )}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function BookButton({ className, onClick, label }: { className?: string; onClick?: () => void; label: string }) {
  return (
    <a
      href={brand.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={clsx(
        "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-obsidian font-medium text-white transition-colors hover:bg-[#262626]",
        className,
      )}
    >
      {label}
      <Arrow className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
    </a>
  );
}

/** Light, sticky top bar: logo left, links centred, log in + booking right. */
export default function Nav() {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPath(pathname);
  const t = ui[locale];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (path: string) => pathname.startsWith(href(locale, path));

  return (
    <>
      <header
        style={{ "--enter-y": "-16px", "--enter-duration": "0.6s" } as React.CSSProperties}
        className="enter fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6"
      >
        {/* Floating frosted pill: content scrolls underneath the material. */}
        <nav
          className={clsx(
            "mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 rounded-full border border-black/[0.06] bg-cream/[0.94] pl-5 pr-2 backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300 md:pl-6 lg:grid lg:grid-cols-[1fr_auto_1fr]",
            scrolled
              ? "shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)]"
              : "shadow-[0_6px_24px_-12px_rgba(0,0,0,0.45)]",
          )}
        >
          <Link href={href(locale, "/")} className="flex items-center justify-self-start" aria-label={t.home}>
            <Logo variant="dark" priority markClassName="h-6" wordClassName="text-lg" />
          </Link>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={href(locale, item.href)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={clsx(
                  "whitespace-nowrap text-[0.875rem] font-medium transition-colors hover:text-obsidian",
                  isActive(item.href) ? "text-obsidian" : "text-obsidian/60",
                )}
              >
                {item.label[locale]}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1 justify-self-end lg:gap-3">
            {/* One search instance for every screen size (it owns Cmd/Ctrl+K). */}
            <SiteSearch locale={locale} />
            <div className="hidden items-center gap-3 lg:flex">
              <LanguageSwitch pathname={pathname} locale={locale} />
              <BookButton label={t.book} className="px-5 py-2.5 text-[0.875rem]" />
            </div>
            <button
              type="button"
              aria-label={t.open}
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-obsidian transition-colors hover:bg-obsidian/5 lg:hidden"
            >
              <span className="space-y-1.5">
                <span className="block h-[1.5px] w-5 bg-obsidian" />
                <span className="block h-[1.5px] w-5 bg-obsidian" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-cream lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <Link href={href(locale, "/")} onClick={() => setOpen(false)} className="flex items-center" aria-label={t.home}>
                <Logo variant="dark" markClassName="h-6" wordClassName="text-lg" />
              </Link>
              <button
                type="button"
                aria-label={t.close}
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-2xl leading-none text-obsidian transition-colors hover:bg-obsidian/5"
              >
                ×
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-1 border-t border-obsidian/10 px-6 pt-6">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.3 }}
                >
                  <Link
                    href={href(locale, item.href)}
                    onClick={() => setOpen(false)}
                    className="block border-b border-obsidian/10 py-4 text-2xl font-medium text-obsidian"
                  >
                    {item.label[locale]}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col gap-3 px-6 pb-10">
              <LanguageSwitch pathname={pathname} locale={locale} className="self-center" />
              <BookButton label={t.book} className="w-full py-3.5 text-sm" onClick={() => setOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
