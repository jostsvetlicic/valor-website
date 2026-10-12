import { HowItWorksView, howItWorksMetadata } from "@/views/howItWorks";

export const metadata = howItWorksMetadata("en");

export default function Page() {
  return <HowItWorksView locale="en" />;
}
