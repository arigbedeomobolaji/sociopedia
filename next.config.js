/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
	images: {
		domains: ['links.papareact.com'],
	}
}

module.exports = nextConfig
