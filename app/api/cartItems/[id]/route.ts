import { prisma } from "@/prisma/prisma-client"
import { CartItemResponse } from "@/types/cart"
import isRequestDataToEditCountCartItem from "@/utils/isRequestDataToEditCountCartItem"
import { NextRequest, NextResponse } from "next/server"
import { cartItemsDto } from "../../cartItemsDto/cartItemsDto"

export const revalidate = 0

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const token = req.cookies.get("authjs.session-token")
	if (!token) return NextResponse.json("Пользователь не авторизован", { status: 401 })

	try {
		const deletedCartItem = await prisma.cartItem.delete({
			where: {
				id: params.id,
			},
		})
		const cartItems = await prisma.cartItem.findMany({
			where: {
				cart: {
					user: {
						sessions: {
							some: {
								sessionToken: token.value,
							},
						},
					},
				},
			},
			select: cartItemsDto,
			orderBy: {
				createdAt: "asc",
			},
		})
		return NextResponse.json<CartItemResponse[]>(cartItems, { status: 200 })
	} catch (error) {
		console.log(error)
		NextResponse.json(error, { status: 500 })
	}
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	const token = req.cookies.get("authjs.session-token")
	if (!token) return NextResponse.json("Пользователь не авторизован", { status: 401 })
	const requestData = await req.json()
	if (!isRequestDataToEditCountCartItem(requestData)) return NextResponse.json("Bad request", { status: 400 })
	try {
		const cartItem = await prisma.cartItem.update({
			where: {
				id: requestData.id,
			},
			data: {
				count: +requestData.count,
			},
		})
		const cartItems = await prisma.cartItem.findMany({
			where: {
				cart: {
					user: {
						sessions: {
							some: {
								sessionToken: token.value,
							},
						},
					},
				},
			},
			select: cartItemsDto,
			orderBy: {
				createdAt: "asc",
			},
		})
		return NextResponse.json<CartItemResponse[]>(cartItems, { status: 200 })
	} catch (error) {
		console.log(error)
		NextResponse.json(error, { status: 500 })
	}
}
