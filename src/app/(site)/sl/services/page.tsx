import { ServicesView, servicesMetadata } from "@/views/services";

export const metadata = servicesMetadata("sl");

export default function Page() {
  return <ServicesView locale="sl" />;
}
