"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "valor_cookie_consent";

/**
 * GDPR cookie notice. This site sets exactly one functional cookie (the
 * consent preference itself, stored in localStorage). There is no analytics,
 * no advertising, no third-party tracking — so the notice is informational
 * rather than a gate. Preference is stored client-side; the banner never
 * re-appears after the visitor acknowledges it.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage unavailable (private mode, etc.) — don't show the banner
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[80] p-4 md:p-6"
    >
      <div className="glass mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-white/[0.08] px-6 py-5 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.85)] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-grey">
          This site uses a single functional cookie to remember this preference.
          No tracking, no analytics, no third-party cookies.{" "}
          <Link
            href="/privacy"
            className="text-cream underline underline-offset-4 transition-colors hover:text-gold"
          >
            Privacy policy
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-pill bg-gold px-6 py-2.5 text-sm font-semibold text-obsidian transition-colors hover:bg-gold-light"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
