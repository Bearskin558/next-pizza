import { OrderPostRequestData } from "@/types/order"
import { api } from "./instance"

export const getAllOrders = async () => api.get("/orders", { next: { revalidate: 0 } })
export const createOrder = async (order: OrderPostRequestData) =>
	api.post<{ message: string }>("/orders", { next: { revalidate: 0 } }, order)
