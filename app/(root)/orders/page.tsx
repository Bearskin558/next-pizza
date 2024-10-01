import { getAllOrders } from "@/app/api/fetch/order"
import { auth } from "@/lib/auth/auth"
import EmptyOrders from "@/shared/components/EmtyOrders/EmptyOrders"
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
	const token = cookiesStore.get("__Secure-authjs.session-token")
	if (!session || !token?.value) redirect("/")
	const response = await getAllOrders(token.value)
	if (response.status === 200)
		return (
			<main>
				<div className="container">
					{response.data.length > 0 && (
						<div className={styles.ordersWrapper}>
							{response.data.map(item => (
								<Order
									order={item}
									key={item.id}
								/>
							))}
						</div>
					)}
					{response.data.length === 0 && <EmptyOrders />}
				</div>
			</main>
		)
}
