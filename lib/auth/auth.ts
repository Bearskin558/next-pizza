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
			clientId: process.env.CLIENT_ID_GITHUB,
			clientSecret: process.env.SECRET_GITHUB,
		}),
	],
	adapter: PrismaAdapter(prisma),
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
