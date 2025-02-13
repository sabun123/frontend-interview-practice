/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: process.env.NODE_ENV === 'production' ? '/frontend-interview-practice' : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
