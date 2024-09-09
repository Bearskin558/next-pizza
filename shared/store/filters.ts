import { Category } from "@/types/pizzas"
import { create } from "zustand"

interface FilterState {
	category: Category
	minPrice: number
	maxPrice: number
	ingredients: string[]
	setCategory: (categoryName: Category) => void
	setMaxPrice: (price: number) => void
	setMinPrice: (price: number) => void
	setIngredients: (ingredients: string[]) => void
	resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set, get) => ({
	category: "ALL",
	minPrice: 0,
	maxPrice: 2000,
	ingredients: [],
	setCategory: categoryName => set({ category: categoryName }),
	setMinPrice: price => set({ minPrice: price }),
	setMaxPrice: price => set({ maxPrice: price }),
	setIngredients: ingredients => set({ ingredients: ingredients }),
	resetFilters: () => {
		set({
			ingredients: [],
			minPrice: 0,
			maxPrice: 2000,
		})
	},
}))
