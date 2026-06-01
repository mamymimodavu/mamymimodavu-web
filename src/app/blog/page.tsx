import type { Metadata } from "next";
import BaseKitSitePage from "@/components/basekit/BaseKitSitePage";
import { getSitePage } from "@/lib/site-content";

const page = getSitePage("/blog");

export const metadata: Metadata = page
  ? {
      title: page.meta.title,
      description: page.meta.description,
    }
  : { title: "Blog" };

export default function BlogPage() {
  return <BaseKitSitePage path="/blog" />;
}
