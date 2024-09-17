import { DoughValue } from "@/types/pizzas"
import { SegmentedControl } from "@mantine/core"
import styles from "./DoughControl.module.scss"

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
		value: "traditional",
	},
	{
		label: "тонкое",
		value: "thin",
	},
]

const DoughControl = ({ value, onChange }: Props) => {
	const onChangeHandler = (value: string) => {
		if (value === "thin" || value === "traditional") onChange(value)
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
