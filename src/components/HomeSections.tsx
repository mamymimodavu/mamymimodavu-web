import Image from "next/image";
import Link from "next/link";
import type { HomeSection } from "@/lib/homepage";

function SplitBlock({ section }: { section: Extract<HomeSection, { type: "split" }> }) {
  return (
    <section className="home-split">
      <div className="home-split-inner">
        <div className="home-split-media">
          <Image src={section.image} alt="" width={860} height={1200} className="home-split-image" />
        </div>
        <div className="home-split-copy">
          <h2>{section.title}</h2>
          <p>{section.body}</p>
          {section.linkHref && section.linkLabel && (
            <p>
              Poď somnou na ONLINE kávu alebo čaj —{" "}
              <Link href={section.linkHref}>{section.linkLabel}</Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function HeroBlock({ section }: { section: Extract<HomeSection, { type: "hero" }> }) {
  return (
    <section
      className="home-hero"
      style={{ backgroundImage: `url(${section.background})` }}
    >
      <div className="home-hero-overlay" />
      <div className="home-hero-inner">
        <div className="home-hero-copy">
          <p className="home-hero-kicker">{section.kicker}</p>
          <p className="home-hero-text">{section.body}</p>
          <a href={section.ctaHref} className="btn" target="_blank" rel="noreferrer">
            {section.ctaLabel}
          </a>
        </div>
        <div className="home-hero-side">
          <Image src={section.sideImage} alt="" width={860} height={540} className="home-hero-side-image" />
        </div>
      </div>
    </section>
  );
}

function PromoBlock({ section }: { section: Extract<HomeSection, { type: "promo" }> }) {
  return (
    <section className="home-promo">
      <div className="home-promo-inner">
        <h2>{section.title}</h2>
        <p>{section.body}</p>
      </div>
    </section>
  );
}

export default function HomeSections({ sections }: { sections: HomeSection[] }) {
  return (
    <>
      {sections.map((section, index) => {
        if (section.type === "split") return <SplitBlock key={index} section={section} />;
        if (section.type === "hero") return <HeroBlock key={index} section={section} />;
        return <PromoBlock key={index} section={section} />;
      })}
    </>
  );
}
