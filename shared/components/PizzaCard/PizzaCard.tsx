import { Pizza } from "@/types/pizzas"
import { Box, Button, Skeleton, Text } from "@mantine/core"
import { Add01Icon } from "hugeicons-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Colors } from "@/constants/colors"
import PizzaCardImage from "../PizzaCardImage/PizzaCardImage"
import styles from "./PizzaCard.module.scss"

interface Props {
	pizza: Pizza
}

const PizzasCard = ({ pizza }: Props) => {
	const [isLoadingBtn, setisLoadingBtn] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		if (pathname.includes(pizza.id)) setisLoadingBtn(false)
	}, [pathname])

	return (
		<Link
			href={`/pizzas/${pizza.id}`}
			scroll={false}
			onClick={() => setisLoadingBtn(true)}
		>
			<div className={styles.card}>
				<PizzaCardImage
					src={pizza.imageUrl}
					alt={pizza.name}
				/>
				<Text className={styles.cardName}>{pizza.name}</Text>
				<Text
					className={styles.cardDescription}
					c="secondaryText"
				>
					{pizza.description}
				</Text>
				<Box className={styles.priceBlock}>
					<Text fw={600}>
						от <span>{pizza.sizes[0].price}</span> ₽
					</Text>

					<Button
						className={styles.addBtn}
						variant="outline"
						leftSection={
							<Add01Icon
								size={15}
								color={Colors.ACCENT}
							/>
						}
						loading={isLoadingBtn}
						onClick={() => setisLoadingBtn(true)}
					>
						Добавить
					</Button>
				</Box>
			</div>
		</Link>
	)
}

export default PizzasCard
