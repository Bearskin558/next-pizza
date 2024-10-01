import { hostname } from "os"

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
		staleTimes: {
			static: 10,
			dynamic: 10,
		},
	},
	images: {
		remotePatterns: [
			{
				hostname: "lh3.googleusercontent.com",
			},
			{
				hostname: "avatars.githubusercontent.com",
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
