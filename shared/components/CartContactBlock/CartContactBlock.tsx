import { InputBase, TextInput } from "@mantine/core"
import { IMaskInput } from "react-imask"
import styles from "./CartContactBlock.module.scss"

const CartContactBlock = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.names}>
				<TextInput
					label="Имя:"
					type="text"
					withAsterisk
				/>
				<TextInput
					label="Фамилия:"
					type="text"
				/>
			</div>
			<div className={styles.contacts}>
				<TextInput
					label="E-Mail:"
					type="email"
					withAsterisk
				/>
				<InputBase
					label="Телефон:"
					component={IMaskInput}
					mask="+7 (000) 000-0000"
					placeholder="+7 (999) 999-9999"
					withAsterisk
				/>
			</div>
		</div>
	)
}

export default CartContactBlock
