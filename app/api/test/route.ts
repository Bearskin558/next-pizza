import { prisma } from "@/prisma/prisma-client"
import { NextResponse } from "next/server"

export async function GET() {
	const cartItem = await prisma.cartItem.findFirst({
		where: {
			id: "cm1grbcrw00052bddzuxkyo2b",
		},
		select: {
			toppings: true,
		},
	})
	return NextResponse.json(cartItem, { status: 200 })
}
