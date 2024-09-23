import { prisma } from "@/lib/auth/auth"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
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
