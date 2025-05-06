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
    domains: ["placeholder.svg"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

// Only use contentlayer if it's available
let exportedConfig = nextConfig;
try {
  const { withContentlayer } = await import("next-contentlayer2");
  exportedConfig = withContentlayer(nextConfig);
} catch (error) {
  console.log(error);
  console.warn("Contentlayer not available, skipping withContentlayer wrapper");
}

export default exportedConfig;
