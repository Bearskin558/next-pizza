import { prisma } from "@/prisma/prisma-client"
import { CartResponse } from "@/types/cart"
import { NextRequest, NextResponse } from "next/server"
import { cartItemsDto } from "../cartItemsDto/cartItemsDto"

export const revalidate = 0

export async function GET(req: NextRequest) {
	const token = req.cookies.get("__Secure-authjs.session-token")
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
						cartItems: {
							select: cartItemsDto,
							orderBy: {
								createdAt: "asc",
							},
						},
					},
				},
			},
		})
		if (!user) return NextResponse.json("Пользователь не авторизован", { status: 401 })

		if (!user.cart) {
			const cart = await prisma.cart.create({
				data: {
					userId: user.id,
				},
				select: {
					id: true,
					cartItems: {
						select: cartItemsDto,
						orderBy: {
							createdAt: "asc",
						},
					},
				},
			})

			return NextResponse.json<CartResponse>(cart, { status: 200 })
		}
		return NextResponse.json<CartResponse>(user.cart, { status: 200 })
	} catch (error) {
		NextResponse.json(error, { status: 500 })
	}
}
