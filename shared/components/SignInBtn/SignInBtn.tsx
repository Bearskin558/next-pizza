import { signIn } from "@/lib/auth/auth"
import { Button, Text } from "@mantine/core"
import { UserIcon } from "hugeicons-react"
import { Colors } from "@/constants/colors"
import styles from "./SignInBtn.module.scss"

const SignInBtn = () => {
	return (
		<form
			action={async () => {
				"use server"
				await signIn()
			}}
		>
			<Button
				className={styles.signIn}
				variant="outline"
				type="submit"
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
		</form>
	)
}

export default SignInBtn
