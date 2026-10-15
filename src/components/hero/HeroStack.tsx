import type { CSSProperties, ReactNode } from "react";

/**
 * Hero visual: three cards stacked like a deck; every few seconds the front
 * card slides to the back and the next one comes forward. Pure CSS
 * (transform and opacity), built for exactly three cards.
 */
export default function HeroStack({
  cards,
}: {
  cards: { kicker: string; title: string; text: string; icon?: ReactNode }[];
}) {
  const list = cards.slice(0, 3);
  return (
    <div className="relative mx-auto h-[16.5rem] w-full max-w-sm lg:ml-auto">
      {list.map((c, i) => (
        <div
          key={c.title}
          className="stack-card absolute inset-x-0 bottom-0 flex h-[14rem] flex-col rounded-[1.75rem] border border-gold/25 bg-charcoal p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)]"
          style={{ "--stack-delay": `${-i * 3}s` } as CSSProperties}
        >
          {/* Only the front card shows its text; the ones behind show a clean edge. */}
          <div className="stack-body flex min-h-0 flex-1 flex-col">
            <div className="flex items-center gap-3">
              {c.icon && (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/35 text-gold">{c.icon}</span>
              )}
              <span className="eyebrow truncate text-[0.7rem]">{c.kicker}</span>
            </div>
            <p className="mt-4 line-clamp-2 font-display text-xl font-semibold leading-snug text-cream">{c.title}</p>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-grey">{c.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
