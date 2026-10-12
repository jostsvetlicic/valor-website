import { SolutionsView, solutionsMetadata } from "@/views/solutions";

export const metadata = solutionsMetadata("sl");

export default function Page() {
  return <SolutionsView locale="sl" />;
}
