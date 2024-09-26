import { hostname } from "os"

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
		// reactCompiler: true,
		// staleTimes: {
		// 	static: 1,
		// 	dynamic: 1,
		// },
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
