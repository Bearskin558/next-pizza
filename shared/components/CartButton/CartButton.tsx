"use client"

import { getCart } from "@/app/api/fetch/cart"
import { useCartStore } from "@/shared/store/cartStore"
import { Button } from "@mantine/core"
import { ShoppingCart02Icon } from "hugeicons-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Colors } from "@/constants/colors"
import styles from "./CartButton.module.scss"

const CartButton = () => {
	const user = useSession()
	const [setCartId, resetCart, setCartItems, cartItems] = useCartStore(state => [
		state.setCartId,
		state.resetCart,
		state.setCartItems,
		state.cartItems,
	])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchCart = async () => {
			const response = await getCart()
			if (response.status === 200) {
				setCartId(response.data.id)
				setCartItems(response.data.cartItems)
			}
		}

		if (user.status === "authenticated") {
			fetchCart()
		}
		if (user.status === "unauthenticated") resetCart()
		setIsLoading(false)
	}, [user.status])

	return (
		<Link href="/cart">
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
				loading={isLoading}
			>
				<p className={styles.separate} />
			</Button>
		</Link>
	)
}

export default CartButton
