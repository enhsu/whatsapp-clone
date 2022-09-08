/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    firebase_config: process.env.FIREBASE_CONFIG
  }
}

module.exports = nextConfig
