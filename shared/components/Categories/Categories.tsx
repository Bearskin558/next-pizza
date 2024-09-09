"use client"

import { useFilterStore } from "@/shared/store/filters"
import { Category } from "@/types/pizzas"
import { SegmentedControl } from "@mantine/core"
import styles from "./Categories.module.css"

interface CategoryData {
	label: string
	value: Category
}

const data: CategoryData[] = [
	{ label: "Все", value: "ALL" },
	{ label: "Мясные", value: "MEAT" },
	{ label: "Острые", value: "SPICY" },
	{ label: "Сладкие", value: "SWEET" },
	{ label: "Вегетарианские", value: "VEGAN" },
	{ label: "С курицей", value: "CHICKEN" },
]

const Categories = () => {
	const setActiveCategory = useFilterStore(state => state.setCategory)
	const currentCategory = useFilterStore(state => state.category)
	const onChangeCategoryHandler = (category: Category) => {
		setActiveCategory(category)
	}

	return (
		<div className={styles.wrapper}>
			<SegmentedControl
				data={data}
				radius="md"
				withItemsBorders={false}
				className={styles.categories}
				fullWidth={true}
				onChange={category => onChangeCategoryHandler(category as Category)}
				value={currentCategory}
			/>
		</div>
	)
}

export default Categories
