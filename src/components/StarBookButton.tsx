import StarBorder from "@/components/reactbits/StarBorder";
import { brand } from "@/config/brand";

/**
 * The gold booking button that closes every page: a light travels around its
 * edge (React Bits StarBorder) and laps faster on hover. Opens the booking
 * calendar in a new tab.
 */
export default function StarBookButton({
  label,
  className,
  align = "center",
}: {
  label: string;
  className?: string;
  align?: "center" | "start";
}) {
  return (
    <div className={`motion-keep flex ${align === "start" ? "justify-start" : "justify-center"} ${className ?? ""}`}>
      <StarBorder
        as="a"
        href={brand.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        color="#FFF4D6"
        trailColor="#C9A84C"
        backgroundColor="#C9A84C"
        textColor="#0A0A0A"
        borderColor="rgba(201,168,76,0.35)"
        radius={999}
        thickness={2}
        duration={4}
        glow={0.6}
        hover="lap"
        className="group text-base font-semibold shadow-[0_12px_40px_-8px_rgba(201,168,76,0.65)]"
        style={{ padding: "1rem 2rem" }}
      >
        <span className="inline-flex items-center gap-2">
          {label}
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </StarBorder>
    </div>
  );
}
