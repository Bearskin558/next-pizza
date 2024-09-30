"use client"

import { getAllOrders } from "@/app/api/fetch/order"
import { useEffect, useState } from "react"

export default function Orders() {
	const [orders, setOrders] = useState()
	useEffect(() => {
		const fetchOrders = async () => {
			const orders = await getAllOrders()
			console.log(orders.data)
		}
		fetchOrders()
	}, [])

	return <div className="container">Orders</div>
}
