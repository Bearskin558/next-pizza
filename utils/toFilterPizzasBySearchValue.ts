import { Pizza } from "@/types/pizzas"
import { debounce } from "lodash"

export const toFilterPizzasBySearchValue = debounce((pizzas: Pizza[], searchValue: string) => {
	if (searchValue.length === 0) return []
	return pizzas.filter(pizza => pizza.name.toLocaleLowerCase().includes(searchValue))
}, 300)
