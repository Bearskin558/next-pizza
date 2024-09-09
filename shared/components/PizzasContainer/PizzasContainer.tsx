"use client"

import { useFilterStore } from "@/shared/store/filters"
import { usePizzasStore } from "@/shared/store/pizzasStore"
import { Pizza } from "@/types/pizzas"
import { toFilterPizza } from "@/utils/toFilterPizzas"
import { useEffect } from "react"
import PizzaCard from "../PizzaCard"
import styles from "./PizzasContainer.module.css"

interface Props {
	pizzas: Pizza[]
}

const PizzasContainer = ({ pizzas }: Props) => {
	const setPizzas = usePizzasStore(state => state.setPizzas)
	const [currentCategory, minPrice, maxPrice, ingredients] = useFilterStore(state => [
		state.category,
		state.minPrice,
		state.maxPrice,
		state.ingredients,
	])
	const filterdPizzas = toFilterPizza(pizzas, currentCategory, minPrice, maxPrice, ingredients)

	useEffect(() => {
		setPizzas(filterdPizzas)
	}, [])

	return (
		<div className={styles.container}>
			{filterdPizzas.map(pizza => (
				<PizzaCard
					pizza={pizza}
					key={pizza.id}
				/>
			))}
		</div>
	)
}

export default PizzasContainer
