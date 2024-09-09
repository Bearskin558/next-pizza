import { Skeleton } from "@mantine/core"
import { motion } from "framer-motion"
import styles from "./IngredientSkeleton.module.css"

const IngredientSkeleton = () => {
	return (
		<div className={styles.wrapper}>
			<Skeleton
				height={20}
				width={20}
				radius={8}
			/>
			<Skeleton
				height={20}
				width={200}
			/>
		</div>
	)
}

export default IngredientSkeleton
