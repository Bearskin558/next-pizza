"use client"

import { useCartStore } from "@/shared/store/cartStore"
import CartItem from "../CartItem/CartItem"
import styles from "./CartPage.module.scss"

const CartPage = () => {
	const cartItems = useCartStore(state => state.cartItems)
	return (
		<div className={styles.cartItemsContainer}>
			{cartItems.map(item => (
				<CartItem
					cartItem={item}
					key={item.id}
				/>
			))}
		</div>
	)
}

export default CartPage
