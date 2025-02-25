import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shadcnblocks.com',
      },
    ],
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
