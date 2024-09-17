import clsx from "clsx"
import { CheckmarkCircle02Icon } from "hugeicons-react"
import Image from "next/image"
import { Colors } from "@/constants/colors"
import styles from "./IngredientCard.module.scss"

interface Props {
	id: string
	name: string
	price: number
	imageUrl: string
	onClickHandler: (id: string) => void
	isChecked: boolean
}

const IngredientCard = ({ id, name, price, imageUrl, onClickHandler, isChecked }: Props) => {
	const cardClassName = clsx({
		[styles.card]: true,
		[styles.checked]: isChecked,
	})
	const checkedIconClassName = clsx(styles.checkIcon, { [styles.isChecked]: isChecked })
	return (
		<div
			className={cardClassName}
			onClick={() => onClickHandler(id)}
		>
			<Image
				src={imageUrl}
				alt={`Изображение ${name}`}
				width={90}
				height={90}
			/>
			<p className={styles.cardName}>{name}</p>
			<p>{price} ₽</p>
			<CheckmarkCircle02Icon
				color={Colors.ACCENT}
				className={checkedIconClassName}
			/>
		</div>
	)
}

export default IngredientCard
