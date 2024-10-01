import Categories from "@/shared/components/Categories"
import Filters from "@/shared/components/Filters"
import PizzasContainer from "@/shared/components/PizzasContainer/PizzasContainer"
import { Title } from "@mantine/core"
import { getAllIngredients } from "../api/fetch/getAllIngredients"
import { getAllPizzas } from "../api/fetch/pizza"
import styles from "./page.module.css"

export const revalidate = 3600

export default async function Home() {
	const { data: ingredients } = await getAllIngredients()
	const { data: pizzas } = await getAllPizzas()

	try {
		return (
			<main className={styles.main}>
				<div className="container">
					<Title
						size="h1"
						className={styles.title}
					>
						Пиццы
					</Title>
					<div>
						<Categories />
					</div>
					<div className={styles.content}>
						<Filters ingredients={ingredients} />
						<PizzasContainer pizzas={pizzas} />
					</div>
				</div>
			</main>
		)
	} catch (error) {
		console.log(error)
	}
}
