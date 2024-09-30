import { OrderPostItemRequestData, OrderPostRequestData } from "@/types/order"

export const isOrderPostRequestData = (data: unknown): data is OrderPostRequestData => {
	if (typeof data !== "object" || data === null || !("orderItems" in data)) return false
	return (
		"totalPrice" in data &&
		"address" in data &&
		"userName" in data &&
		"userSurname" in data &&
		"phoneNumber" in data &&
		isOrderPostItemRequestData(data.orderItems)
	)
}

const isOrderPostItemRequestData = (data: unknown): data is [] => {
	if (!Array.isArray(data)) return false
	return data.reduce((result, item) => {
		return (
			"pizzaId" in item &&
			"pizzaSizeId" in item &&
			"count" in item &&
			"toppings" in item &&
			Array.isArray(item.toppings) &&
			result
		)
	}, true)
}
