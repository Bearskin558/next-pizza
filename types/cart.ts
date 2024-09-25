import { CartItem, PizzaSize } from "@prisma/client"
import { Ingredient, Pizza } from "./pizzas"

export interface Cart {
	id: string
	userId: string
	cartItems: CartItem[]
	pizzaSize: Pick<PizzaSize, "id" | "pizzaId" | "size" | "price">
}

export type CartItemRequestData = Omit<CartItem, "createdAt" | "updatedAt"> & {
	toppings?: string[]
}
