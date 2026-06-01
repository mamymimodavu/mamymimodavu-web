import homepageData from "@/data/homepage.json";

export type SplitSection = {
  type: "split";
  image: string;
  title: string;
  body: string;
  linkHref?: string;
  linkLabel?: string;
};

export type HeroSection = {
  type: "hero";
  background: string;
  kicker: string;
  body: string;
  sideImage: string;
  ctaLabel: string;
  ctaHref: string;
};

export type PromoSection = {
  type: "promo";
  title: string;
  body: string;
};

export type HomeSection = SplitSection | HeroSection | PromoSection;

export const homeSections = homepageData.sections as HomeSection[];
