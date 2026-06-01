import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/store/product/:slug",
        destination: "/store/:slug",
        permanent: true,
      },
      {
        source: "/Ihriská",
        destination: "https://mapa.mamymimodavu.sk",
        permanent: false,
      },
      {
        source: "/Ihriska",
        destination: "https://mapa.mamymimodavu.sk",
        permanent: false,
      },
    ];
  },
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
