import { getAllOrders } from "@/app/api/fetch/order"
import { auth } from "@/lib/auth/auth"
import Order from "@/shared/components/Order/Order"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import styles from "./page.module.scss"

export const generateMetadata = async () => {
	return {
		title: "Next Pizza | Заказы",
	}
}

export const revalidate = 0

export default async function Orders() {
	const session = await auth()
	const cookiesStore = cookies()
	const token = cookiesStore.get("authjs.session-token")
	if (!session || !token?.value) redirect("/")
	const orders = await getAllOrders(token.value)
	return (
		<main>
			<div className="container">
				<div className={styles.ordersWrapper}>
					{orders.data.map(item => (
						<Order
							order={item}
							key={item.id}
						/>
					))}
				</div>
			</div>
		</main>
	)
}
