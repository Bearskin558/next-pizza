import { getAllIngredients } from "@/app/api/fetch/getAllIngredients"
import { getPizzaById } from "@/app/api/fetch/pizza"
import PizzaPage from "@/shared/components/PizzaPage/PizzaPage"
import React from "react"

const CurrentPizzaPage = async ({ params: { id } }: { params: { id: string } }) => {
	const pizza = (await getPizzaById(id)).data
	const ingredients = (await getAllIngredients()).data
	if (pizza)
		return (
			<PizzaPage
				pizza={pizza}
				ingredients={ingredients}
			/>
		)
}

export default CurrentPizzaPage
