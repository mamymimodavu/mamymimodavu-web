import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.vlastnawebstranka.websupport.sk",
      },
      {
        protocol: "http",
        hostname: "files.vlastnawebstranka.websupport.sk",
      },
    ],
  },
};

export default nextConfig;
