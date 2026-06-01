import type { Metadata } from "next";
import BaseKitSitePage from "@/components/basekit/BaseKitSitePage";
import { getSitePage } from "@/lib/site-content";

const page = getSitePage("/");

export const metadata: Metadata = page
  ? {
      title: page.meta.title,
      description: page.meta.description,
    }
  : {};

export default function HomePage() {
  return <BaseKitSitePage path="/" />;
}
