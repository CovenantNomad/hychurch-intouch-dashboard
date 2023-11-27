/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['firebasestorage.googleapis.com', 'images.unsplash.com']
  },
  async rewrites() {
    return [
      {
        source: "/api",
        destination: `https://hychurch-dev.duckdns.org/graphql`,
      },
    ];
  },
};

module.exports = nextConfig;