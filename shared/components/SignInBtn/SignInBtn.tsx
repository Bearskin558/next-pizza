import { signIn } from "@/lib/auth/auth"
import { Button, Menu, MenuDropdown, MenuItem, MenuTarget, Text } from "@mantine/core"
import { GithubIcon, GoogleIcon, UserIcon } from "hugeicons-react"
import { Colors } from "@/constants/colors"
import styles from "./SignInBtn.module.scss"

const SignInBtn = () => {
	return (
		<Menu>
			<MenuTarget>
				<Button
					className={styles.signIn}
					variant="outline"
					// loading={isLoading}
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
				{/* <MenuItem
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
				</MenuItem> */}
				<form
					action={async () => {
						"use server"
						await signIn("google")
					}}
				>
					<MenuItem
						leftSection={<GoogleIcon />}
						type="submit"
					>
						Google
					</MenuItem>
				</form>
				<form
					action={async () => {
						"use server"
						await signIn("github")
					}}
				>
					<MenuItem
						leftSection={<GithubIcon />}
						type="submit"
					>
						Github
					</MenuItem>
				</form>
			</MenuDropdown>
		</Menu>
	)
}

export default SignInBtn
