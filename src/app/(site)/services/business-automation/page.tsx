import { BusinessAutomationView, businessAutomationMetadata } from "@/views/services";

export const metadata = businessAutomationMetadata("en");

export default function Page() {
  return <BusinessAutomationView locale="en" />;
}
