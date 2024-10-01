"use client"

import { useIngredientsStore } from "@/shared/store/ingredients"
import { Button, Checkbox, Text } from "@mantine/core"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import IngredientSkeleton from "../IngredientSkeleton/IngredientSkeleton"
import IngredientItem from "./IngredientItem"
import styles from "./IngredientsFilter.module.css"

interface Props {
	setIngredients: (ingredients: string[]) => void
	checkedIngredients: string[]
}
const IngredientsFilter = ({ setIngredients, checkedIngredients }: Props) => {
	const ingredients = useIngredientsStore(state => state.ingredients)
	const checkHandler = (str: string[]) => {
		setIngredients(str)
	}
	const [minCountVisibleIngredients, setMinCountVisibleIngredients] = useState(4)
	const [countVisibleIngredients, setCountVisibleIngredients] = useState(minCountVisibleIngredients)
	const checkboxes = ingredients
		?.sort((a, b) => a.name.localeCompare(b.name))
		?.sort((a, b) => Number(checkedIngredients.includes(b.name)) - Number(checkedIngredients.includes(a.name)))
		?.slice(0, countVisibleIngredients)
		.map(ingredient => (
			<IngredientItem
				name={ingredient.name}
				id={ingredient.id}
				key={ingredient.id}
			/>
		))

	const onClickVisibleButton = () => {
		countVisibleIngredients === ingredients.length
			? setCountVisibleIngredients(() => (checkedIngredients.length > 4 ? checkedIngredients.length : 4))
			: setCountVisibleIngredients(ingredients.length)
	}

	useEffect(() => {
		if (checkedIngredients.length === 0) setCountVisibleIngredients(4)
	}, [checkedIngredients.length])

	return (
		<div className={styles.ingredients}>
			<Text
				fw={700}
				fz={16}
			>
				Ингредиенты:
			</Text>

			{ingredients.length !== 0 && (
				<Checkbox.Group
					onChange={e => checkHandler(e)}
					className={styles.group}
					value={checkedIngredients}
				>
					<AnimatePresence>{checkboxes}</AnimatePresence>
				</Checkbox.Group>
			)}
			{ingredients.length === 0 && (
				<div className={styles.skeleton}>
					{new Array(4).fill("1").map((_, i) => (
						<IngredientSkeleton key={`skeleton item ${i}`} />
					))}
				</div>
			)}
			<Button
				variant="white"
				fz={16}
				size="md"
				px={0}
				w={"fit-content"}
				h={22}
				py={0}
				bg={"none"}
				onClick={onClickVisibleButton}
			>
				{countVisibleIngredients === ingredients.length ? "- Скрыть" : "+ Показать все"}
			</Button>
		</div>
	)
}

export default IngredientsFilter
