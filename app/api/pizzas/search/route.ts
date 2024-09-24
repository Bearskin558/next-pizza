import { prisma } from "@/prisma/prisma-client"
import { NextRequest, NextResponse } from "next/server"

export const revalidate = 10

export async function GET(request: NextRequest) {
	const queryValue = request.nextUrl.searchParams.get("query") || ""
	const pizzas = await prisma.pizza.findMany({
		where: {
			OR: [
				{
					name: {
						contains: queryValue,
						mode: "insensitive",
					},
				},
				{
					name: {
						contains: queryValue[0].toUpperCase() + queryValue.slice(1),
						mode: "insensitive",
					},
				},
			],
		},
		select: {
			id: true,
			name: true,
			description: true,
			imageUrl: true,
		},
	})

	return NextResponse.json(pizzas)
}
