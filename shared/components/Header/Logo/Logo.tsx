import { Colors } from "@/constants/colors"
import { Text } from "@mantine/core"
import { Pizza02Icon } from "hugeicons-react"
import Link from "next/link"
import styles from "./Logo.module.css"

const Logo = () => {
	return (
		<Link
			className={styles.logo}
			href="/"
		>
			<div>
				<Pizza02Icon
					color={Colors.ACCENT}
					size={35}
				/>
			</div>
			<div className={styles.textBlock}>
				<Text
					className={styles.title}
					size="lg"
				>
					NEXT PIZZA
				</Text>
				<Text
					className={styles.text}
					size="sm"
					c="secondaryText"
				>
					вкусней уже некуда
				</Text>
			</div>
		</Link>
	)
}

export default Logo
