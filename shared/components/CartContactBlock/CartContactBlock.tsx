import { InputBase, TextInput } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { IMaskInput } from "react-imask"
import { ContactsForm } from "../CartPage/CartPage"
import styles from "./CartContactBlock.module.scss"

interface Props {
	form: UseFormReturnType<ContactsForm, (values: ContactsForm) => ContactsForm>
}

const CartContactBlock = ({ form }: Props) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.names}>
				<TextInput
					label="Имя:"
					type="text"
					withAsterisk
					{...form.getInputProps("userName")}
				/>
				<TextInput
					label="Фамилия:"
					type="text"
					{...form.getInputProps("userSurname")}
				/>
			</div>
			<div className={styles.contacts}>
				<TextInput
					label="E-Mail:"
					type="email"
					withAsterisk
					{...form.getInputProps("email")}
				/>
				<InputBase
					label="Телефон:"
					component={IMaskInput}
					mask="+7 (000) 000-0000"
					placeholder="+7 (999) 999-9999"
					withAsterisk
					{...form.getInputProps("phoneNumber")}
				/>
			</div>
			<TextInput
				label="Адрес:"
				type="text"
				withAsterisk
				{...form.getInputProps("address")}
			/>
		</div>
	)
}

export default CartContactBlock
