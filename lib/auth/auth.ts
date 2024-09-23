import { PrismaAdapter } from "@auth/prisma-adapter"
import { Pool } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"
import NextAuth, { NextAuthConfig } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

const neon = new Pool({
	connectionString: process.env.POSTGRES_PRISMA_URL,
})
const adapter = new PrismaNeon(neon)
export const prisma = new PrismaClient({ adapter })

export const authConfig: NextAuthConfig = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	adapter: PrismaAdapter(prisma),
	// callbacks: {
	// 	authorized: async ({ auth }) => {
	// 		return !!auth //редирект на страницу аутентификации для приватных роутов
	// 	},
	// },
	// pages: {
	// 	signIn: "/signin",
	// },
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
