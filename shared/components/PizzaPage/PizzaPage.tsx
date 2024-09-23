"use client"

import { DoughValue, Ingredient, Pizza, PizzaSizeName } from "@/types/pizzas"
import { Text, Title } from "@mantine/core"
import Image from "next/image"
import { useState } from "react"
import DoughControl from "../DoughControl/DoughControl"
import IngredientsContainer from "../IngredientsContainer/IngredientsContainer"
import PizzaAddButton from "../PizzaAddButton/PizzaAddButton"
import PizzaSizeControl from "../PizzaSizeControl/PizzaSizeControl"
import styles from "./PizzaPage.module.scss"

interface Props {
	pizza: Pizza
	ingredients: Ingredient[]
}

const PizzaPage = ({ pizza, ingredients }: Props) => {
	const [checkedIngredients, setCheckedIngredients] = useState<Ingredient[]>([])
	const [currentDoughType, setCurrentDoughType] = useState<DoughValue>("traditional")
	const [currentPizzaSize, setCurrentPizzaSize] = useState<PizzaSizeName>("SMALL")
	const currentPrice =
		pizza.sizes.find(size => size.size === currentPizzaSize)?.price! +
		checkedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
	return (
		<div className={styles.container}>
			<div className={styles.imageBlock}>
				<Image
					src={pizza.imageUrl}
					alt={`Изображение ${pizza.name}`}
					loading="lazy"
					width={300}
					height={300}
				/>
			</div>
			<div className={styles.propertyBlock}>
				<Title order={3}>{pizza.name}</Title>
				<Text
					size="sm"
					opacity={0.9}
				>
					{pizza.description}
				</Text>
				<div className={styles.optionsBlock}>
					<DoughControl
						value={currentDoughType}
						onChange={setCurrentDoughType}
					/>
					<PizzaSizeControl
						value={currentPizzaSize}
						onChange={setCurrentPizzaSize}
					/>
				</div>
				<div>
					<Text className={styles.ingredientsTitle}>Добавить по вкусу</Text>
					<IngredientsContainer
						ingredients={ingredients}
						setCheckedIngredients={setCheckedIngredients}
						checkedIngredients={checkedIngredients}
					/>
				</div>
				<PizzaAddButton price={currentPrice} />
			</div>
		</div>
	)
}

export default PizzaPage
