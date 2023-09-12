/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	reactStrictMode: true,
	images: {
		domains: ["sociopedia-omobolaji.s3.eu-west-2.amazonaws.com"],
	},
};

module.exports = nextConfig;
