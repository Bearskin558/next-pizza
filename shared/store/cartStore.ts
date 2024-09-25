import { CartItem } from "@prisma/client"
import { create } from "zustand"

interface CartStore {
	cartId: string
	cartItems: CartItem[]
	setCartItems: (cartItems: CartItem[]) => void
	setCartId: (id: string) => void
	resetCart: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
	cartId: "",
	cartItems: [],
	setCartId: id => {
		set({ cartId: id })
	},
	setCartItems: cartItems => {
		set({ cartItems })
	},
	resetCart: () => {
		set({
			cartId: "",
			cartItems: [],
		})
	},
}))
