import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["dev.leonhebeisen.com"],
  redirects: async () => [
    { source: "/projekte/:slug", destination: "/projekte", permanent: true },
    { source: "/skills", destination: "/about", permanent: true },
  ],
};

export default nextConfig;
