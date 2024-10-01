import { Pizza } from "@/types/pizzas"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import styles from "./SearchPizzaCard.module.scss"

interface Props {
	pizza: Pizza
	onClickHandler: () => void
}

const SearchPizzaCard = ({ pizza, onClickHandler }: Props) => {
	return (
		<motion.div
			layout
			initial={{ top: "-100px", opacity: 0 }}
			animate={{ top: "0px", opacity: 1 }}
			exit={{ opacity: 0, scale: 0 }}
			transition={{ duration: 0.4 }}
		>
			<Link
				href={`/pizzas/${pizza.id}`}
				onClick={onClickHandler}
				scroll={false}
			>
				<div className={styles.container}>
					<Image
						src={`${pizza.imageUrl}`}
						alt={`img ${pizza.name}`}
						width={50}
						height={50}
					/>
					<p>{pizza.name}</p>
				</div>
			</Link>
		</motion.div>
	)
}

export default SearchPizzaCard
