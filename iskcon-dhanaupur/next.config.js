/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    domains: ['localhost'],
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