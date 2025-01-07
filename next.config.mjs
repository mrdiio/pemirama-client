/** @type {import('next').NextConfig} */
const nextConfig = {
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
