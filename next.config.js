/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost:',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
