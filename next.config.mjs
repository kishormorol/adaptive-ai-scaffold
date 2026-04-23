/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/adaptive-ai-scaffold',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
