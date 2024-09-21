import { CartItem } from "@/types/cart"
import { create } from "zustand"

interface CartStore {
	cartItems: CartItem[]
	totalPrice: number
	setCartItem: (cartItem: CartItem) => void
	deleteCartItem: (id: string) => void
}

export const cartStore = create<CartStore>((set, get) => ({
	cartItems: [],
	totalPrice: 0,
	setCartItem: (cartItem: CartItem) => {
		set({ cartItems: [...get().cartItems, cartItem] })
	},
	deleteCartItem: (id: string) => {
		set({ cartItems: get().cartItems.filter(item => item.id !== id) })
	},
}))
