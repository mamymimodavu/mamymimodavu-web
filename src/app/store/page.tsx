import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Obchod",
  description: "Knihy a materiály mamy mimo davu o férovom rodičovstve.",
};

export default function StorePage() {
  return (
    <section className="store-page">
      <div className="product-grid">
        {products.map((product) => (
          <article key={product.slug} className="product-card">
            {product.image && (
              <Link href={`/store/${encodeURIComponent(product.slug)}`}>
                <Image
                  src={product.image}
                  alt=""
                  width={480}
                  height={360}
                  className="product-card-image"
                />
              </Link>
            )}
            <div className="product-card-body">
              <h2>
                <Link href={`/store/${encodeURIComponent(product.slug)}`}>{product.title}</Link>
              </h2>
              <p>{product.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
