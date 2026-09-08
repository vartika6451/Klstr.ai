import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['vectra', 'pdf-parse', 'mammoth'],
  images: {
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
