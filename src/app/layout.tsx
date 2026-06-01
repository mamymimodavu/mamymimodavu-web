import type { Metadata } from "next";
import BaseKitFooter from "@/components/basekit/BaseKitFooter";
import BaseKitHeader from "@/components/basekit/BaseKitHeader";
import BaseKitScripts from "@/components/basekit/BaseKitScripts";
import { siteHeadAssets } from "@/lib/site-content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mamymimodavu.sk"),
  title: {
    default: "mamymimodavu",
    template: "%s | mamymimodavu",
  },
  icons: siteHeadAssets.favicon ? { icon: siteHeadAssets.favicon } : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className="no-js">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/basekit-legacy.css" />
        <link
          rel="stylesheet"
          href="https://55b558c7-resources.vlastnawebstranka.websupport.sk/25b750331a/compiled/photo-swipe.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.remove('no-js');",
          }}
        />
      </head>
      <body>
        <BaseKitHeader />
        {children}
        <BaseKitFooter />
        <BaseKitScripts />
      </body>
    </html>
  );
}
