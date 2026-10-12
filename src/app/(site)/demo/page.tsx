import { DemoView, demoMetadata } from "@/views/demo";

export const metadata = demoMetadata("en");

export default function Page() {
  return <DemoView locale="en" />;
}
