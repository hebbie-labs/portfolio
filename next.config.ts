import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["dev.leonhebeisen.com"],
  redirects: async () => [
    { source: "/skills", destination: "/about", permanent: true },
  ],
};

export default nextConfig;
