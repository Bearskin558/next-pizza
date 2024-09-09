import { ActionIcon, Button } from "@mantine/core"
import { AccidentIcon, ShoppingCart02Icon } from "hugeicons-react"
import { Colors } from "@/constants/colors"
import styles from "./CartButton.module.css"

const CartButton = () => {
	return (
		<ActionIcon
			className={styles.btn}
			color={Colors.ACCENT}
			variant="outline"
		>
			<ShoppingCart02Icon
				color={Colors.ACCENT}
				size={20}
			/>
		</ActionIcon>
	)
}

export default CartButton
