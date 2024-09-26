import { CartItem, PizzaSize } from "@prisma/client"
import { Ingredient, Pizza } from "./pizzas"

export interface Cart {
	id: string
	userId: string
	cartItems: CartItem[]
	pizzaSize: Pick<PizzaSize, "id" | "pizzaId" | "size" | "price">
}

export type RequestDataToEditCountCartItem = Pick<CartItem, "id" | "count">
export type CartItemRequestPostData = Omit<CartItem, "createdAt" | "updatedAt" | "id"> & {
	toppings?: string[]
}

export type CartItemResponse = CartItem & {
	pizza: {
		name: string
		id: string
		description: string
		imageUrl: string
		sizes: PizzaSize[]
	}
	toppings: {
		name: string
		id: string
		imageUrl: string
		price: number
	}[]
}

export interface CartResponse {
	id: string
	cartItems: CartItemResponse[]
}
