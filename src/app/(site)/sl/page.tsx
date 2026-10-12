import { HomeView, homeMetadata } from "@/views/home";

export const metadata = homeMetadata("sl");

export default function HomePage() {
  return <HomeView locale="sl" />;
}
