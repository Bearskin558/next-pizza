import { Button, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import styles from "./SignupForm.module.scss"

const SignupForm = () => {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
	})

	return (
		<div>
			<form>
				<TextInput
					label="Имя"
					type="name"
					required
				/>
				<TextInput
					label="Email"
					type="email"
					required
				/>
				<PasswordInput
					label="Password"
					type="password"
					required
				/>
				<div className={styles.btnBlock}>
					<Button
						type="submit"
						fz="sm"
						variant="light"
						size="lg"
					>
						Зарегистрироваться
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignupForm
