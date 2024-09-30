import { prisma } from "@/prisma/prisma-client"
import { isOrderPostRequestData } from "@/utils/isOrderPostRequestData"
import { NextRequest, NextResponse } from "next/server"

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
	})

	if (!user) return NextResponse.json("Пользователь не авторизован", { status: 401 })

	const requestData = await req.json()

	if (!isOrderPostRequestData(requestData)) return NextResponse.json("Bad request", { status: 400 })

	try {
		const { orderItems, totalPrice, address, userName, userSurname, phoneNumber } = requestData

		const order = await prisma.order.create({
			data: {
				userId: user.id,
				totalPrice,
				address,
				userName,
				userSurname,
				phoneNumber,
			},
		})

		const createdOrderItems = await Promise.all(
			orderItems.map(item => {
				return prisma.orderItem.create({
					data: {
						pizzaId: item.pizzaId,
						pizzaSizeId: item.pizzaSizeId,
						count: item.count,
						orderId: order.id,
						toppings: {
							connect: item.toppings.map(topping => ({ id: topping })),
						},
					},
				})
			}),
		)
		return NextResponse.json("Заказ успешно оформлен", { status: 200 })
	} catch (error) {
		NextResponse.json(error, { status: 500 })
	}
}
