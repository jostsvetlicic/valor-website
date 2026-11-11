import { CallConfirmedView, callConfirmedMetadata } from "@/views/callConfirmed";

export const metadata = callConfirmedMetadata("sl");

export default function Page() {
  return <CallConfirmedView locale="sl" />;
}
