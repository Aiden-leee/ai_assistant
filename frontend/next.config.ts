import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // standalone 모드로 빌드
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb", // server action 용량 제한
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
      }
    ],
    // 이미지 캐시 시간 증가 (초 단위)
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
