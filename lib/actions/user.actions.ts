"use server"

import { signIn } from "next-auth/react"

export const signinGoogle = async () => {
	await signIn("google", { redirectTo: "/" })
}
