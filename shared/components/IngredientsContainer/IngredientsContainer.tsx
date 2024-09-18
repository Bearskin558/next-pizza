import { Ingredient } from "@/types/pizzas"
import { SetStateAction } from "react"
import IngredientCard from "../IngredientCard/IngredientCard"
import styles from "./IngredientsContainer.module.scss"

interface Props {
	ingredients: Ingredient[]
	checkedIngredients: Ingredient[]
	setCheckedIngredients: (value: SetStateAction<Ingredient[]>) => void
}

const IngredientsContainer = ({ ingredients, checkedIngredients, setCheckedIngredients }: Props) => {
	const toggleCheckedIngredient = (id: string) => {
		if (checkedIngredients.findIndex(item => item.id === id) !== -1)
			return setCheckedIngredients(prev => prev.filter(item => item.id !== id))
		const ingredient = ingredients.find(item => item.id === id)
		if (ingredient) setCheckedIngredients(prev => [...prev, ingredient])
	}
	const ingredientsCards = [...ingredients]
		// .sort((a, b) => a.name.localeCompare(b.name))
		// .sort(
		// 	(a, b) =>
		// 		checkedIngredients.findIndex(item => item.name === b.name) -
		// 		checkedIngredients.findIndex(item => item.name === a.name),
		// )
		.map(item => (
			<IngredientCard
				key={item.id}
				{...item}
				onClickHandler={toggleCheckedIngredient}
				isChecked={checkedIngredients.findIndex(checkedIngredient => checkedIngredient.id === item.id) !== -1}
			/>
		))
	return <div className={styles.ingredients}>{ingredientsCards}</div>
}

export default IngredientsContainer
