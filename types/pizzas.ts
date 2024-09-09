export interface Pizza {
	id: string
	name: string
	description: string
	imageUrl: string
	sizes: Size[]
	ingredients: Ingredient[]
	categories: Category[]
}

interface Size {
	size: PizzaSizeName
	price: number
}

export interface Ingredient {
	id: string
	name: string
	price: number
	imageUrl: string
}

export type PizzaSizeName = "SMALL" | "MEDIUM" | "LARGE"
export type Category = "ALL" | "MEAT" | "SPICY" | "SWEET" | "VEGAN" | "CHICKEN"
