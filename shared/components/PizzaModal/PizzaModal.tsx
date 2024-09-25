"use client"

import { postCartItem } from "@/app/api/fetch/cartItem"
import { useCartStore } from "@/shared/store/cartStore"
import { useIngredientsStore } from "@/shared/store/ingredients"
import Modal from "@/shared/ui/Modal/Modal"
import { CartItemRequestPostData } from "@/types/cart"
import { DoughValue, Ingredient, Pizza, PizzaSizeName } from "@/types/pizzas"
import { CloseButton, Text, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import DoughControl from "../DoughControl/DoughControl"
import IngredientsContainer from "../IngredientsContainer/IngredientsContainer"
import PizzaAddButton from "../PizzaAddButton/PizzaAddButton"
import PizzaSizeControl from "../PizzaSizeControl/PizzaSizeControl"
import styles from "./PizzaModal.module.scss"

interface Props {
	pizza: Pizza
}

const PizzaModal = ({ pizza }: Props) => {
	const router = useRouter()
	const [cartId, setCartItems] = useCartStore(state => [state.cartId, state.setCartItems])
	const [isLoadingAddButton, setIsLoadingAddButton] = useState(false)
	const [isOpen, { close }] = useDisclosure(true)
	const ingredients = useIngredientsStore(state => state.ingredients)
	const [checkedIngredients, setCheckedIngredients] = useState<Ingredient[]>([])
	const [currentDoughType, setCurrentDoughType] = useState<DoughValue>("TRADITIONAL")
	const [currentPizzaSize, setCurrentPizzaSize] = useState<PizzaSizeName>("SMALL")
	const currentPrice =
		pizza.sizes.find(size => size.size === currentPizzaSize)?.price! +
		checkedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
	const onCloseModal = () => {
		router.back()
		close()
	}

	const addHandler = async () => {
		setIsLoadingAddButton(true)
		const pizzaSizeId = pizza.sizes.find(size => size.size === currentPizzaSize)?.id
		const toppings = checkedIngredients.map(item => item.id)
		if (!pizzaSizeId) {
			console.log(pizza.sizes)
			setIsLoadingAddButton(false)
			return console.warn("Не найден нужный размер пиццы")
		}
		const cartItem: CartItemRequestPostData = {
			cartId,
			count: 1,
			pizzaId: pizza.id,
			pizzaDoughType: currentDoughType,
			pizzaSizeId,
			toppings,
		}
		const response = await postCartItem(cartItem)
		if (response.status === 201) {
			setCartItems(response.data)
			close()
		}
		setIsLoadingAddButton(false)
	}

	return (
		<Modal
			onClose={onCloseModal}
			isOpen={isOpen}
		>
			<div className={styles.container}>
				<div className={styles.imageBlock}>
					<Image
						src={pizza.imageUrl}
						alt={`Изображение ${pizza.name}`}
						loading="lazy"
						width={300}
						height={300}
					/>
				</div>
				<div className={styles.propertyBlock}>
					<Title order={3}>{pizza.name}</Title>
					<Text
						size="sm"
						opacity={0.9}
					>
						{pizza.description}
					</Text>
					<div className={styles.optionsBlock}>
						<DoughControl
							value={currentDoughType}
							onChange={setCurrentDoughType}
						/>
						<PizzaSizeControl
							value={currentPizzaSize}
							onChange={setCurrentPizzaSize}
						/>
					</div>
					<div>
						<Text className={styles.ingredientsTitle}>Добавить по вкусу</Text>
						<IngredientsContainer
							ingredients={ingredients}
							setCheckedIngredients={setCheckedIngredients}
							checkedIngredients={checkedIngredients}
						/>
					</div>
					<PizzaAddButton
						price={currentPrice}
						onClick={addHandler}
						isLoading={isLoadingAddButton}
					/>
				</div>
				<CloseButton
					onClick={onCloseModal}
					className={styles.closeButton}
					size={40}
				/>
			</div>
		</Modal>
	)
}

export default PizzaModal
