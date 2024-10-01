import { Sad02Icon, ShoppingCart01Icon } from "hugeicons-react"
import styles from "./EmptyCart.module.scss"

const EmptyCart = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.svgBlock}>
				<ShoppingCart01Icon size={300} />
				<Sad02Icon
					className={styles.sadIcon}
					size={50}
				/>
			</div>
			<p className={styles.text}>Ваша корзина пуста и одинока</p>
		</div>
	)
}

export default EmptyCart
