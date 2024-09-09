import { getAllPizzas } from "@/app/api/fetch/getAllPizzas"
import PizzaModal from "@/shared/components/PizzaModal/PizzaModal"

const PizzaModalIntercepting = async ({ params }: { params: { id: string } }) => {
	const pizzas = (await getAllPizzas()).data
	const currentPizza = pizzas.find(pizza => pizza.id === params.id)
	if (currentPizza) return <PizzaModal pizza={currentPizza} />
}

export default PizzaModalIntercepting
