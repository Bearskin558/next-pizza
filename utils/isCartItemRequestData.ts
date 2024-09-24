import { CartItemRequestData } from "@/types/cart"

const isCartItemRequestData = (data: unknown): data is CartItemRequestData[] => {
	if (!Array.isArray(data)) return false
	if ("toppings" in data && Array.isArray(data.toppings) && data.some(item => typeof item !== "string")) return false
	return data.reduce((result, item) => {
		if (typeof item !== "object") return false
		return "pizzaId" in item && "cartId" in item && "pizzaSizeId" in item && result
	}, true)
}

export default isCartItemRequestData
