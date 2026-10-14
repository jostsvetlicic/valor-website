import { Reveal } from "@/components/Reveal";
import { clsx } from "@/lib/clsx";
import SplitText from "@/components/reactbits/SplitText";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  /** Dark text, for headings on a light (cream) section. */
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <span className="eyebrow block">{eyebrow}</span>}
      <h2 className={clsx("mt-3 font-display t-section text-balance", light ? "text-obsidian" : "text-cream")}>
        {typeof title === "string" ? (
          // React Bits SplitText (GSAP): words rise into place as the heading scrolls in.
          <SplitText
            text={title}
            tag="span"
            splitType="words"
            delay={55}
            duration={0.9}
            ease="power3.out"
            from={{ opacity: 0, y: 28 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.15}
            rootMargin="-60px"
            textAlign={align === "left" ? "left" : "center"}
          />
        ) : (
          title
        )}
      </h2>
      {intro && (
        <p
          className={clsx(
            "mt-5 max-w-2xl t-lead",
            light ? "text-obsidian/70" : "text-grey",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
