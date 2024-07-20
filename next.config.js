/** @type {import('next').NextConfig} */

const nextConfig = {
	distDir: "build",
	output: "standalone",

	// https://github.com/aws-amplify/amplify-hosting/issues/1987
	env: {
		POSTGRES_URI: process.env.POSTGRES_URI,
	},
}

module.exports = nextConfig
