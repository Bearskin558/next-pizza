"use client"

import { Button, Menu, MenuDropdown, MenuItem, MenuTarget, Text } from "@mantine/core"
import { GithubIcon, GoogleIcon, UserIcon } from "hugeicons-react"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Colors } from "@/constants/colors"
import styles from "./SignInBtn.module.scss"

type Auth = "google" | "github"

const SignInBtn = () => {
	const [isLoading, setIsLoading] = useState(false)

	const onClickAuthButton = (authType: Auth) => {
		setIsLoading(true)
		signIn(authType)
	}

	return (
		<Menu>
			<MenuTarget>
				<Button
					className={styles.signIn}
					variant="outline"
					loading={isLoading}
				>
					<div className={styles.inner}>
						<UserIcon
							color={Colors.ACCENT}
							size={20}
						/>
						<Text
							size="sm"
							className={styles.text}
						>
							Войти
						</Text>
					</div>
				</Button>
			</MenuTarget>
			<MenuDropdown>
				<MenuItem
					leftSection={<GithubIcon />}
					type="submit"
					onClick={() => onClickAuthButton("github")}
				>
					Github
				</MenuItem>

				<MenuItem
					leftSection={<GoogleIcon />}
					type="submit"
					onClick={() => onClickAuthButton("google")}
				>
					Google
				</MenuItem>
			</MenuDropdown>
		</Menu>
	)
}

export default SignInBtn
