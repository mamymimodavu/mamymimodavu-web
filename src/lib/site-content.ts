import chromeData from "@/data/site/chrome.json";
import headData from "@/data/site/head.json";
import pagesData from "@/data/site/pages.json";
import blogPostsData from "@/data/site/blog-posts.json";
import productsData from "@/data/site/products.json";

export type SiteRow = {
  style: string;
  height: string;
  rowType: string;
  html: string;
};

export type SitePageMeta = {
  title: string;
  description: string;
};

export type SitePage = {
  meta: SitePageMeta;
  rows: SiteRow[];
};

export type SiteBlogPost = {
  slug: string;
  path: string;
  title: string;
  description: string;
  image: string | null;
  publishedAt: string | null;
  rows: SiteRow[];
};

export type SiteProduct = {
  slug: string;
  path: string;
  title: string;
  description: string;
  image: string | null;
  price: string | null;
  currency: string;
  rows: SiteRow[];
};

export type SiteHeadAssets = {
  favicon: string | null;
  stylesheet: string | null;
  scripts: string[];
};

const pages = pagesData as Record<string, SitePage>;
const chrome = chromeData as { headerHtml: string; footerHtml: string };
const head = headData as SiteHeadAssets;

export const siteHeaderHtml = chrome.headerHtml;
export const siteFooterHtml = chrome.footerHtml;
export const siteHeadAssets = head;

export function getSitePage(path: string): SitePage | undefined {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return pages[normalized];
}

/** Static pages served at /[slug] (not blog/store). */
export function getAllStaticPageSlugs(): string[] {
  return Object.keys(pages)
    .filter(
      (p) =>
        p !== "/" &&
        !p.startsWith("/blog") &&
        !p.startsWith("/store"),
    )
    .map((p) => p.slice(1));
}

export function getAllBlogTagSlugs(): string[] {
  return Object.keys(pages)
    .filter((p) => p.startsWith("/blog/tags/"))
    .map((p) => p.replace("/blog/tags/", ""));
}

export function getAllBlogListPageNumbers(): string[] {
  return Object.keys(pages)
    .filter((p) => /^\/blog\/page\/\d+$/.test(p))
    .map((p) => p.split("/").pop()!)
    .filter(Boolean);
}

export const siteBlogPosts = blogPostsData as SiteBlogPost[];

export function getSiteBlogPost(slug: string): SiteBlogPost | undefined {
  const decoded = decodeURIComponent(slug);
  return siteBlogPosts.find((post) => post.slug === slug || post.slug === decoded);
}

export function getAllSiteBlogSlugs(): string[] {
  return siteBlogPosts.map((post) => post.slug);
}

export const siteProducts = productsData as SiteProduct[];

export function getSiteProduct(slug: string): SiteProduct | undefined {
  const decoded = decodeURIComponent(slug);
  return siteProducts.find((product) => product.slug === slug || product.slug === decoded);
}

export function getAllSiteProductSlugs(): string[] {
  return siteProducts.map((product) => product.slug);
}

/** Rewrite BaseKit absolute URLs and legacy store paths for Next.js routes. */
export function rewriteBaseKitLinks(html: string): string {
  return (
    html
      .replaceAll("https://mamymimodavu.sk", "")
      .replaceAll("http://mamymimodavu.sk", "")
      .replace(/href="\/store\/product\//g, 'href="/store/')
      .replace(/http:https:\/\//g, "https://")
      .replace(/href="\/blog\/page\//g, 'href="/blog/page/')
      .replace(/href="\/blog\/tags\//g, 'href="/blog/tags/')
  );
}
