import { ProcessView, processMetadata } from "@/views/process";

export const metadata = processMetadata("en");

export default function Page() {
  return <ProcessView locale="en" />;
}
