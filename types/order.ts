import { GET } from "@/app/api/orders/route"

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

export interface ResponseOrder {
	id: string
	address: string
	createdAt: Date
	number: number
	totalPrice: number
	orderItems: ResponseOrdersItem[]
}

export interface ResponseOrdersItem {
	id: string
	count: number
	price: number
	pizza: {
		id: string
		imageUrl: string
		name: string
	}
	toppings: {
		id: string
		name: string
	}[]
}
