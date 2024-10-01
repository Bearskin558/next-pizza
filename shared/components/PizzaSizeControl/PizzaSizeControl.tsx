import { PizzaSizeName } from "@/types/pizzas"
import isPizzaSize from "@/utils/isPizzaSize"
import { SegmentedControl } from "@mantine/core"

interface Props {
	value: PizzaSizeName
	onChange: (value: PizzaSizeName) => void
}

interface SizeData {
	label: string
	value: PizzaSizeName
}

const sizeData: SizeData[] = [
	{ label: "25 см", value: "SMALL" },
	{ label: "30 см", value: "MEDIUM" },
	{ label: "35 см", value: "LARGE" },
]

const PizzaSizeControl = ({ value, onChange }: Props) => {
	const onChangeHandler = (value: string) => {
		if (isPizzaSize(value)) onChange(value)
	}
	return (
		<SegmentedControl
			data={sizeData}
			radius="md"
			withItemsBorders={false}
			onChange={value => onChangeHandler(value)}
			value={value}
		/>
	)
}

export default PizzaSizeControl
