import { signinGoogle } from "@/lib/actions/user.actions"
import { Button, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { signIn } from "next-auth/react"
import styles from "./SigninForm.module.scss"

const SigninForm = () => {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			password: "",
		},
	})

	const onSubmitHandler = (values: typeof form.values) => {
		console.log(values)
	}

	return (
		<div>
			<form onSubmit={form.onSubmit(onSubmitHandler)}>
				<TextInput
					className={styles.input}
					label="Email"
					type="email"
					c={"#FFFFFF"}
					required
					key={form.key("email")}
					{...form.getInputProps("email")}
				/>
				<PasswordInput
					label="Password"
					type="password"
					required
					key={form.key("password")}
					{...form.getInputProps("password")}
				/>
				<div className={styles.btnBlock}>
					<Button
						fz="sm"
						variant="light"
						size="lg"
						onClick={() => signIn("google", { redirectTo: "/" })}
					>
						Google
					</Button>

					<Button
						type="submit"
						fz="sm"
						variant="light"
						size="lg"
					>
						Войти
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SigninForm
