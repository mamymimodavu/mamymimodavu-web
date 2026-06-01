import Link from "next/link";

export default function CartPage() {
  return (
    <section className="page page--narrow">
      <article className="page-card">
        <h1>Košík</h1>
        <p className="lead">Objednávky zatiaľ riešime individuálne. Vyber produkt v obchode alebo nás kontaktuj cez Instagram.</p>
        <Link href="/store" className="btn">
          Do obchodu
        </Link>
      </article>
    </section>
  );
}
