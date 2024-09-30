import { OrderPostRequestData, ResponseOrder } from "@/types/order"
import { api } from "./instance"

export const getAllOrders = async (token: string) =>
	api.get<ResponseOrder[]>("/orders", {
		next: { revalidate: 0 },
		credentials: "include",
		headers: {
			Cookie: `authjs.session-token=${token}`,
		},
	})
export const createOrder = async (order: OrderPostRequestData) =>
	api.post<{ message: string }>("/orders", { next: { revalidate: 0 } }, order)
