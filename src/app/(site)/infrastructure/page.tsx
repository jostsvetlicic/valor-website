import { InfrastructureView, infrastructureMetadata } from "@/views/infrastructure";

export const metadata = infrastructureMetadata("en");

export default function Page() {
  return <InfrastructureView locale="en" />;
}
