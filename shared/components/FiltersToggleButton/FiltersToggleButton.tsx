import { Button } from "@mantine/core"
import clsx from "clsx"
import { ArrowDown01Icon } from "hugeicons-react"
import { Colors } from "@/constants/colors"
import styles from "./FiltersToggleButton.module.scss"

interface Props {
	onClick?: () => void
	isOpen: Boolean
}

const FiltersToggleButton = ({ onClick, isOpen }: Props) => {
	const classNameArrow = clsx(styles.icon, {
		[styles.open]: isOpen,
	})
	return (
		<Button
			className={styles.button}
			variant="transparent"
			onClick={onClick}
			rightSection={
				<ArrowDown01Icon
					color={Colors.ACCENT}
					className={classNameArrow}
				/>
			}
		>
			Фильтрация
		</Button>
	)
}

export default FiltersToggleButton
