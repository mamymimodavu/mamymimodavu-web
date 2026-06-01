import { siteHeadAssets } from "@/lib/site-content";

export default function BaseKitScripts() {
  return (
    <>
      {siteHeadAssets.scripts.map((src) => (
        <script key={src} src={src} defer />
      ))}
    </>
  );
}
