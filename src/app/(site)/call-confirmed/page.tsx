import { CallConfirmedView, callConfirmedMetadata } from "@/views/callConfirmed";

export const metadata = callConfirmedMetadata("en");

export default function Page() {
  return <CallConfirmedView locale="en" />;
}
