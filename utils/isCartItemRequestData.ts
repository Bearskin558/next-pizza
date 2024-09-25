import { CartItemRequestPatchData, CartItemRequestPostData } from "@/types/cart"

export const isCartItemRequestPatchData = (data: unknown): data is CartItemRequestPatchData => {
	if (typeof data !== "object" || !data) return false
	if ("toppings" in data && !Array.isArray(data.toppings)) return false
	return (
		"id" in data &&
		"cartId" in data &&
		"pizzaId" in data &&
		"pizzaSizeId" in data &&
		"count" in data &&
		"pizzaDoughType" in data
	)
}

export const isCartItemRequestPostData = (data: unknown): data is CartItemRequestPostData => {
	if (typeof data !== "object" || !data) return false
	if ("toppings" in data && !Array.isArray(data.toppings)) return false
	return "cartId" in data && "pizzaId" in data && "pizzaSizeId" in data && "count" in data && "pizzaDoughType" in data
}
