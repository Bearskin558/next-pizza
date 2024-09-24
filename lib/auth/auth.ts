import { prisma } from "@/prisma/prisma-client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthConfig } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

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
