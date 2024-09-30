"use client"

import { createOrder } from "@/app/api/fetch/order"
import { useCartStore } from "@/shared/store/cartStore"
import { isEmail, isNotEmpty, useForm } from "@mantine/form"
import { Order } from "@prisma/client"
import { useState } from "react"
import CartContactBlock from "../CartContactBlock/CartContactBlock"
import CartItem from "../CartItem/CartItem"
import CartTotalBlock from "../CartTotalBlock/CartTotalBlock"
import EmptyCart from "../EmtyCart/EmptyCart"
import styles from "./CartPage.module.scss"

export type ContactsForm = Pick<Order, "email" | "address" | "userName" | "userSurname" | "phoneNumber">

const CartPage = () => {
	const cartItems = useCartStore(state => state.cartItems)
	const [isLoadingTotalBlockButton, setIsLoadingTotalBlockButton] = useState(false)
	const contactsForm = useForm<ContactsForm>({
		mode: "controlled",
		initialValues: {
			userName: "",
			userSurname: "",
			email: "",
			phoneNumber: "",
			address: "",
		},
		validate: {
			userName: isNotEmpty("Введите имя"),
			email: isEmail("Введите корректный email"),
			address: isNotEmpty("Введите адрес"),
			phoneNumber: isNotEmpty("Введите номер телефона"),
		},
	})

	const toOrderHandler = async () => {
		if (contactsForm.validate().hasErrors) return
		setIsLoadingTotalBlockButton(true)
		try {
			const response = await createOrder({
				address: contactsForm.values.address,
				userName: contactsForm.values.userName,
				userSurname: contactsForm.values.userSurname,
				phoneNumber: contactsForm.values.phoneNumber,
				email: contactsForm.values.email,
			})
			console.log(response.data)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoadingTotalBlockButton(false)
		}
	}

	if (cartItems.length === 0) return <EmptyCart />
	return (
		<div className={styles.cartContainer}>
			<div className={styles.cartWrapper}>
				<div className={styles.cartItemsContainer}>
					{cartItems.map(item => (
						<CartItem
							cartItem={item}
							key={item.id}
						/>
					))}
				</div>
				<CartContactBlock form={contactsForm} />
				<CartTotalBlock
					onClickToOrderHandler={toOrderHandler}
					isLoadingButton={isLoadingTotalBlockButton}
				/>
			</div>
		</div>
	)
}

export default CartPage
