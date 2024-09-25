import { prisma } from "@/prisma/prisma-client"
import { isCartItemRequestPatchData, isCartItemRequestPostData } from "@/utils/isCartItemRequestData"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const token = req.cookies.get("authjs.session-token")
	if (!token) return NextResponse.json("Пользователь не авторизован", { status: 401 })

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
				cart: {
					select: {
						id: true,
					},
				},
			},
		})
		if (!user) return NextResponse.json("Пользователь не авторизован", { status: 401 })

		const cartItems = await prisma.cartItem.findMany()
		return NextResponse.json(cartItems, { status: 200 })
	} catch (error) {
		NextResponse.json(error, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	const token = req.cookies.get("authjs.session-token")
	if (!token) return NextResponse.json("Пользователь не авторизован", { status: 401 })
	const requestData = await req.json()
	if (!isCartItemRequestPostData(requestData)) return NextResponse.json("Bad request", { status: 400 })

	try {
		const cartItem = await prisma.cartItem.create({
			data: {
				cartId: requestData.cartId,
				pizzaId: requestData.pizzaId,
				pizzaDoughType: requestData.pizzaDoughType,
				pizzaSizeId: requestData.pizzaSizeId,
				toppings: {
					connect: requestData.toppings?.map(topping => ({ id: topping })),
				},
			},
		})
		const cartItems = await prisma.cartItem.findMany()
		return NextResponse.json(cartItems, { status: 201 })
	} catch (error) {
		console.log(error)
		NextResponse.json(error, { status: 500 })
	}
}

export async function PATCH(req: NextRequest) {
	const token = req.cookies.get("authjs.session-token")
	if (!token) return NextResponse.json("Пользователь не авторизован", { status: 401 })

	const requestData = await req.json()
	if (!requestData || !isCartItemRequestPatchData(requestData)) return NextResponse.json("Bad request", { status: 400 })

	try {
		const { id, cartId, pizzaDoughType, pizzaId, count, toppings } = requestData
		const updatedCartItem = await prisma.cartItem.update({
			where: {
				id,
			},
			data: {
				cartId,
				pizzaDoughType,
				pizzaId,
				count,
				toppings: {
					connect: toppings?.map(topping => ({ id: topping })),
				},
			},
		})
		const cartItems = await prisma.cartItem.findMany()
		return NextResponse.json(cartItems, { status: 200 })
	} catch (error) {
		console.log(error)
		NextResponse.json(error, { status: 500 })
	}
}
