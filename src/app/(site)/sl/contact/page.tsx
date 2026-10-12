import { ContactView, contactMetadata } from "@/views/contact";

export const metadata = contactMetadata("sl");

export default function Page() {
  return <ContactView locale="sl" />;
}
