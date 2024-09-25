import { prisma } from "@/prisma/prisma-client"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const cookieStore = cookies()
	const token = cookieStore.get("authjs.session-token")
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

		if (!user.cart) {
			const cart = await prisma.cart.create({
				data: {
					userId: user.id,
				},
			})
			return NextResponse.json(cart, { status: 200 })
		}
		return NextResponse.json(user.cart, { status: 200 })
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
