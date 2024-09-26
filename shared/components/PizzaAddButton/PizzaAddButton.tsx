import { Button, Tooltip } from "@mantine/core"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import AddButtonPrice from "../AddButtonPrice/AddButtonPrice"
import styles from "./PizzaAddButton.module.scss"

interface Props {
	price: number
	onClick: () => void
	isLoading: boolean
}

const PizzaAddButton = ({ price, onClick, isLoading }: Props) => {
	const { data: session } = useSession()
	const router = useRouter()

	const onClickHandler = () => {
		onClick()
		router.refresh()
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
				rightSection={<AddButtonPrice price={price} />}
				disabled={!session}
				onClick={onClickHandler}
				loading={isLoading}
			>
				Добавить в корзину
			</Button>
		</Tooltip>
	)
}

export default PizzaAddButton
