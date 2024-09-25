import { Ingredient } from "@/types/pizzas"
import { api } from "./instance"

export const getAllIngredients = async () => api.get<Ingredient[]>("/ingredients", { next: { revalidate: 3600 } })
