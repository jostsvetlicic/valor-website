import { HowItWorksView, howItWorksMetadata } from "@/views/howItWorks";

export const metadata = howItWorksMetadata("sl");

export default function Page() {
  return <HowItWorksView locale="sl" />;
}
