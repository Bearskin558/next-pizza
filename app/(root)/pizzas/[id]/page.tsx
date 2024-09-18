import { getAllIngredients } from "@/app/api/fetch/getAllIngredients"
import { getPizzaById } from "@/app/api/fetch/pizza"
import PizzaPage from "@/shared/components/PizzaPage/PizzaPage"
import { Button, Text } from "@mantine/core"
import { LinkBackwardIcon } from "hugeicons-react"
import Link from "next/link"
import React from "react"
import { Colors } from "@/constants/colors"

const CurrentPizzaPage = async ({ params: { id } }: { params: { id: string } }) => {
	const pizza = (await getPizzaById(id)).data
	const ingredients = (await getAllIngredients()).data
	if (pizza)
		return (
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
		)
}

export default CurrentPizzaPage
