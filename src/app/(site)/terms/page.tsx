import { TermsView, termsMetadata } from "@/views/terms";

export const metadata = termsMetadata("en");

export default function Page() {
  return <TermsView locale="en" />;
}
