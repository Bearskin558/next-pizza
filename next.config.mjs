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
}

export default nextConfig
