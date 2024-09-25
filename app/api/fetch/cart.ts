import { Cart } from "@prisma/client"
import { api } from "./instance"

export const getCart = async () => api.get<Cart>("/cart", { revalidate: 0 })

export const postCart = async () => api.post<Cart>("/cart", { revalidate: 0 })
