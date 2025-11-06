/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.ts',
        },
      },
    },
  },
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Disable strict mode in development to avoid double rendering
  reactStrictMode: false,
}

module.exports = nextConfig