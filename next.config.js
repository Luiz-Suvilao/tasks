/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx'],
}

module.exports = nextConfig
