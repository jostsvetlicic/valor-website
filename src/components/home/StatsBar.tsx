import { Container } from "@/components/Container";
import CountUp from "@/components/CountUp";
import { verifiedStats as stats } from "@/content/stats";

export default function StatsBar() {
  if (stats.length === 0) return null;
  return (
    <section
      aria-label="Valor in numbers"
      className="border-t border-cream/[0.06] py-12 md:py-20"
    >
      <Container>
        {/* Always one row of four. Columns are set inline so the row can never
            collapse into a stack, whatever the stylesheet state. */}
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            columnGap: "clamp(0.5rem, 2vw, 1rem)",
          }}
        >
          {stats.map((stat) => (
            <li
              key={stat.label.en}
              className="flex flex-col items-center gap-2 text-center md:gap-3"
            >
              <span className="font-display t-stat text-gold">
                <CountUp number={stat.number} suffix={stat.suffix} />
                <span className="sr-only">{`${stat.number}${stat.suffix}`}</span>
              </span>
              <span className="text-[0.7rem] font-medium leading-snug text-cream sm:text-xs md:text-sm">
                {stat.label.en}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
