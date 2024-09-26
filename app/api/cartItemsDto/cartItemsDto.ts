export const cartItemsDto = {
	id: true,
	createdAt: true,
	updatedAt: true,
	cartId: true,
	pizzaId: true,
	pizzaDoughType: true,
	pizzaSizeId: true,
	count: true,
	pizza: {
		select: {
			id: true,
			name: true,
			imageUrl: true,
			description: true,
			sizes: true,
		},
	},
	toppings: {
		select: {
			id: true,
			name: true,
			imageUrl: true,
			price: true,
		},
	},
}
