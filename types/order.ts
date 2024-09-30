export interface OrderPostRequestData {
	address: string
	userName: string
	userSurname: string
	phoneNumber: string
	email: string
}

export interface OrderPostItemRequestData {
	pizzaId: string
	pizzaSizeId: string
	count: number
	toppings: string[]
}
