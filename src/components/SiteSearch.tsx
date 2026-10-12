"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import type { SearchEntry, SearchKind } from "@/content/searchIndex";
import type { Dict, Locale } from "@/i18n";
import { clsx } from "@/lib/clsx";

const ui: Dict<{
  open: string;
  label: string;
  placeholder: string;
  quick: string;
  empty: (q: string) => string;
  close: string;
  hint: string;
  kinds: Record<SearchKind, string>;
}> = {
  en: {
    open: "Search",
    label: "Search the site",
    placeholder: "Search pages, industries, solutions, questions…",
    quick: "Quick links",
    empty: (q) => `Nothing found for "${q}". Try another word, or ask us directly.`,
    close: "Close search",
    hint: "↑ ↓ to move, Enter to open, Esc to close",
    kinds: { page: "Page", industry: "Industry", solution: "Solution", process: "Process", faq: "Question", security: "Security" },
  },
  sl: {
    open: "Iskanje",
    label: "Iskanje po strani",
    placeholder: "Iščite strani, panoge, rešitve, vprašanja…",
    quick: "Hitre povezave",
    empty: (q) => `Za "${q}" ni zadetkov. Poskusite z drugo besedo ali nas vprašajte neposredno.`,
    close: "Zapri iskanje",
    hint: "↑ ↓ za premik, Enter za odpiranje, Esc za zapiranje",
    kinds: { page: "Stran", industry: "Panoga", solution: "Rešitev", process: "Proces", faq: "Vprašanje", security: "Varnost" },
  },
};

const noopSubscribe = () => () => {};

type Engine = {
  entries: SearchEntry[];
  search: (entries: SearchEntry[], q: string) => SearchEntry[];
};

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden="true" className={className}>
      <circle cx="8.75" cy="8.75" r="5.75" />
      <path d="m13 13 4 4" />
    </svg>
  );
}

/**
 * Site search: a nav button plus Cmd/Ctrl+K. The index (built from the same
 * content files the pages use) loads only when the dialog first opens.
 */
export default function SiteSearch({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [engine, setEngine] = useState<Engine | null>(null);
  const isMac = useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => true,
  );
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  const show = useCallback(() => {
    setOpen(true);
    setQuery("");
    setCursor(0);
  }, []);
  const hide = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);

  // Cmd/Ctrl+K anywhere toggles the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setCursor(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Load the index on first open; lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    import("@/content/searchIndex").then((m) => {
      if (!cancelled) setEngine({ entries: m.buildSearchIndex(locale), search: m.search });
    });
    document.documentElement.style.overflow = "hidden";
    const id = window.setTimeout(() => input.current?.focus(), 20);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
      document.documentElement.style.overflow = "";
    };
  }, [open, locale]);

  const results = useMemo(() => {
    if (!engine) return [];
    if (!query.trim()) return engine.entries.filter((e) => e.kind === "page").slice(0, 7);
    return engine.search(engine.entries, query);
  }, [engine, query]);

  const go = (entry: SearchEntry) => {
    setOpen(false);
    router.push(entry.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      hide();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && results[cursor]) {
      e.preventDefault();
      go(results[cursor]);
    }
  };

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={show}
        aria-label={t.label}
        className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full text-obsidian/70 transition-colors hover:bg-obsidian/5 hover:text-obsidian xl:h-9 xl:w-auto xl:border xl:border-obsidian/10 xl:pl-3 xl:pr-2 xl:text-[0.8125rem] xl:font-medium"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="hidden xl:inline">{t.open}</span>
        <kbd className="hidden rounded-md bg-obsidian/[0.07] px-1.5 py-0.5 font-sans text-[0.7rem] text-obsidian/60 xl:inline">
          {isMac ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]" onKeyDown={onKeyDown}>
            <button
              type="button"
              aria-label={t.close}
              tabIndex={-1}
              onClick={hide}
              className="absolute inset-0 cursor-default bg-obsidian/75 backdrop-blur-sm"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={t.label}
              className="enter relative w-full max-w-2xl overflow-hidden rounded-3xl border border-cream/[0.12] bg-charcoal shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
              style={{ "--enter-y": "12px", "--enter-duration": "0.25s" } as React.CSSProperties}
            >
              <div className="flex items-center gap-3 border-b border-cream/[0.08] px-5">
                <SearchIcon className="h-5 w-5 shrink-0 text-gold" />
                <input
                  ref={input}
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCursor(0);
                  }}
                  placeholder={t.placeholder}
                  aria-label={t.label}
                  aria-controls="site-search-results"
                  aria-activedescendant={results[cursor] ? `ssr-${cursor}` : undefined}
                  className="h-16 w-full bg-transparent text-lg text-cream placeholder:text-grey/70 outline-none focus:outline-none focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
                />
                <button
                  type="button"
                  onClick={hide}
                  className="shrink-0 rounded-md border border-cream/15 px-2 py-1 text-xs text-grey hover:text-cream"
                >
                  Esc
                </button>
              </div>

              <div className="max-h-[55vh] overflow-y-auto p-2">
                {!query.trim() && <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-grey">{t.quick}</p>}
                {query.trim() && engine && results.length === 0 ? (
                  <p className="px-3 py-8 text-center text-sm text-grey">{t.empty(query.trim())}</p>
                ) : (
                  <ul id="site-search-results" role="listbox" aria-label={t.label}>
                    {results.map((r, i) => (
                      <li key={`${r.kind}-${r.href}-${r.title}`} id={`ssr-${i}`} role="option" aria-selected={i === cursor}>
                        <button
                          type="button"
                          onMouseMove={() => setCursor(i)}
                          onClick={() => go(r)}
                          className={clsx(
                            "flex w-full items-start gap-4 rounded-2xl px-3 py-3 text-left transition-colors",
                            i === cursor ? "bg-gold/[0.1]" : "hover:bg-cream/[0.04]",
                          )}
                        >
                          <span
                            className={clsx(
                              "mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em]",
                              i === cursor ? "bg-gold text-obsidian" : "bg-cream/[0.08] text-grey",
                            )}
                          >
                            {t.kinds[r.kind]}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[0.95rem] font-semibold text-cream">{r.title}</span>
                            <span className="mt-0.5 line-clamp-2 block text-sm leading-snug text-grey">{r.text}</span>
                          </span>
                          {i === cursor && (
                            <span aria-hidden="true" className="mt-1 shrink-0 text-gold">
                              ↵
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="hidden border-t border-cream/[0.08] px-5 py-3 text-xs text-grey sm:block">{t.hint}</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
