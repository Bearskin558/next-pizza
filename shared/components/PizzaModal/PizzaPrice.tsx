import MotionNumber from "motion-number"

interface Props {
	price: number
}

const PizzaPrice = ({ price }: Props) => {
	return (
		<MotionNumber
			value={price}
			format={{ notation: "standard", currency: "RUB", style: "currency", maximumFractionDigits: 0 }}
		></MotionNumber>
	)
}

export default PizzaPrice
