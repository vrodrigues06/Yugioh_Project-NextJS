import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "totsttfocgwpbxpzzxgh.supabase.co",
        pathname: "/storage/v1/object/public/perfis/**",
      },
    ],
  },
};

export default nextConfig;
