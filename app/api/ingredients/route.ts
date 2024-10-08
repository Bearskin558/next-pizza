import { prisma } from "@/prisma/prisma-client"
import { NextResponse } from "next/server"

export const revalidate = 3600

export async function GET() {
	const ingredients = await prisma.ingredient.findMany({
		select: {
			id: true,
			name: true,
			imageUrl: true,
			price: true,
		},
	})
	return NextResponse.json(ingredients)
}
