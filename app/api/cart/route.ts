import { prisma } from "@/prisma/prisma-client"
import isCartItemRequestData from "@/utils/isCartItemRequestData"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const cookieStore = cookies()
	const token = cookieStore.get("authjs.session-token")
	if (!token) return NextResponse.json("Пользователь не авторизован", { status: 401 })
	try {
		const cart = (
			await prisma.session.findFirst({
				where: {
					sessionToken: token.value,
				},
				select: {
					user: {
						select: {
							cart: true,
						},
					},
				},
			})
		)?.user.cart
		if (!cart) NextResponse.json("Корзина не найдена", { status: 404 })
		return NextResponse.json(cart, { status: 200 })
	} catch (error) {
		NextResponse.json(error, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	const cookieStore = cookies()
	const token = cookieStore.get("authjs.session-token")
	if (!token) return NextResponse.json("Пользователь не авторизован", { status: 401 })
	try {
		const userId = (
			await prisma.session.findFirst({
				where: {
					sessionToken: token.value,
				},
				select: {
					user: {
						select: {
							id: true,
						},
					},
				},
			})
		)?.user.id
		if (!userId) return NextResponse.json("Пользователь не найден", { status: 404 })
		const cart = await prisma.cart.create({
			data: {
				userId,
			},
		})
		return NextResponse.json(cart, { status: 201 })
	} catch (error) {
		console.log(error)
		return NextResponse.json(error, { status: 500 })
	}
}

export async function PATCH(req: NextRequest) {
	const cookieStore = cookies()
	const token = cookieStore.get("authjs.session-token")
	if (!token) return NextResponse.json("Пользователь не авторизован", { status: 401 })

	const requestData = await req.json()
	if (!isCartItemRequestData(requestData)) return NextResponse.json("Bad request", { status: 400 })

	try {
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
				cart: true,
			},
		})

		if (!user) return NextResponse.json("Пользователь не авторизован", { status: 401 })

		if (!user.cart) return NextResponse.json("Корзина не найдена", { status: 404 })

		const cartItems = await Promise.all(
			requestData.map(item => {
				return prisma.cartItem.create({
					data: {
						cartId: user.cart?.id!,
						pizzaId: item.pizzaId,
						pizzaSizeId: item.pizzaSizeId,
						toppings: {
							connect: item.toppings?.map(topping => ({ id: topping })),
						},
					},
				})
			}),
		)

		return NextResponse.json(cartItems, { status: 201 })
	} catch (error) {
		console.log(error)
		return NextResponse.json(error, { status: 500 })
	}
}
