"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { href, localeFromPath, type Dict } from "@/i18n";

const ui: Dict<{ label: string; text: string; privacy: string; ok: string }> = {
  en: {
    label: "Cookie notice",
    text: "We use no tracking or advertising cookies. Visits are counted anonymously with Plausible, which sets no cookies, and your browser only remembers that you closed this notice.",
    privacy: "Privacy policy",
    ok: "Got it",
  },
  sl: {
    label: "Obvestilo o piškotkih",
    text: "Ne uporabljamo piškotkov za sledenje ali oglaševanje. Obiske anonimno štejemo s Plausible, ki ne nastavlja piškotkov, vaš brskalnik pa si zapomni le, da ste to obvestilo zaprli.",
    privacy: "Politika zasebnosti",
    ok: "Razumem",
  },
};

const STORAGE_KEY = "valor_cookie_consent";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function isAcknowledged() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    // localStorage unavailable (private mode, etc.), don't show the banner
    return true;
  }
}

/**
 * GDPR cookie notice. This site sets exactly one functional cookie (the
 * consent preference itself, stored in localStorage). There is no analytics,
 * no advertising, no third-party tracking, so the notice is informational
 * rather than a gate. Preference is stored client-side; the banner never
 * re-appears after the visitor acknowledges it.
 */
export default function CookieBanner() {
  // Server snapshot is "acknowledged" so the banner never flashes during SSR.
  const acknowledged = useSyncExternalStore(subscribe, isAcknowledged, () => true);
  const locale = localeFromPath(usePathname());
  const t = ui[locale];

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    listeners.forEach((l) => l());
  }

  if (acknowledged) return null;

  return (
    <div
      role="region"
      aria-label={t.label}
      className="fixed inset-x-0 bottom-0 z-[80] p-4 md:p-6"
    >
      <div className="glass mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-white/[0.08] px-6 py-5 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.85)] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-grey">
          {t.text}{" "}
          <Link
            href={href(locale, "/privacy")}
            className="text-cream underline underline-offset-4 transition-colors hover:text-gold"
          >
            {t.privacy}
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-pill bg-gold px-6 py-2.5 text-sm font-semibold text-obsidian transition-colors hover:bg-gold-light"
        >
          {t.ok}
        </button>
      </div>
    </div>
  );
}
