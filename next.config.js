/** @type {import('next').NextConfig} */
const nextConfig = {
  domains: ["api.garudanusa.id"],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.garudanusa.id",
        pathname: "/upload/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
  compress: true,
};

module.exports = nextConfig;
