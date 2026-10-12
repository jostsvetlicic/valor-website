import { InfrastructureView, infrastructureMetadata } from "@/views/infrastructure";

export const metadata = infrastructureMetadata("sl");

export default function Page() {
  return <InfrastructureView locale="sl" />;
}
