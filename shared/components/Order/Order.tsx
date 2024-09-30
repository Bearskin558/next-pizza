import { ResponseOrder } from "@/types/order"
import OrderItem from "../OrderItem/OrderItem"
import styles from "./Order.module.scss"

interface Props {
	order: ResponseOrder
}

const Order = ({ order }: Props) => {
	const createdAtDate = new Date(order.createdAt)
	const createdAtString = `Дата заказа: ${createdAtDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}, ${createdAtDate.toLocaleDateString()}`
	return (
		<div className={styles.wrapper}>
			<p className={styles.title}>{`Номер заказа: ${order.number}`}</p>
			<p>{`Адрес: ${order.address}`}</p>
			<p>{createdAtString}</p>
			<div className={styles.orderItems}>
				<p>Состав заказа:</p>
				<div className={styles.orderItemsContainer}>
					{order.orderItems.map(item => (
						<OrderItem
							orderItem={item}
							key={item.id}
						/>
					))}
				</div>
			</div>
			<p>Общая стоимость: {order.totalPrice} ₽</p>
		</div>
	)
}

export default Order
