import { Pizza } from "@/types/pizzas"
import { api } from "./instance"

export const getAllPizzas = async () => api.get<Pizza[]>("/pizzas", { revalidate: 3600 })

export const getPizzaById = async (id: string) => api.get<Pizza>(`/pizzas/${id}`, { revalidate: 3600 })

export const searchPizzas = async (query: string) =>
	api.get<Pizza[]>(`/pizzas/search?query=${query}`, { revalidate: 60 })
