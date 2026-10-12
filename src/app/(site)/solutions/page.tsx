import { SolutionsView, solutionsMetadata } from "@/views/solutions";

export const metadata = solutionsMetadata("en");

export default function Page() {
  return <SolutionsView locale="en" />;
}
