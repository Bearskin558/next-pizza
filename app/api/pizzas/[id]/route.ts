import { prisma } from "@/prisma/prisma-client"
import { NextResponse } from "next/server"

export const revalidate = 3600

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
					id: true,
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
