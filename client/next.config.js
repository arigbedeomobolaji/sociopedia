/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	experimental: {
		appDir: true,
	},
	reactStrictMode: true,
	images: {
		domains: [
			"sociopedia-omobolaji.s3.eu-west-2.amazonaws.com",
			"sociopedia-ten.vercel.app/",
		],
	},
};

module.exports = nextConfig;
