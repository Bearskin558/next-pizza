import { ActionIcon } from "@mantine/core"
import clsx from "clsx"
import { HugeiconsProps } from "hugeicons-react"
import { FC } from "react"
import { Colors } from "@/constants/colors"
import styles from "./HeaderButton.module.scss"

interface Props {
	Icon: FC<HugeiconsProps>
	onClick?: () => void
	className?: string
}

const HeaderButton = ({ Icon, onClick, className }: Props) => {
	const classNames = clsx(className, styles.headerButton)
	return (
		<ActionIcon
			variant="outline"
			color={Colors.ACCENT}
			className={classNames}
			onClick={onClick}
			children={
				<Icon
					color={Colors.ACCENT}
					size={20}
				/>
			}
		/>
	)
}

export default HeaderButton
