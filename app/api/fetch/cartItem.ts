import { CartItemRequestPatchData, CartItemRequestPostData } from "@/types/cart"
import { CartItem } from "@prisma/client"
import { api } from "./instance"

export const getAllCartItems = async () => api.get<CartItem[]>("/cartItems", { next: { revalidate: 0 } })

export const postCartItem = async (cartItem: CartItemRequestPostData) =>
	api.post<CartItem[]>("/cartItems", { next: { revalidate: 0 } }, cartItem)

export const deleteCartItem = async (id: string) =>
	api.delete<CartItem[]>(`/cartItems${id}`, { next: { revalidate: 0 } })

export const patchCartItem = async (cartItem: CartItemRequestPatchData) =>
	api.patch(`/cartItems/${cartItem.id}`, { next: { revalidate: 0 } }, cartItem)
