import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'archi-semtle.kr.object.ncloudstorage.com',
        pathname: '/**',
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
