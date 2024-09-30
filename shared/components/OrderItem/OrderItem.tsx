import { ResponseOrdersItem } from "@/types/order"
import Image from "next/image"
import styles from "./OrderItem.module.scss"

interface Props {
	orderItem: ResponseOrdersItem
}

const OrderItem = ({ orderItem }: Props) => {
	return (
		<div className={styles.wrapper}>
			<Image
				src={orderItem.pizza.imageUrl}
				width={65}
				height={65}
				alt={orderItem.pizza.name}
			/>
			<div className={styles.textBlock}>
				<p>{orderItem.pizza.name}</p>
				{orderItem.toppings.length > 0 && (
					<p>{`Дополнительные ингредиенты: ${orderItem.toppings.map(item => item.name).join(", ")}`}</p>
				)}
			</div>
			<p className={styles.count}>{orderItem.count} шт.</p>
			<p className={styles.price}>{orderItem.price} ₽</p>
		</div>
	)
}

export default OrderItem
