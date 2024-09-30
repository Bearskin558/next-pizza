import { ActionIcon } from "@mantine/core"
import clsx from "clsx"
import { HugeiconsProps } from "hugeicons-react"
import { FC, useState } from "react"
import styles from "./CartItemButton.module.scss"

interface Props {
	Icon: FC<HugeiconsProps>
	onClick: () => Promise<void>
	className?: string
	variant?: "outline" | "transparent"
	disabled?: boolean
}

const CartItemButton = ({ Icon, onClick, className, variant = "transparent", disabled = false }: Props) => {
	const classNames = clsx(className, styles.cartItemButton)
	const [isLoading, setIsLoading] = useState(false)
	const onClickHanler = async () => {
		setIsLoading(true)
		await onClick()
		setIsLoading(false)
	}

	return (
		<ActionIcon
			children={<Icon />}
			onClick={onClickHanler}
			loading={isLoading}
			className={classNames}
			variant={variant}
			color="accent"
			radius="md"
			disabled={disabled}
		/>
	)
}

export default CartItemButton
