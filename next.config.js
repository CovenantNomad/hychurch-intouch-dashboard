/** @type {import('next').NextConfig} */

const API_ORIGIN = process.env.API_ORIGIN;

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["firebasestorage.googleapis.com", "images.unsplash.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api",
        destination: `${API_ORIGIN}/graphql`,
      },
      {
        source: "/api/users/export/excel",
        destination: `${API_ORIGIN}/users/export/excel`,
      },
    ];
  },
};

module.exports = nextConfig;
