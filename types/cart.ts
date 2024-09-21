import { PizzaSize } from "@prisma/client"
import { Ingredient, Pizza } from "./pizzas"

export interface Cart {
	id: string
	userId: string
	cartItems: CartItem[]
	pizzaSize: Pick<PizzaSize, "id" | "pizzaId" | "size" | "price">
}

export interface CartItem {
	id: string
	cartId: string
	pizza: Pizza
	toppings: Ingredient[]
}

// id        String       @id @default(cuid())
// createdAt DateTime     @default(now())
// updatedAt DateTime     @updatedAt
// cart      Cart         @relation(fields: [cartId], references: [id])
// cartId    String
// pizza     Pizza        @relation(fields: [pizzaId], references: [id])
// pizzaId   String
// toppings  Ingredient[]
