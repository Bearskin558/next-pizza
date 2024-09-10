import prisma from "@/prisma/prisma-client"
import { NextRequest, NextResponse } from "next/server"

export const revalidate = 10

export async function GET(request: NextRequest) {
	const queryValue = request.nextUrl.searchParams.get("query") || ""
	const pizzas = await prisma.pizza.findMany({
		where: {
			name: {
				contains: queryValue,
				mode: "insensitive",
			},
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
