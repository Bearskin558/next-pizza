"use client"

import { getCart } from "@/app/api/fetch/cart"
import { getAllCartItems } from "@/app/api/fetch/cartItem"
import { useCartStore } from "@/shared/store/cartStore"
import { Button } from "@mantine/core"
import { ShoppingCart02Icon } from "hugeicons-react"
import MotionNumber from "motion-number"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { Colors } from "@/constants/colors"
import HeaderButton from "../HeaderButton/HeaderButton"
import styles from "./CartButton.module.scss"

const CartButton = () => {
	const user = useSession()
	const [setCartId, resetCart, setCartItems, cartItems] = useCartStore(state => [
		state.setCartId,
		state.resetCart,
		state.setCartItems,
		state.cartItems,
	])

	useEffect(() => {
		const fetchCart = async () => {
			const response = await getCart()
			if (response.status === 200) setCartId(response.data.id)
		}

		const fetchCartItems = async () => {
			const response = await getAllCartItems()

			if (response.status === 200) {
				setCartItems(response.data)
			}
		}

		if (user.status === "authenticated") {
			fetchCart()
			fetchCartItems()
		}
		if (user.status === "unauthenticated") resetCart()
	}, [user.status])

	return (
		// <div className={styles.wrapper}>
		// 	<HeaderButton Icon={ShoppingCart02Icon} />
		// 	<div className={styles.countWrapper}>
		// 		<p>{cartItems.length}</p>
		// 	</div>

		// </div>
		<Button
			className={styles.button}
			variant="outline"
			rightSection={<p className={styles.count}>{cartItems.length}</p>}
			leftSection={
				<ShoppingCart02Icon
					color={Colors.ACCENT}
					size={20}
				/>
			}
			radius="xl"
			classNames={{ label: styles.label }}
		>
			<p className={styles.separate} />
		</Button>
	)
}

export default CartButton
