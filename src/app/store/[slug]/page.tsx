import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BaseKitPage from "@/components/basekit/BaseKitPage";
import { getAllSiteProductSlugs, getSiteProduct } from "@/lib/site-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSiteProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getSiteProduct(decodeURIComponent(slug));
  if (!product) return { title: "Produkt nenájdený" };
  return {
    title: product.title,
    description: product.description,
    openGraph: product.image ? { images: [{ url: product.image }] } : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getSiteProduct(decodeURIComponent(slug));
  if (!product || product.rows.length === 0) notFound();
  return <BaseKitPage rows={product.rows} />;
}
