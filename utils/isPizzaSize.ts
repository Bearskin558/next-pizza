import { PizzaSizeName } from "@/types/pizzas"

const isPizzaSize = (value: string): value is PizzaSizeName => {
	return value === "SMALL" || value === "MEDIUM" || value === "LARGE"
}

export default isPizzaSize
