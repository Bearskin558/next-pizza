import prisma from "@/prisma/prisma-client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthConfig } from "next-auth"
import GithubPrvider from "next-auth/providers/github"
import GooglePrvider from "next-auth/providers/google"

export const authConfig: NextAuthConfig = {
	providers: [
		GooglePrvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		GithubPrvider({
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
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
