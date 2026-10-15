import type { CSSProperties } from "react";

/**
 * Hero card: a short list (steps or promises) that lights up item by item in
 * a slow wave, while a gold light travels down the line joining them. Pure
 * CSS (transform and opacity only), so it costs nothing while scrolling.
 */
export default function HeroSequence({
  eyebrow,
  items,
  mode = "steps",
}: {
  eyebrow: string;
  items: string[];
  /** "steps" shows numbers, "checks" shows tick marks. */
  mode?: "steps" | "checks";
}) {
  const list = items.slice(0, 6);
  const step = 1.1;
  const total = list.length * step + 2.4;
  return (
    <div
      className="hero-card relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-gold/25 bg-charcoal/80 p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] lg:ml-auto"
      style={{ "--seq-total": `${total}s` } as CSSProperties}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(201,168,76,0.22),transparent)]" />
      <p className="eyebrow relative text-[0.75rem]">{eyebrow}</p>
      <ol className="relative mt-5 space-y-3">
        {/* The joining line and the light travelling down it. */}
        <span aria-hidden="true" className="absolute bottom-5 left-[1.125rem] top-5 w-px overflow-hidden bg-gold/20">
          <span className="seq-light absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-gold-light to-transparent" />
        </span>
        {list.map((item, i) => (
          <li
            key={item}
            className="seq-item relative flex items-center gap-4"
            style={{ "--seq-delay": `${i * step}s` } as CSSProperties}
          >
            <span className="seq-dot relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-[#17130b] font-mono text-xs font-semibold text-gold">
              {mode === "checks" ? (
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </span>
            <span className="seq-label text-[0.95rem] leading-snug text-cream">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
