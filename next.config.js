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
  reactStrictMode: true,
  transpilePackages: ['@mui/x-charts'],
};

module.exports = nextConfig;
