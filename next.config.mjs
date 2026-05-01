/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Allow API routes to run for up to 5 minutes (needed for Claude generation)
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  // Disable static route timeout so long-running API routes don't get cut off
  staticPageGenerationTimeout: 300,
};

export default nextConfig;
