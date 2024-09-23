import { Skeleton } from "@mantine/core"
import Image from "next/image"
import { useState } from "react"
import styles from "./PizzaCardImage.module.scss"

interface Props {
	src: string
	alt: string
}

const PizzaCardImage = ({ src, alt }: Props) => {
	const [isLoading, setIsLoading] = useState(false)

	const onLoadHandler = () => {
		setIsLoading(true)
	}

	return (
		<div className={styles.imgBlock}>
			<Skeleton
				className={styles.imgSkeleton}
				visible={!isLoading}
			/>
			<Image
				src={src}
				alt={alt}
				width={212}
				height={212}
				loading="lazy"
				onLoad={onLoadHandler}
			/>
		</div>
	)
}

export default PizzaCardImage
