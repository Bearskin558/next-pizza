export interface OrderPostRequestData {
	orderItems: OrderPostItemRequestData[]
	totalPrice: number
	address: string
	userName: string
	userSurname: string
	phoneNumber: string
}

export interface OrderPostItemRequestData {
	pizzaId: string
	pizzaSizeId: string
	count: number
	toppings: string[]
}
