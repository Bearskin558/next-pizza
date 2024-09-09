"use client"

import { useIngredientsStore } from "@/shared/store/ingredients"
import Modal from "@/shared/ui/Modal/Modal"
import { Ingredient, Pizza, PizzaSizeName } from "@/types/pizzas"
import { Button, SegmentedControl, Text, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import IngredientCard from "../IngredientCard/IngredientCard"
import styles from "./PizzaModal.module.scss"
import PizzaPrice from "./PizzaPrice"

interface Props {
	pizza: Pizza
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

const PizzaModal = ({ pizza }: Props) => {
	const router = useRouter()
	const [isOpen, { close }] = useDisclosure(true)
	const ingredients = useIngredientsStore(state => state.ingredients)
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
		<Modal
			onClose={() => router.back()}
			isOpen={isOpen}
		>
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
					<div>
						<Title order={3}>{pizza.name}</Title>
					</div>
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
						<AnimatePresence>
							<div className={styles.ingredientsBlock}>{ingredientsCards}</div>
						</AnimatePresence>
					</div>

					<Button
						className={styles.addBtn}
						rightSection={<PizzaPrice price={currentPrice} />}
					>
						Добавить в корзину
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default PizzaModal
