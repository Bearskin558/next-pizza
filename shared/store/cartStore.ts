import { CartItemRequestData } from "@/types/cart"
import { create } from "zustand"

interface CartStore {
	cartItems: CartItemRequestData[]
	totalPrice: number
	updateCart: (cartItems: CartItemRequestData[]) => void
}

export const cartStore = create<CartStore>((set, get) => ({
	cartItems: [],
	totalPrice: 0,
	updateCart: (cartItems: CartItemRequestData[]) => {
		set({ cartItems })
	},
}))
