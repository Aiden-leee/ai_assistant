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
  // env: {
  //   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  //   CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  //   NEXT_PUBLIC_VAPI_ASSISTANT_ID: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID,
  //   NEXT_PUBLIC_VAPI_API_KEY: process.env.NEXT_PUBLIC_VAPI_API_KEY,
  //   NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  //   NEXT_PUBLIC_APP_URL_CLIENT: process.env.NEXT_PUBLIC_APP_URL_CLIENT,
  //   NEXT_PUBLIC_ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
  // }
};

export default nextConfig;
