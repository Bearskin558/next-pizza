import { prisma } from "@/lib/auth/auth"
import { NextResponse } from "next/server"

export const revalidate = 10

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const pizzas = await prisma.pizza.findFirst({
		where: {
			id: params.id,
		},
		select: {
			id: true,
			name: true,
			description: true,
			imageUrl: true,
			sizes: {
				select: {
					size: true,
					price: true,
				},
			},
			ingredients: {
				select: {
					id: true,
					name: true,
				},
			},
			categories: true,
		},
	})

	return NextResponse.json(pizzas)
}
