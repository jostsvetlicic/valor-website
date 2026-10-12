import { CaseStudiesView, caseStudiesMetadata } from "@/views/caseStudies";

export const metadata = caseStudiesMetadata("en");

export default function Page() {
  return <CaseStudiesView locale="en" />;
}
