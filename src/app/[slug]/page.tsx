import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BaseKitSitePage from "@/components/basekit/BaseKitSitePage";
import { getAllStaticPageSlugs, getSitePage } from "@/lib/site-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllStaticPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSitePage(`/${decodeURIComponent(slug)}`);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description || undefined,
  };
}

export default async function StaticSitePage({ params }: Props) {
  const { slug } = await params;
  const path = `/${decodeURIComponent(slug)}`;
  if (!getSitePage(path)) notFound();
  return <BaseKitSitePage path={path} />;
}
