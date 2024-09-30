import { prisma } from "@/prisma/prisma-client"
import { isOrderPostRequestData } from "@/utils/isOrderPostRequestData"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const token = req.cookies.get("authjs.session-token")
	if (!token) return NextResponse.json("Пользователь не авторизован", { status: 401 })
	const user = await prisma.user.findFirst({
		where: {
			sessions: {
				some: {
					sessionToken: token.value,
				},
			},
		},
		select: {
			orders: {
				select: {
					id: true,
					address: true,
					orderItems: {
						select: {
							count: true,
							id: true,
							pizza: {
								select: {
									id: true,
									imageUrl: true,
								},
							},
							toppings: {
								select: {
									id: true,
									name: true,
								},
							},
						},
					},
				},
			},
		},
	})
	if (!user) return NextResponse.json("Пользователь не авторизован", { status: 401 })
	return NextResponse.json(user.orders, { status: 200 })
}

export async function POST(req: NextRequest) {
	const token = req.cookies.get("authjs.session-token")
	if (!token) return NextResponse.json("Пользователь не авторизован", { status: 401 })

	const user = await prisma.user.findFirst({
		where: {
			sessions: {
				some: {
					sessionToken: token.value,
				},
			},
		},
		select: {
			id: true,
			cart: {
				select: {
					id: true,
				},
			},
		},
	})

	if (!user) return NextResponse.json("Пользователь не авторизован", { status: 401 })

	const requestData = await req.json()
	console.warn(requestData)

	if (!isOrderPostRequestData(requestData)) return NextResponse.json("Bad request", { status: 400 })

	try {
		const cartItems = await prisma.cartItem.findMany({
			where: {
				cartId: user.cart?.id,
			},
			select: {
				pizzaId: true,
				pizzaSize: {
					select: {
						id: true,
						price: true,
					},
				},
				count: true,
				toppings: {
					select: {
						id: true,
						price: true,
					},
				},
			},
		})

		const { address, userName, userSurname, phoneNumber, email } = requestData

		const totalPrice = cartItems.reduce((sum, item) => {
			return sum + (item.pizzaSize.price + item.toppings.reduce((sum, topping) => sum + topping.price, 0)) * item.count
		}, 0)

		const order = await prisma.order.create({
			data: {
				userId: user.id,
				totalPrice,
				address,
				userName,
				userSurname,
				phoneNumber,
				email,
			},
		})

		const createdOrderItems = await Promise.all(
			cartItems.map(item => {
				return prisma.orderItem.create({
					data: {
						pizzaId: item.pizzaId,
						pizzaSizeId: item.pizzaSize.id,
						count: item.count,
						orderId: order.id,
						toppings: {
							connect: item.toppings.map(topping => ({ id: topping.id })),
						},
					},
				})
			}),
		)

		const deletedCartItems = await prisma.cartItem.deleteMany({
			where: {
				cartId: user.cart?.id,
			},
		})
		return NextResponse.json({ message: "Заказ успешно оформлен" }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json(error, { status: 500 })
	}
}
