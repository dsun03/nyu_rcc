import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
        protocol: 'https',
        hostname: 'gbrlflepbglmsvnhwpbq.supabase.co',
        pathname: '/storage/v1/object/public/profile-pics/**',
      },
      {
        protocol: 'https',
        hostname: 'gbrlflepbglmsvnhwpbq.supabase.co',
        pathname: '/storage/v1/object/public/club-pics/pictures/**',
      },
    ], 
  },
};

export default nextConfig;