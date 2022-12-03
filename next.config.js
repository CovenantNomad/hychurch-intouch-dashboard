/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api',
        destination: `https://hychurch-server.duckdns.org:3000/graphql`,
      },
    ];
  },
}

module.exports = nextConfig
