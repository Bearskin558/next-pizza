import { Ingredient } from "@/types/pizzas"
import { create } from "zustand"

interface IngredientsStore {
	ingredients: Ingredient[]
	setIngredients: (ingredients: Ingredient[]) => void
}

export const useIngredientsStore = create<IngredientsStore>(set => ({
	ingredients: [],
	setIngredients: ingredients => set({ ingredients }),
}))
