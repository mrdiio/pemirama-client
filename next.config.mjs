/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    localPatterns: [
      {
        pathname: '/src/assets/images/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'dashboard.pemirama.untan.ac.id',
      },
      {
        protocol: 'http',
        hostname: 'pemirama-online.test',
      },
      {
        protocol: 'https',
        hostname: 'satu.untan.ac.id',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
    ],
  },
}

export default nextConfig
