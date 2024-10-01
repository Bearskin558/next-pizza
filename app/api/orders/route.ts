import { prisma } from "@/prisma/prisma-client"
import { ResponseOrder } from "@/types/order"
import { isOrderPostRequestData } from "@/utils/isOrderPostRequestData"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const revalidate = 0

export async function GET(req: NextRequest) {
	const token = req.cookies.get("__Secure-authjs.session-token")
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
					createdAt: true,
					number: true,
					totalPrice: true,
					orderItems: {
						select: {
							count: true,
							id: true,
							price: true,
							pizza: {
								select: {
									id: true,
									name: true,
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
				orderBy: {
					createdAt: "desc",
				},
			},
		},
	})
	if (!user) return NextResponse.json("Пользователь не авторизован", { status: 401 })
	if (!user.orders) return NextResponse.json("Заказы не найдены", { status: 404 })
	return NextResponse.json<ResponseOrder[]>(user.orders, { status: 200 })
}

export async function POST(req: NextRequest) {
	const token = req.cookies.get("__Secure-authjs.session-token")
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
		if (cartItems.length === 0) return NextResponse.json("Корзина пуста", { status: 400 })
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
						price: (item.pizzaSize.price + item.toppings.reduce((sum, topping) => sum + topping.price, 0)) * item.count,
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
