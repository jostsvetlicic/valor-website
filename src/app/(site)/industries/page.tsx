import { IndustriesIndex, industriesMetadata } from "@/views/industries";

export const metadata = industriesMetadata("en");

export default function Page() {
  return <IndustriesIndex locale="en" />;
}
