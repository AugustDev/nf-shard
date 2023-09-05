/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: "build",
	experimental: {
		appDir: true,
	},
	// https://github.com/aws-amplify/amplify-hosting/issues/1987
	env: {
		POSTGRES_URI: process.env.POSTGRES_URI,
		NEXT_PUBLIC_WATCH_BASE_URI: process.env.NEXT_PUBLIC_WATCH_BASE_URI,
	},
}

module.exports = nextConfig
