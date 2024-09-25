import { Pizza } from "@/types/pizzas"
import { api } from "./instance"

export const getAllPizzas = async () => api.get<Pizza[]>("/pizzas", { next: { revalidate: 3600 } })

export const getPizzaById = async (id: string) => api.get<Pizza>(`/pizzas/${id}`, { next: { revalidate: 3600 } })

export const searchPizzas = async (query: string) =>
	api.get<Pizza[]>(`/pizzas/search?query=${query}`, { next: { revalidate: 3600 } })
