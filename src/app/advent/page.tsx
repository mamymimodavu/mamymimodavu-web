import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Férové rodičovstvo",
  description: "Materiály a prístup k férovému rodičovstvu — láskavý kontakt, hranice bez trestu.",
};

export default function AdventPage() {
  return (
    <div className="page page--narrow">
      <article className="page-card">
        <h1>Férové rodičovstvo</h1>
        <p className="lead">
          Láskavý prístup k deťom, rešpekt k ich tempu a odvaha robiť rodičovstvo po svojom — mimo
          davu.
        </p>
        <p>
          Na tomto mieste bývali materiály a projekty okolo férového rodičovstva z pôvodného webu.
          Postupne sem presunieme aj obsah z BaseKit, aby všetko sedelo v jednom modernom prostredí.
        </p>
        <p>
          Medzitým odporúčam knihu{" "}
          <Link href="/store/férové-rodičovstvo">Férové rodičovstvo</Link> v
          obchode alebo články na{" "}
          <Link href="/blog">blogu</Link>.
        </p>
        <p>
          <a
            href="http://files.vlastnawebstranka.websupport.sk/ce/fe/cefefd60-574d-43b7-afcc-ab4925e96136.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn"
            style={{ marginTop: "0.5rem" }}
          >
            Stiahnuť PDF materiál
          </a>
        </p>
      </article>
    </div>
  );
}
