import { CartItemRequestPostData } from "@/types/cart"

export const isCartItemRequestPostData = (data: unknown): data is CartItemRequestPostData => {
	if (typeof data !== "object" || !data) return false
	if ("toppings" in data && !Array.isArray(data.toppings)) return false
	return "cartId" in data && "pizzaId" in data && "pizzaSizeId" in data && "count" in data && "pizzaDoughType" in data
}
