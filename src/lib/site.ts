export const SITE_NAME = "mamymimodavu";
export const SITE_TAGLINE =
  "Férové rodičovstvo, láskavý prístup. Každá cesta sa začína prvým krokom, urobme ho spolu.";
export const MAP_URL = "https://mapa.mamymimodavu.sk";
export const INSTAGRAM_URL = "https://www.instagram.com/mamy_mimo_davu/";

export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export const MAIN_NAV: NavItem[] = [
  { href: "/", label: "Domov" },
  { href: "/anabela", label: "Anabela" },
  { href: "/blog", label: "Blog" },
  { href: "/advent", label: "Férové rodičovstvo" },
  { href: "/store", label: "Obchod" },
  { href: MAP_URL, label: "Ihriská", external: true },
];
