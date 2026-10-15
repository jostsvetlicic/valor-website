import type { CSSProperties } from "react";

/**
 * Hero visual for the demo: a document being read. A gold beam sweeps the
 * page and the fields it finds light up beside it, one after another.
 * Illustration only: grey bars stand in for text, no made-up data.
 */
export default function HeroDocScan({ eyebrow, fields }: { eyebrow: string; fields: string[] }) {
  return (
    <div aria-hidden="true" className="relative mx-auto flex w-full max-w-sm items-center gap-4 lg:ml-auto">
      <div className="relative h-72 flex-1 overflow-hidden rounded-2xl border border-cream/10 bg-[#f5f0e8] p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95)]">
        <div className="h-3 w-1/2 rounded bg-obsidian/25" />
        <div className="mt-2 h-2 w-1/3 rounded bg-obsidian/15" />
        <div className="mt-6 space-y-2.5">
          {[90, 75, 85, 60, 80, 70, 88, 55].map((w, i) => (
            <div key={i} className="h-2 rounded bg-obsidian/12" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-5 flex justify-between">
          <div className="h-2.5 w-1/4 rounded bg-obsidian/25" />
          <div className="h-2.5 w-1/5 rounded bg-obsidian/25" />
        </div>
        <span className="doc-beam absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-gold/35 to-transparent" />
      </div>
      <div className="w-36 shrink-0">
        <p className="eyebrow text-[0.7rem]">{eyebrow}</p>
        <ul className="mt-3 space-y-2">
          {fields.slice(0, 4).map((f, i) => (
            <li
              key={f}
              className="doc-field flex items-center gap-2 rounded-xl border border-gold/25 bg-charcoal px-3 py-2 text-xs text-cream"
              style={{ "--doc-delay": `${0.6 + i * 0.7}s` } as CSSProperties}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
