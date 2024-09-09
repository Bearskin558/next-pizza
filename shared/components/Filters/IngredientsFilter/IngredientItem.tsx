import { Checkbox } from "@mantine/core"
import { motion, useIsPresent } from "framer-motion"
import { memo } from "react"

interface Props {
	name: string
	id: string
}

const IngredientItem = memo(function IngredientItem({ name, id }: Props) {
	const isPresent = useIsPresent()
	return (
		<motion.div
			layout
			style={{ position: isPresent ? "static" : "absolute" }}
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0, opacity: 0 }}
		>
			<Checkbox
				color="accent"
				label={name}
				radius="md"
				value={name}
			/>
		</motion.div>
	)
})
export default IngredientItem
