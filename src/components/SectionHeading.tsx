import { Reveal } from "@/components/Reveal";
import { clsx } from "@/lib/clsx";

/** Splits a heading into words that fade up one after another on reveal. */
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="heading-word" style={{ "--w": i } as React.CSSProperties}>
          {w}
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

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
        {typeof title === "string" ? <Words text={title} /> : title}
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
