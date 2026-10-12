import { IndustryView, industryMetadata } from "@/views/industries";
import { industrySlugs } from "@/content/industries";

type Params = { slug: string };

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return industryMetadata(slug, "sl");
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return <IndustryView slug={slug} locale="sl" />;
}
