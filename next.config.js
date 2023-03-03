/** @type {import('next').NextConfig} */
const bundlerAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig = {
  reactStrictMode: true,
};

module.exports = bundlerAnalyzer(nextConfig);
