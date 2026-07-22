import { clsx } from "@/lib/clsx";

type Tone = "void" | "base" | "warm" | "panel";

const toneClass: Record<Tone, string> = {
  void: "surface-void",
  base: "surface-base",
  warm: "surface-warm",
  panel: "surface-panel",
};

/**
 * A page section with a deliberate surface tone. Sections alternate between
 * void / base / warm / panel so the page has rhythm and depth rather than one
 * flat black. Optional soft edge fades melt neighbouring tones together, and
 * an optional glow adds subtle depth behind a key moment.
 */
export function Section({
  children,
  tone = "base",
  glow = false,
  edges = false,
  className,
  id,
}: {
  children: React.ReactNode;
  tone?: Tone;
  /** Subtle radial gold glow centred behind the content. */
  glow?: boolean;
  /** Soft top + bottom edge gradients so tones blend instead of hard-cut. */
  edges?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={clsx("relative isolate overflow-hidden", toneClass[tone], className)}
    >
      {edges && <div className="edge-fade-top" aria-hidden="true" />}
      {glow && (
        <div
          aria-hidden="true"
          className="glow-soft pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2"
        />
      )}
      {children}
      {edges && <div className="edge-fade-bottom" aria-hidden="true" />}
    </section>
  );
}
