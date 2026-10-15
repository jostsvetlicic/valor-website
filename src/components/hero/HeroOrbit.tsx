import type { CSSProperties, ReactNode } from "react";
import Sparkle from "@/components/Sparkle";

/**
 * Hero visual: the VALOR star in the centre with labelled badges circling it
 * slowly (services, or the systems we connect). The ring turns while each
 * badge turns back, so labels stay upright. Pure CSS transforms.
 */
export default function HeroOrbit({ items }: { items: { label: string; icon: ReactNode }[] }) {
  const list = items.slice(0, 6);
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[17rem] sm:max-w-[20rem] lg:ml-auto lg:max-w-[22rem]">
      <div className="absolute inset-[12%] rounded-full border border-gold/15" />
      <div className="absolute inset-[30%] rounded-full border border-dashed border-gold/20" />
      <div className="absolute inset-[24%] rounded-full bg-[radial-gradient(closest-side,rgba(201,168,76,0.28),transparent)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="orbit-core flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-gold/40 bg-[#15110a] shadow-[0_0_60px_-10px_rgba(201,168,76,0.7)]">
          <Sparkle className="h-12 w-9" />
        </span>
      </div>
      <div className="orbit-ring absolute inset-[12%]">
        {list.map((item, i) => {
          const angle = (360 / list.length) * i;
          // A full-size layer turned to this badge's angle puts the badge on
          // the ring's edge; turning it back by the same angle keeps it level.
          return (
            <div key={item.label} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` } as CSSProperties}>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" style={{ transform: `rotate(${-angle}deg)` } as CSSProperties}>
                <div className="orbit-badge flex flex-col items-center gap-1.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/35 bg-charcoal text-gold shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]">
                    {item.icon}
                  </span>
                  <span className="max-w-[6.5rem] rounded-lg bg-black/60 px-2 py-0.5 text-center text-[0.68rem] font-medium leading-tight text-cream/85">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
