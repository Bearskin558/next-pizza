import { getAllIngredients } from "@/app/api/fetch/getAllIngredients"
import { getAllPizzas, getPizzaById } from "@/app/api/fetch/pizza"
import PizzaPage from "@/shared/components/PizzaPage/PizzaPage"
import { Button, Text } from "@mantine/core"
import { LinkBackwardIcon } from "hugeicons-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"
import { Colors } from "@/constants/colors"

// export async function generateStaticParams() {
// 	const response = await getAllPizzas()
// 	return response.data.map(item => ({
// 		params: {
// 			id: item.id,
// 		},
// 	}))
// }

const CurrentPizzaPage = async ({ params: { id } }: { params: { id: string } }) => {
	const pizza = (await getPizzaById(id)).data
	const ingredients = (await getAllIngredients()).data
	if (pizza) {
		return (
			<main>
				<div className="container">
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
					<PizzaPage
						pizza={pizza}
						ingredients={ingredients}
					/>
				</div>
			</main>
		)
	} else {
		redirect("/")
	}
}

export default CurrentPizzaPage
