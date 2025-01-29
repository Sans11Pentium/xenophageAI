import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'], 
  },

  eslint: {
    ignoreDuringBuilds: true, 
  },

  typescript: {
    ignoreBuildErrors: true, // ✅ Ignores type errors during production builds
  },

};

export default nextConfig;
