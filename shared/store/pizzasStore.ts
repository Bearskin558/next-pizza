import { Pizza } from "@/types/pizzas"
import { create } from "zustand"

interface PizzasStore {
	pizzas: Pizza[]
	setPizzas: (pizzas: Pizza[]) => void
}

export const usePizzasStore = create<PizzasStore>(set => ({
	pizzas: [],
	setPizzas: pizzas => set({ pizzas }),
}))
