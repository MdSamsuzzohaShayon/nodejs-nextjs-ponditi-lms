const path = require('path');


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: 'http://localhost:9000',
  //       port: '',
  //       pathname: '',
  //     },
  //   ],
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    customKey: '.env.local',
  },
};

module.exports = nextConfig;
