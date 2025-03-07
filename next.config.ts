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
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 ESLint 오류 무시
  },
  async headers() {
    return [
      {
        source: '/(.*)', // 모든 요청에 적용
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 'upgrade-insecure-requests', // HTTP 요청을 자동으로 HTTPS로 업그레이드
          },
        ],
      },
    ];
  },
};

export default nextConfig;
