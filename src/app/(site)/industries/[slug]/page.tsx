import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import IndustryDetail from "@/components/industries/IndustryDetail";
import { getIndustry, industrySlugs } from "@/content/industries";

type Params = { slug: string };

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return {
    title: industry.name,
    description: `${industry.tagline} What Valor builds for ${industry.shortName.toLowerCase()}: a frontend that sells, automation, an operations system and the integration layer between them.`,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <PageHero eyebrow={industry.name} title={industry.tagline} />
      <IndustryDetail industry={industry} />
    </>
  );
}
