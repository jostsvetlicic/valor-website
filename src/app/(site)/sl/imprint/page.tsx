import { ImprintView, imprintMetadata } from "@/views/imprint";

export const metadata = imprintMetadata("sl");

export default function Page() {
  return <ImprintView locale="sl" />;
}
