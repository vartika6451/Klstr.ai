import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['vectra', 'pdf-parse', 'mammoth'],
};

export default nextConfig;
