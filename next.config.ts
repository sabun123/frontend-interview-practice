/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: process.env.NODE_ENV === 'production' ? '/frontend-interview-practice' : '',
  images: {
    unoptimized: true,
  },
  // Ensure our favicon and apple touch icon are included in the build
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ico|png)$/,
      type: 'asset/resource',
    })
    return config
  },
}

export default nextConfig
