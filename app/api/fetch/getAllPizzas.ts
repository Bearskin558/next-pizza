import { Pizza } from "@/types/pizzas"
import { api } from "./instance"

export const getAllPizzas = async () => api.get<Pizza[]>("/pizzas", { revalidate: 3600 })
