import { useCartStore } from "@/shared/store/cartStore"
import { Button } from "@mantine/core"
import MotionNumber from "motion-number"
import styles from "./CartTotalBlock.module.scss"

const CartTotalBlock = () => {
	const cartItems = useCartStore(state => state.cartItems)
	const totalPrice = cartItems.reduce(
		(sum, item) =>
			item.count *
				(item.pizza.sizes.find(size => size.id === item.pizzaSizeId)?.price! +
					item.toppings.reduce((sum, topping) => topping.price + sum, 0)) +
			sum,
		0,
	)
	return (
		<div className={styles.wrapper}>
			<p className={styles.title}>Итого:</p>
			<MotionNumber
				value={totalPrice}
				format={{ notation: "standard", currency: "RUB", style: "currency", maximumFractionDigits: 0 }}
				className={styles.price}
			/>
			{/* <p className={styles.price}>{totalPrice} ₽</p> */}
			<Button className={styles.button}>
				<p className={styles.buttonText}>Перейти к оплате</p>
			</Button>
		</div>
	)
}

export default CartTotalBlock
