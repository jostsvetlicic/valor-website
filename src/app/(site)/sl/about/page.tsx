import { AboutView, aboutMetadata } from "@/views/about";

export const metadata = aboutMetadata("sl");

export default function Page() {
  return <AboutView locale="sl" />;
}
