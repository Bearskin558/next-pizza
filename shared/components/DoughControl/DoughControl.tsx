import { DoughValue } from "@/types/pizzas"
import { SegmentedControl } from "@mantine/core"

interface DoughData {
	label: string
	value: DoughValue
}

interface Props {
	value: DoughValue
	onChange: (value: DoughValue) => void
}

const doughData: DoughData[] = [
	{
		label: "традиционное",
		value: "TRADITIONAL",
	},
	{
		label: "тонкое",
		value: "THIN",
	},
]

const DoughControl = ({ value, onChange }: Props) => {
	const onChangeHandler = (value: string) => {
		if (value === "THIN" || value === "TRADITIONAL") onChange(value)
	}
	return (
		<SegmentedControl
			data={doughData}
			radius="md"
			withItemsBorders={false}
			onChange={value => onChangeHandler(value)}
			value={value}
		/>
	)
}

export default DoughControl
