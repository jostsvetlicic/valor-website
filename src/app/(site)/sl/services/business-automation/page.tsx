import { BusinessAutomationView, businessAutomationMetadata } from "@/views/services";

export const metadata = businessAutomationMetadata("sl");

export default function Page() {
  return <BusinessAutomationView locale="sl" />;
}
