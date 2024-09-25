import { getPizzaById } from "@/app/api/fetch/pizza"
import PizzaModal from "@/shared/components/PizzaModal/PizzaModal"

export const revalidate = 10

const PizzaModalIntercepting = async ({ params }: { params: { id: string } }) => {
	const pizza = (await getPizzaById(params.id)).data
	if (pizza) return <PizzaModal pizza={pizza} />
}

export default PizzaModalIntercepting
