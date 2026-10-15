"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import type { SearchEntry, SearchKind } from "@/content/searchIndex";
import type { Dict, Locale } from "@/i18n";
import { clsx } from "@/lib/clsx";
import { IconBuilding, IconChat, IconDocument, IconShield, IconSpark, IconWorkflow } from "@/components/Icons";

const ui: Dict<{
  open: string;
  label: string;
  placeholder: string;
  quick: string;
  empty: (q: string) => string;
  close: string;
  hint: string;
  kinds: Record<SearchKind, string>;
  groups: Record<SearchKind, string>;
  move: string;
  openLabel: string;
  results: (n: number) => string;
}> = {
  en: {
    open: "Search",
    label: "Search the site",
    placeholder: "Search pages, industries, questions…",
    quick: "Quick links",
    empty: (q) => `Nothing found for "${q}". Try another word, or ask us directly.`,
    close: "Close search",
    hint: "↑ ↓ to move, Enter to open, Esc to close",
    kinds: { page: "Page", industry: "Industry", solution: "Solution", process: "Process", faq: "Question", security: "Security" },
    groups: { page: "Pages", industry: "Industries", solution: "Solutions", process: "Process", faq: "Questions", security: "Security" },
    move: "to move",
    openLabel: "to open",
    results: (n) => `${n} result${n === 1 ? "" : "s"}`,
  },
  sl: {
    open: "Iskanje",
    label: "Iskanje po strani",
    placeholder: "Iščite strani, panoge, vprašanja…",
    quick: "Hitre povezave",
    empty: (q) => `Za "${q}" ni zadetkov. Poskusite z drugo besedo ali nas vprašajte neposredno.`,
    close: "Zapri iskanje",
    hint: "↑ ↓ za premik, Enter za odpiranje, Esc za zapiranje",
    kinds: { page: "Stran", industry: "Panoga", solution: "Rešitev", process: "Proces", faq: "Vprašanje", security: "Varnost" },
    groups: { page: "Strani", industry: "Panoge", solution: "Rešitve", process: "Proces", faq: "Vprašanja", security: "Varnost" },
    move: "za premik",
    openLabel: "za odpiranje",
    results: (n) => `Zadetkov: ${n}`,
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

const KIND_ICON: Record<SearchKind, (p: { className?: string }) => React.ReactElement> = {
  page: IconDocument,
  industry: IconBuilding,
  solution: IconSpark,
  process: IconWorkflow,
  faq: IconChat,
  security: IconShield,
};

const KIND_ORDER: SearchKind[] = ["page", "industry", "solution", "process", "security", "faq"];

/** Shown before typing: the pages most visitors look for. */
const QUICK_PATHS = ["/services", "/how-it-works", "/demo", "/industries", "/security", "/contact"];

/**
 * Long texts (FAQ answers) are cut to a short window around the first matched
 * word, so the match stays visible inside the two clamped lines.
 */
function snippet(text: string, query: string, max = 110): string {
  if (text.length <= max) return text;
  const lower = text.toLowerCase();
  const hit = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 1)
    .map((w) => lower.indexOf(w))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0];
  if (hit === undefined || hit < max - 30) return text;
  const start = text.lastIndexOf(" ", Math.max(0, hit - 30)) + 1;
  return `…${text.slice(start)}`;
}

/** Wraps each query word found in the text in a gold highlight. */
function Highlight({ text, query }: { text: string; query: string }) {
  const words = query
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 1)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (words.length === 0) return <>{text}</>;
  const parts = text.split(new RegExp(`(${words.join("|")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded-sm bg-gold/20 text-gold">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
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

  const searching = query.trim().length > 0;
  const results = useMemo(() => {
    if (!engine) return [];
    if (!searching) {
      const pages = engine.entries.filter((e) => e.kind === "page");
      return QUICK_PATHS.map((p) => pages.find((e) => e.href.replace(/^\/sl/, "") === p || e.href === p)).filter(
        (e): e is SearchEntry => !!e,
      );
    }
    // Best matches first, then shown grouped by type in a fixed order.
    const found = engine.search(engine.entries, query);
    return KIND_ORDER.flatMap((k) => found.filter((e) => e.kind === k));
  }, [engine, query, searching]);

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
          <div
            className="fixed inset-0 z-[70] flex items-start justify-center px-3 pt-3 sm:px-4 sm:pt-[10vh]"
            onKeyDown={onKeyDown}
          >
            <button
              type="button"
              aria-label={t.close}
              tabIndex={-1}
              onClick={hide}
              className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-md"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={t.label}
              className="enter relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-gold/25 bg-[#111]/95 shadow-[0_50px_140px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(201,168,76,0.06)] sm:max-h-[78vh]"
              style={{ "--enter-y": "10px", "--enter-duration": "0.25s" } as React.CSSProperties}
            >
              {/* Search field */}
              <div className="flex items-center gap-3 border-b border-cream/[0.08] px-5 sm:px-6">
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
                  className="search-input h-16 w-full min-w-0 bg-transparent text-base text-cream placeholder:text-grey/60 sm:text-lg [&::-webkit-search-cancel-button]:hidden"
                />
                <button
                  type="button"
                  onClick={hide}
                  className="shrink-0 rounded-lg border border-cream/15 px-2.5 py-1 font-mono text-[0.7rem] text-grey transition-colors hover:border-gold/50 hover:text-cream"
                >
                  Esc
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
                {!searching && (
                  <>
                    <p className="px-2 pb-3 pt-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-grey">{t.quick}</p>
                    <ul id="site-search-results" role="listbox" aria-label={t.quick} className="grid gap-2 sm:grid-cols-2">
                      {results.map((r, i) => {
                        const Icon = KIND_ICON[r.kind];
                        const on = i === cursor;
                        return (
                          <li key={r.href} id={`ssr-${i}`} role="option" aria-selected={on}>
                            <button
                              type="button"
                              onMouseMove={() => setCursor(i)}
                              onClick={() => go(r)}
                              className={clsx(
                                "flex h-full w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition-colors",
                                on ? "border-gold/50 bg-gold/[0.08]" : "border-cream/[0.07] bg-cream/[0.02] hover:border-cream/15",
                              )}
                            >
                              <span
                                className={clsx(
                                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                                  on ? "bg-gold text-obsidian" : "bg-cream/[0.06] text-gold",
                                )}
                              >
                                <Icon className="h-[1.1rem] w-[1.1rem]" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[0.95rem] font-semibold text-cream">{r.title}</span>
                                <span className="mt-0.5 line-clamp-2 text-[0.8rem] leading-snug text-grey">{r.text}</span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}

                {searching && engine && results.length === 0 && (
                  <div className="px-4 py-12 text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cream/[0.05] text-gold">
                      <SearchIcon className="h-5 w-5" />
                    </span>
                    <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-grey">{t.empty(query.trim())}</p>
                  </div>
                )}

                {searching && results.length > 0 && (
                  <>
                    <p className="px-2 pb-2 pt-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-grey">
                      {t.results(results.length)}
                    </p>
                    <ul id="site-search-results" role="listbox" aria-label={t.label}>
                      {results.map((r, i) => {
                        const Icon = KIND_ICON[r.kind];
                        const on = i === cursor;
                        const newGroup = i === 0 || results[i - 1].kind !== r.kind;
                        return (
                          <li key={`${r.kind}-${r.href}-${r.title}`} role="presentation">
                            {newGroup && (
                              <p className="px-3 pb-1.5 pt-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold/80 first:pt-1">
                                {t.groups[r.kind]}
                              </p>
                            )}
                            <button
                              type="button"
                              id={`ssr-${i}`}
                              role="option"
                              aria-selected={on}
                              onMouseMove={() => setCursor(i)}
                              onClick={() => go(r)}
                              className={clsx(
                                "flex w-full items-center gap-3.5 rounded-2xl px-3 py-2.5 text-left transition-colors",
                                on ? "bg-gold/[0.1]" : "hover:bg-cream/[0.04]",
                              )}
                            >
                              <span
                                className={clsx(
                                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                                  on ? "bg-gold text-obsidian" : "bg-cream/[0.06] text-gold",
                                )}
                              >
                                <Icon className="h-[1.1rem] w-[1.1rem]" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[0.95rem] font-semibold text-cream">
                                  <Highlight text={r.title} query={query} />
                                </span>
                                <span className="mt-0.5 line-clamp-2 text-[0.8rem] leading-snug text-grey">
                                  <Highlight text={snippet(r.text, query)} query={query} />
                                </span>
                              </span>
                              <span
                                aria-hidden="true"
                                className={clsx("shrink-0 text-gold transition-opacity", on ? "opacity-100" : "opacity-0")}
                              >
                                ↵
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>

              {/* Keyboard hints (desktop) */}
              <div className="hidden items-center gap-5 border-t border-cream/[0.08] px-6 py-3 text-xs text-grey sm:flex">
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded-md border border-cream/15 px-1.5 py-0.5 font-mono text-[0.65rem]">↑</kbd>
                  <kbd className="rounded-md border border-cream/15 px-1.5 py-0.5 font-mono text-[0.65rem]">↓</kbd>
                  {t.move}
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded-md border border-cream/15 px-1.5 py-0.5 font-mono text-[0.65rem]">↵</kbd>
                  {t.openLabel}
                </span>
                <span className="ml-auto flex items-center gap-1.5 text-gold/80">VALOR</span>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
