import { Button, Tooltip } from "@mantine/core"
import { useSession } from "next-auth/react"
import PizzaPrice from "../PizzaModal/PizzaPrice"
import styles from "./PizzaModalAddButton.module.scss"

interface Props {
	price: number
}

const PizzaModalAddButton = ({ price }: Props) => {
	const { data: session } = useSession()
	console.log(session)

	const onClickHanler = () => {
		if (!session) 1
	}

	return (
		<Tooltip
			label="Необходимо войти в аккаунт"
			disabled={Boolean(session)}
			color="accent"
			position="bottom"
		>
			<Button
				className={styles.addButton}
				rightSection={<PizzaPrice price={price} />}
				disabled={!session}
			>
				Добавить в корзину
			</Button>
		</Tooltip>
	)
}

export default PizzaModalAddButton
