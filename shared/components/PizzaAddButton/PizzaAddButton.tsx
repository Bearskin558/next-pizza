import { Button, Tooltip } from "@mantine/core"
import { useSession } from "next-auth/react"
import AddButtonPrice from "../AddButtonPrice/AddButtonPrice"
import styles from "./PizzaAddButton.module.scss"

interface Props {
	price: number
}

const PizzaAddButton = ({ price }: Props) => {
	const { data: session } = useSession()

	return (
		<Tooltip
			label="Необходимо войти в аккаунт"
			disabled={Boolean(session)}
			color="accent"
			position="bottom"
		>
			<Button
				className={styles.addButton}
				rightSection={<AddButtonPrice price={price} />}
				disabled={!session}
			>
				Добавить в корзину
			</Button>
		</Tooltip>
	)
}

export default PizzaAddButton
