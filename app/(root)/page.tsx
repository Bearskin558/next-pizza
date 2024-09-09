import Categories from "@/shared/components/Categories"
import Filters from "@/shared/components/Filters"
import PizzasContainer from "@/shared/components/PizzasContainer/PizzasContainer"
import { Ingredient, Pizza } from "@/types/pizzas"
import { Title } from "@mantine/core"
import { getAllIngredients } from "../api/fetch/getAllIngredients"
import { getAllPizzas } from "../api/fetch/getAllPizzas"
import styles from "./page.module.css"

export default async function Home() {
	// const { data: ingredients } = await getAllIngredients()
	// const { data: pizzas } = await getAllPizzas()

	try {
		const data = await fetch("http://localhost:3000/api/pizzas", { next: { revalidate: 10 } })
		const pizzas = await data.json()
		console.log(pizzas)
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
						{/* <Filters ingredients={ingredients} />
						<PizzasContainer pizzas={pizzas} /> */}
					</div>
				</div>
			</main>
		)
	} catch (error) {
		console.log(error)
	}
}
