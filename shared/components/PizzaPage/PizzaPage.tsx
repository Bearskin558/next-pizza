"use client"

import { Pizza, PizzaSizeName } from "@/types/pizzas"
import { Ingredient } from "@/types/pizzas"
import { Button, SegmentedControl, Text, Title } from "@mantine/core"
import { AnimatePresence } from "framer-motion"
import { LinkBackwardIcon } from "hugeicons-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Colors } from "@/constants/colors"
import IngredientCard from "../IngredientCard/IngredientCard"
import PizzaPrice from "../PizzaModal/PizzaPrice"
import styles from "./PizzaPage.module.scss"

interface Props {
	pizza: Pizza
	ingredients: Ingredient[]
}

const doughData = [
	{
		label: "традиционное",
		value: "traditional",
	},
	{
		label: "тонкое",
		value: "thin",
	},
]

interface SizeData {
	label: string
	value: PizzaSizeName
}

const sizeData: SizeData[] = [
	{ label: "25 см", value: "SMALL" },
	{ label: "30 см", value: "MEDIUM" },
	{ label: "35 см", value: "LARGE" },
]

const PizzaPage = ({ pizza, ingredients }: Props) => {
	const [checkedIngredients, setCheckedIngredients] = useState<Ingredient[]>([])
	const [currentSize, setCurrentSize] = useState<PizzaSizeName>("SMALL")
	const currentPrice =
		pizza.sizes.find(size => size.size === currentSize)?.price! +
		checkedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
	const toggleCheckedIngredient = (id: string) => {
		if (checkedIngredients.findIndex(item => item.id === id) !== -1)
			return setCheckedIngredients(prev => prev.filter(item => item.id !== id))
		const ingredient = ingredients.find(item => item.id === id)
		if (ingredient) setCheckedIngredients(prev => [...prev, ingredient])
	}
	const ingredientsCards = [...ingredients]
		.sort((a, b) => a.name.localeCompare(b.name))
		.sort(
			(a, b) =>
				checkedIngredients.findIndex(item => item.name === b.name) -
				checkedIngredients.findIndex(item => item.name === a.name),
		)
		.map(item => (
			<IngredientCard
				key={item.id}
				{...item}
				onClickHandler={toggleCheckedIngredient}
				isChecked={checkedIngredients.findIndex(checkedIngredient => checkedIngredient.id === item.id) !== -1}
			/>
		))

	return (
		<div className="container">
			<div className={styles.wrapper}>
				<Link href="/">
					<Button
						variant="outline"
						size="md"
						leftSection={
							<LinkBackwardIcon
								color={Colors.ACCENT}
								size={30}
							/>
						}
					>
						<Text size="md">Все пиццы</Text>
					</Button>
				</Link>
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
							<SegmentedControl
								data={doughData}
								radius="md"
								withItemsBorders={false}
							/>
							<SegmentedControl
								data={sizeData}
								radius="md"
								withItemsBorders={false}
								onChange={size => setCurrentSize(size as PizzaSizeName)}
							/>
						</div>
						<div>
							<Text className={styles.ingredientsTitle}>Добавить по вкусу</Text>

							<div className={styles.ingredientsBlock}>
								<AnimatePresence>{ingredientsCards}</AnimatePresence>
							</div>
						</div>

						<Button
							className={styles.addBtn}
							rightSection={<PizzaPrice price={currentPrice} />}
						>
							Добавить в корзину
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PizzaPage
