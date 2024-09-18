import { auth } from "@/lib/auth/auth"
import React from "react"

const ProfilePage = async () => {
	const session = await auth()

	return (
		<div className="container">
			<p>{session?.user?.name}</p>
			<p>{session?.user?.email}</p>
		</div>
	)
}

export default ProfilePage
