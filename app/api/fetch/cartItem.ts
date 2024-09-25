import { CartItemRequestData } from "@/types/cart"
import { CartItem } from "@prisma/client"
import { api } from "./instance"

export const getAllCartItems = async () => api.get<CartItem[]>("/cartItems", { revalidate: 0 })
export const postCartItems = async (cartItem: CartItemRequestData) =>
	api.post<CartItem[]>("/cartItems", { revalidate: 0 }, cartItem)
export const deleteCartItems = async (id: string) => api.get<CartItem[]>(`/cartItems${id}`, { revalidate: 0 })
