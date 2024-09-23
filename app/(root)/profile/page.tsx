import { auth } from "@/lib/auth/auth"
import { redirect } from "next/navigation"
import React from "react"

const ProfilePage = async () => {
	const session = await auth()
	if (!session) redirect("/")
	return (
		<div className="container">
			<p>{session?.user?.name}</p>
			<p>{session?.user?.email}</p>
		</div>
	)
}

export default ProfilePage
