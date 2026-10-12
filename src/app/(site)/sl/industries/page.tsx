import { IndustriesIndex, industriesMetadata } from "@/views/industries";

export const metadata = industriesMetadata("sl");

export default function Page() {
  return <IndustriesIndex locale="sl" />;
}
