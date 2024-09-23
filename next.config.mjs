import { hostname } from "os"

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
	},
	images: {
		remotePatterns: [
			{
				hostname: "lh3.googleusercontent.com",
			},
		],
	},
	webpack(config) {
		config.experiments = {
			asyncWebAssembly: true,
			layers: true,
			topLevelAwait: true,
		}

		return config
	},
}

export default nextConfig
