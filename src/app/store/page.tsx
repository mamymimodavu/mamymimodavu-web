import type { Metadata } from "next";
import BaseKitSitePage from "@/components/basekit/BaseKitSitePage";
import { getSitePage } from "@/lib/site-content";

const page = getSitePage("/store");

export const metadata: Metadata = page
  ? {
      title: page.meta.title,
      description: page.meta.description,
    }
  : { title: "Obchod" };

export default function StorePage() {
  return <BaseKitSitePage path="/store" />;
}
