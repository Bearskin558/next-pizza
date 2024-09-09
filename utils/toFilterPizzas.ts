import { Category, Ingredient, Pizza } from "@/types/pizzas"

export const toFilterPizza = (
	pizzas: Pizza[],
	currentCategory: Category,
	priceMin: number,
	priceMax: number,
	ingredients: string[],
) => {
	const pizzasFilteredByCategories =
		currentCategory === "ALL" ? pizzas : pizzas.filter(pizza => pizza.categories.includes(currentCategory))
	return pizzasFilteredByCategories
		.filter(pizza => pizza.sizes[0].price > priceMin && pizza.sizes[0].price < priceMax)
		.filter(pizza =>
			ingredients.every(ingredient => pizza.ingredients.some(pizzaIngredient => pizzaIngredient.name === ingredient)),
		)
}
