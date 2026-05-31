import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Anabela",
  description: "Anabela — príbeh a projekt mamy mimo davu pre deti a rodičov.",
};

export default function AnabelaPage() {
  return (
    <div className="page page--narrow">
      <article className="page-card">
        <h1>Anabela</h1>
        <p className="lead">
          Anabela je súčasťou sveta mamy mimo davu — príbeh, ktorý deťom aj rodičom pomáha hovoriť o
          emóciách, hraniciach a každodenných situáciách prirodzene a bez strachu.
        </p>
        <p>
          Na pôvodnom webe nájdete príbehy, obrázky a materiály okolo Anabely. Táto stránka je
          súčasť nového webu v rovnakom vizuálnom štýle ako mapa ihrísk.
        </p>
        <p>
          Ak chcete vidieť viac, sledujte{" "}
          <a href="https://www.instagram.com/mamy_mimo_davu/" target="_blank" rel="noreferrer">
            Instagram
          </a>{" "}
          alebo sa vráťte na{" "}
          <Link href="/blog">blog</Link>, kde píšem o rodičovstve v praxi.
        </p>
      </article>
    </div>
  );
}
