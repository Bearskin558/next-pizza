import { Colors } from "@/constants/colors"
import { Button, Text } from "@mantine/core"
import { UserIcon } from "hugeicons-react"
import styles from "./SignInBtn.module.css"

const SignInBtn = () => {
	return (
		<Button
			className={styles.signIn}
			variant="outline"
			leftSection={
				<UserIcon
					color={Colors.ACCENT}
					size={20}
				/>
			}
		>
			<Text size="sm">Войти</Text>
		</Button>
	)
}

export default SignInBtn
