import { SecurityView, securityMetadata } from "@/views/security";

export const metadata = securityMetadata("en");

export default function Page() {
  return <SecurityView locale="en" />;
}
