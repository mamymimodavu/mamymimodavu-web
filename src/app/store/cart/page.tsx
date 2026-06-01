import type { Metadata } from "next";
import BaseKitSitePage from "@/components/basekit/BaseKitSitePage";
import { getSitePage } from "@/lib/site-content";

const page = getSitePage("/store/cart");

export const metadata: Metadata = page
  ? {
      title: page.meta.title,
      description: page.meta.description,
    }
  : { title: "Košík" };

export default function StoreCartPage() {
  return <BaseKitSitePage path="/store/cart" />;
}
