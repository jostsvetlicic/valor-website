import { DemoView, demoMetadata } from "@/views/demo";

export const metadata = demoMetadata("sl");

export default function Page() {
  return <DemoView locale="sl" />;
}
