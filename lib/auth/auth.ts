import NextAuth, { NextAuthConfig } from "next-auth"
import GooglePrvider from "next-auth/providers/google"

export const authConfig: NextAuthConfig = {
	providers: [
		GooglePrvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	callbacks: {
		authorized: async ({ auth }) => {
			return !!auth //редирект на страницу аутентификации для приватных роутов
		},
	},
	pages: {
		signIn: "/signin",
	},
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
