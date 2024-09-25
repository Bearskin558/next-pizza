import { Cart, CartItem } from "@prisma/client"
import { api } from "./instance"

export const getCart = async (config?: RequestInit) =>
	api.get<Cart & { cartItems: CartItem[] }>("/cart", { next: { revalidate: 0 }, ...config })

export const postCart = async () => api.post<Cart>("/cart", { next: { revalidate: 0 } })
