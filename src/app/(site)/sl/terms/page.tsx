import { TermsView, termsMetadata } from "@/views/terms";

export const metadata = termsMetadata("sl");

export default function Page() {
  return <TermsView locale="sl" />;
}
