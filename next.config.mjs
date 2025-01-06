/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'pemirama-new.test',
      },
      {
        protocol: 'https',
        hostname: 'satu.untan.ac.id',
      },
    ],
  },
}

export default nextConfig
