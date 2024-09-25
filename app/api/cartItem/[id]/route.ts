import { prisma } from "@/prisma/prisma-client"
import { NextRequest, NextResponse } from "next/server"

export const revalidate = 10

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const token = req.cookies.get("authjs.session-token")
	if (!token) return NextResponse.json("Пользователь не авторизован", { status: 401 })

	try {
		const deletedCartItem = await prisma.cartItem.delete({
			where: {
				id: params.id,
			},
		})
		console.log(deletedCartItem)
		const cartItems = await prisma.cartItem.findMany()
		return NextResponse.json(cartItems, { status: 200 })
	} catch (error) {
		console.log(error)
		NextResponse.json(error, { status: 500 })
	}
}
