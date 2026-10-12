import { ProcessView, processMetadata } from "@/views/process";

export const metadata = processMetadata("sl");

export default function Page() {
  return <ProcessView locale="sl" />;
}
