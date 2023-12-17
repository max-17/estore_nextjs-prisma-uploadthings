/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
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
