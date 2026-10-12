import { PrivacyView, privacyMetadata } from "@/views/privacy";

export const metadata = privacyMetadata("sl");

export default function Page() {
  return <PrivacyView locale="sl" />;
}
