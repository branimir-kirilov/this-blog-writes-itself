/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

// Only use contentlayer if it's available
let exportedConfig = nextConfig;
try {
  const { withContentlayer } = require('next-contentlayer');
  exportedConfig = withContentlayer(nextConfig);
} catch (error) {
  console.warn('Contentlayer not available, skipping withContentlayer wrapper');
}

export default exportedConfig;
