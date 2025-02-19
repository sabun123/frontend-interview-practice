/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export to deploy to Github Pages
  output: "export",
  basePath:
    process.env.NODE_ENV === "production" ? "/frontend-interview-practice" : "",
  images: {
    unoptimized: true,
    domains: [],
  },
  // Development configuration for Turbopack
  experimental: {
    turbo: {
      rules: {
        // Add any necessary Turbopack-specific rules here
      },
    },
  },
  // Production webpack configuration
  webpack: (config, { dev }) => {
    if (dev) return config; // Skip webpack config in dev mode (use Turbopack)

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
