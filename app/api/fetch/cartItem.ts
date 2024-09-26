import { RequestDataToEditCountCartItem, CartItemRequestPostData, CartItemResponse } from "@/types/cart"
import { CartItem } from "@prisma/client"
import { api } from "./instance"

export const getAllCartItems = async () => api.get<CartItemResponse[]>("/cartItems", { next: { revalidate: 0 } })

export const postCartItem = async (cartItem: CartItemRequestPostData) =>
	api.post<CartItemResponse[]>("/cartItems", { next: { revalidate: 0 } }, cartItem)

export const deleteCartItem = async (id: string) =>
	api.delete<CartItemResponse[]>(`/cartItems/${id}`, { next: { revalidate: 0 } })

export const patchCartItem = async (cartItem: RequestDataToEditCountCartItem) =>
	api.patch<CartItemResponse[]>(`/cartItems/${cartItem.id}`, { next: { revalidate: 0 } }, cartItem)
