/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**.ngrok-free.dev',
      },
      {
        protocol: 'https',
        hostname: '**.ngrok-free.app',
      },
      {
        protocol: 'https',
        hostname: '**.ngrok.app',
      },
    ],
  },
  allowedDevOrigins: [
    'astute-elliptic-speed.ngrok-free.dev',
    'astute-elliptic-speed.ngrok-free.app',
    'https://astute-elliptic-speed.ngrok-free.dev',
    'https://astute-elliptic-speed.ngrok-free.app',
    '*.ngrok-free.dev',
    '*.ngrok-free.app',
    '*.ngrok.app',
  ],
}

module.exports = nextConfig