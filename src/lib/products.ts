import productsData from "@/data/products.json";

export type Product = {
  slug: string;
  title: string;
  description: string;
  image: string | null;
  body: string;
};

export const products = productsData as Product[];

export function getProduct(slug: string): Product | undefined {
  const decoded = decodeURIComponent(slug);
  return products.find((product) => product.slug === slug || product.slug === decoded);
}

export function getAllProductSlugs(): string[] {
  return products.map((product) => product.slug);
}
