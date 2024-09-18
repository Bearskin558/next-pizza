"use client"

import { SegmentedControl } from "@mantine/core"
import { useState } from "react"
import SigninForm from "../SigninForm/SigninForm"
import SignupForm from "../SignupForm/SignupForm"
import styles from "./SigninPage.module.scss"

type SigninType = "signin" | "signup"
interface SigninData {
	label: string
	value: SigninType
}

const signData: SigninData[] = [
	{
		label: "Войти",
		value: "signin",
	},
	{
		label: "Зарегистрироваться",
		value: "signup",
	},
]

const SigninPage = () => {
	const [type, setType] = useState<SigninType>("signin")

	return (
		<div className={styles.wrapper}>
			<SegmentedControl
				data={signData}
				value={type}
				onChange={str => setType(str as SigninType)}
			></SegmentedControl>
			{type === "signin" && <SigninForm />}
			{type === "signup" && <SignupForm />}
		</div>
	)
}

export default SigninPage
