import { SecurityView, securityMetadata } from "@/views/security";

export const metadata = securityMetadata("sl");

export default function Page() {
  return <SecurityView locale="sl" />;
}
