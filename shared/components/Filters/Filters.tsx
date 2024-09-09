"use client"

import { useFilterStore } from "@/shared/store/filters"
import { useIngredientsStore } from "@/shared/store/ingredients"
import { Ingredient } from "@/types/pizzas"
import { toCompareFilterStores } from "@/utils/toComapreStores"
import { toCompareFilterStoreWithInitial } from "@/utils/toCompareFilterStoreWithInitial"
import { Button, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import styles from "./Filters.module.css"
import IngredientsFilter from "./IngredientsFilter/IngredientsFilter"
import PriceFilter from "./PriceFilter/PriceFilter"

interface Props {
	ingredients: Ingredient[]
}

const Filters = ({ ingredients }: Props) => {
	const setIngredientsToStore = useIngredientsStore(state => state.setIngredients)
	const [
		setMinPriceStore,
		setMaxPriceStore,
		setIngredients,
		resetFilters,
		ingredientsStore,
		maxPriceStore,
		minPriceStore,
	] = useFilterStore(state => [
		state.setMinPrice,
		state.setMaxPrice,
		state.setIngredients,
		state.resetFilters,
		state.ingredients,
		state.maxPrice,
		state.minPrice,
	])
	const [minPrice, setMinPrice] = useState(0)
	const [maxPrice, setMaxPrice] = useState(2000)
	const [checkedIngredients, setCheckedIngredients] = useState<string[]>([])
	const isInitialState = toCompareFilterStoreWithInitial(minPrice, maxPrice, checkedIngredients)
	const isEqualFilterStores = toCompareFilterStores(
		minPrice,
		minPriceStore,
		maxPrice,
		maxPriceStore,
		checkedIngredients,
		ingredientsStore,
	)

	const applyHandler = () => {
		setMinPriceStore(minPrice)
		setMaxPriceStore(maxPrice)
		setIngredients(checkedIngredients)
	}

	const resetHandler = () => {
		resetFilters()
		setMinPrice(0)
		setMaxPrice(2000)
		setCheckedIngredients([])
	}

	useEffect(() => {
		setIngredientsToStore(ingredients)
	}, [])

	return (
		<div className={styles.filters}>
			<Title
				size="h3"
				order={3}
			>
				Фильтрация
			</Title>
			<PriceFilter
				minPrice={minPrice}
				maxPrice={maxPrice}
				setMaxPrice={setMaxPrice}
				setMinPrice={setMinPrice}
			/>
			<IngredientsFilter
				setIngredients={setCheckedIngredients}
				checkedIngredients={checkedIngredients}
			/>
			<Button
				className={styles.button}
				disabled={isEqualFilterStores}
				onClick={applyHandler}
			>
				Применить
			</Button>

			<Button
				color="red"
				className={styles.button}
				disabled={isInitialState && isEqualFilterStores}
				onClick={resetHandler}
			>
				Сбросить фильтры
			</Button>
		</div>
	)
}

export default Filters
