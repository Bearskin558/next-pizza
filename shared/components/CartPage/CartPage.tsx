"use client"

import { useCartStore } from "@/shared/store/cartStore"
import CartContactBlock from "../CartContactBlock/CartContactBlock"
import CartItem from "../CartItem/CartItem"
import CartTotalBlock from "../CartTotalBlock/CartTotalBlock"
import EmptyCart from "../EmtyCart/EmptyCart"
import styles from "./CartPage.module.scss"

const CartPage = () => {
	const cartItems = useCartStore(state => state.cartItems)
	if (cartItems.length === 0) return <EmptyCart />
	return (
		<div className={styles.cartContainer}>
			<div className={styles.cartWrapper}>
				<div className={styles.cartItemsContainer}>
					{cartItems.map(item => (
						<CartItem
							cartItem={item}
							key={item.id}
						/>
					))}
				</div>
				<CartContactBlock />
				<CartTotalBlock />
			</div>
		</div>
	)
}

export default CartPage
