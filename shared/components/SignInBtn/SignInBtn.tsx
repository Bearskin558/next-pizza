import { signIn } from "@/lib/auth/auth"
import { Menu, MenuDropdown, MenuItem, MenuLabel, MenuTarget, Text } from "@mantine/core"
import { GithubIcon, GoogleIcon, UserIcon } from "hugeicons-react"
import HeaderButton from "../HeaderButton/HeaderButton"

const SignInBtn = () => {
	return (
		<Menu>
			<MenuTarget>
				<HeaderButton Icon={UserIcon} />
			</MenuTarget>
			<MenuDropdown>
				<MenuLabel>Войти при помощи:</MenuLabel>
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
