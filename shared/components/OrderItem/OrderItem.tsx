import { ResponseOrdersItem } from "@/types/order"
import Image from "next/image"
import styles from "./OrderItem.module.scss"

interface Props {
	orderItem: ResponseOrdersItem
}

const OrderItem = ({ orderItem }: Props) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.textBlock}>
				<Image
					src={orderItem.pizza.imageUrl}
					width={65}
					height={65}
					alt={orderItem.pizza.name}
				/>
				<div>
					<p>{orderItem.pizza.name}</p>
					{orderItem.toppings.length > 0 && (
						<div>
							<p>Дополнительные ингредиенты:</p>
							<p>{orderItem.toppings.map(item => item.name).join(", ")}</p>
						</div>
					)}
				</div>
			</div>
			<div>
				<p className={styles.count}>{orderItem.count} шт.</p>
				<p className={styles.price}>{orderItem.price} ₽</p>
			</div>
		</div>
	)
}

export default OrderItem
