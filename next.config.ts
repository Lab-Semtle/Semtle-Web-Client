import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shadcnblocks.com',
      },
      {
        protocol: 'https',
        hostname:
          'semtle.9f8a3d5a958d5b6edbdae5ade12bc028.r2.cloudflarestorage.com',
        pathname: '/**', // 모든 이미지 허용
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*', // 외부 API로 프록시할 경로
        destination: 'http://223.130.140.10:8080/:path*',
      },
    ];
  },
};

export default nextConfig;
