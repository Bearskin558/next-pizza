"use client"

import { useFilterStore } from "@/shared/store/filters"
import { useIngredientsStore } from "@/shared/store/ingredients"
import { Ingredient } from "@/types/pizzas"
import { toCompareFilterStores } from "@/utils/toComapreStores"
import { toCompareFilterStoreWithInitial } from "@/utils/toCompareFilterStoreWithInitial"
import { Button, Title } from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import clsx from "clsx"
import { useEffect, useState } from "react"
import FiltersToggleButton from "../FiltersToggleButton/FiltersToggleButton"
import IngredientsFilter from "../IngredientsFilter/IngredientsFilter"
import PriceFilter from "../PriceFilter/PriceFilter"
import styles from "./Filters.module.css"

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
	const [isOpenFilters, toggleIsOpen] = useToggle([false, true])
	const classNameFilters = clsx(styles.filters, {
		[styles.open]: isOpenFilters,
	})

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
		<div className={styles.container}>
			<FiltersToggleButton
				onClick={toggleIsOpen}
				isOpen={isOpenFilters}
			/>
			<Title
				size="h3"
				className={styles.title}
			>
				Фильтрация
			</Title>
			<div className={classNameFilters}>
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
				<div className={styles.buttonBlock}>
					<Button
						color="red"
						className={styles.button}
						disabled={isInitialState && isEqualFilterStores}
						onClick={resetHandler}
					>
						Сбросить фильтры
					</Button>
					<Button
						className={styles.button}
						disabled={isEqualFilterStores}
						onClick={applyHandler}
					>
						Применить
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Filters
