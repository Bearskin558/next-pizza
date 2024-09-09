import ingredients from "./ingredients"
import pizzas, { PizzaSizeSeed } from "./pizzas"
import prisma from "./prisma-client"

const up = async () => {
	await prisma.ingredient.createMany({
		data: ingredients,
	})
	const createdIngredients = await prisma.ingredient.findMany()

	const pizzasData = pizzas.map(pizza => {
		const ingredientsData = pizza.ingredients.map(ingredient => {
			const id = createdIngredients.find(item => item.name === ingredient)?.id
			return { id }
		})
		return { ...pizza, ingredients: ingredientsData }
	})

	await Promise.all(
		pizzasData.map(async pizza => {
			await prisma.pizza.create({
				data: {
					description: pizza.description,
					name: pizza.name,
					imageUrl: pizza.imageUrl,
					ingredients: { connect: pizza.ingredients },
					categories: pizza.categories,
				},
			})
		}),
	)
	const createdPizzas = await prisma.pizza.findMany()

	type SizeData = PizzaSizeSeed & { pizzaId: string }

	const pizzaSizeData = pizzas.reduce<SizeData[]>((accum, pizza) => {
		const pizzaId = createdPizzas.find(item => item.name === pizza.name)?.id!
		const sizes = pizza.sizes.map(size => ({ ...size, pizzaId }))
		return [...accum, ...sizes]
	}, [])

	await prisma.pizzaSize.createMany({
		data: pizzaSizeData,
	})
}
const down = async () => {
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Pizza" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "PizzaSize" RESTART IDENTITY CASCADE`
}
const seed = async () => {
	try {
		await down()
		await up()
	} catch (error) {
		console.log(error)
	}
}
seed()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
