import { CaseStudiesView, caseStudiesMetadata } from "@/views/caseStudies";

export const metadata = caseStudiesMetadata("sl");

export default function Page() {
  return <CaseStudiesView locale="sl" />;
}
