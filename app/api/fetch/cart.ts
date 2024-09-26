import { CartResponse } from "@/types/cart"
import { Cart, CartItem } from "@prisma/client"
import { api } from "./instance"

export const getCart = async (config?: RequestInit) =>
	api.get<CartResponse>("/cart", { next: { revalidate: 0 }, ...config })
