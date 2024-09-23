import MotionNumber from "motion-number"
import styles from "./AddButtonPrice.module.scss"

interface Props {
	price: number
}

const AddButtonPrice = ({ price }: Props) => {
	return (
		<MotionNumber
			className={styles.price}
			value={price}
			format={{ notation: "standard", currency: "RUB", style: "currency", maximumFractionDigits: 0 }}
		/>
	)
}

export default AddButtonPrice
