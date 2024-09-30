"use client"

import { deleteCartItem, patchCartItem } from "@/app/api/fetch/cartItem"
import { useCartStore } from "@/shared/store/cartStore"
import { CartItemResponse } from "@/types/cart"
import { ActionIcon } from "@mantine/core"
import { MinusSignIcon, MultiplicationSignIcon, PlusSignIcon } from "hugeicons-react"
import Image from "next/image"
import CartItemButton from "../CartItemButton/CartItemButton"
import styles from "./CartItem.module.scss"

interface Props {
	cartItem: CartItemResponse
}

const pizzaSizes = {
	SMALL: 25,
	MEDIUM: 30,
	LARGE: 35,
}

const doughs = {
	TRADITIONAL: "традиционное",
	THIN: "тонкое",
}

const CartItem = ({ cartItem }: Props) => {
	const setCartItems = useCartStore(state => state.setCartItems)
	const pizzaSize = cartItem.pizza.sizes.find(size => size.id === cartItem.pizzaSizeId)
	if (!pizzaSize) return <p>Непредвиденная ошибка</p>
	const price = (pizzaSize.price + cartItem.toppings.reduce((sum, item) => sum + item.price, 0)) * cartItem.count
	const toppings = cartItem.toppings.map(item => item.name).join(", ")

	const onChangeCountHandler = async (action: "plus" | "minus") => {
		const count = action === "plus" ? cartItem.count + 1 : cartItem.count - 1
		try {
			const response = await patchCartItem({ id: cartItem.id, count })
			if (response.status === 200) {
				setCartItems(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const onDeleteHandler = async () => {
		try {
			const response = await deleteCartItem(cartItem.id)
			if (response.status === 200) {
				setCartItems(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.descriptionBlock}>
				<Image
					src={cartItem.pizza.imageUrl}
					alt={cartItem.pizza.name}
					width={100}
					height={100}
					className={styles.image}
				/>
				<div className={styles.textBlock}>
					<p>{cartItem.pizza.name}</p>
					<p>
						{pizzaSizes[pizzaSize.size]} см, {doughs[cartItem.pizzaDoughType]} тесто
					</p>
					{cartItem.toppings.length > 0 && <p className={styles.toppings}>Дополнительные ингредиенты: {toppings}</p>}
				</div>
			</div>
			<div className={styles.buttonBlock}>
				<div className={styles.price}>
					<p>{price} ₽</p>
				</div>
				<div className={styles.countBlock}>
					<CartItemButton
						Icon={MinusSignIcon}
						onClick={() => onChangeCountHandler("minus")}
						disabled={cartItem.count === 1}
					/>
					<p className={styles.count}>{cartItem.count}</p>
					<CartItemButton
						Icon={PlusSignIcon}
						onClick={() => onChangeCountHandler("plus")}
					/>
				</div>
			</div>

			<CartItemButton
				Icon={MultiplicationSignIcon}
				onClick={onDeleteHandler}
				variant="transparent"
				className={styles.deleteButton}
			/>
		</div>
	)
}

export default CartItem
