// "use client"
import { getAllOrders } from "@/app/api/fetch/order"
import { auth } from "@/lib/auth/auth"
import Order from "@/shared/components/Order/Order"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import styles from "./page.module.scss"

// import { getAllOrders } from "@/app/api/fetch/order"
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"

// export default function Orders() {
// 	const session = useSession()
// 	const router = useRouter()
// 	if (session.status === "unauthenticated") {
// 		router.push("/")
// 	}
// 	const [orders, setOrders] = useState()
// 	useEffect(() => {
// 		const fetchOrders = async () => {
// 			const orders = await getAllOrders()
// 			console.log(orders.data)
// 		}
// 		fetchOrders()
// 	}, [])

// 	return <div className="container">Orders</div>
// }
export const revalidate = 0

export default async function Orders() {
	const session = await auth()
	const cookiesStore = cookies()
	const token = cookiesStore.get("authjs.session-token")
	if (!session || !token?.value) redirect("/")
	const orders = await getAllOrders(token.value)
	return (
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
	)
}
