/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.100.163'],
  images: {
    domains: ["coin-images.coingecko.com"],
  },
};

export default nextConfig;
