import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Prose from "@/components/Prose";
import { getAllProductSlugs, getProduct } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(decodeURIComponent(slug));
  if (!product) return { title: "Produkt nenájdený" };

  return {
    title: product.title,
    description: product.description,
    openGraph: product.image ? { images: [{ url: product.image }] } : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(decodeURIComponent(slug));
  if (!product) notFound();

  return (
    <div className="page page--narrow">
      <Link href="/store" className="btn btn-secondary" style={{ marginBottom: "1rem" }}>
        ← Späť do obchodu
      </Link>
      <article className="page-card">
        {product.image && (
          <Image
            src={product.image}
            alt=""
            width={960}
            height={720}
            className="product-card-image"
            style={{ borderRadius: "var(--radius-md)", marginBottom: "1rem" }}
          />
        )}
        <h1>{product.title}</h1>
        {product.description && <p className="lead">{product.description}</p>}
        {product.body && <Prose><p>{product.body}</p></Prose>}
        <p className="lead" style={{ marginTop: "1.25rem" }}>
          Objednávky zatiaľ riešime e-mailom cez Instagram alebo priamo na{" "}
          <a href="https://www.instagram.com/mamy_mimo_davu/" target="_blank" rel="noreferrer">
            @mamy_mimo_davu
          </a>
          .
        </p>
      </article>
    </div>
  );
}
