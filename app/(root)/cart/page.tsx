import { getCart } from "@/app/api/fetch/cart"
import { cookies } from "next/headers"

// import { auth } from "@/lib/auth/auth"
// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"

export const revalidate = 0

const Cart = async () => {
	const token = cookies().get("authjs.session-token")?.value
	// const session = await auth()
	// console.log(session?.user)
	// if (!session) redirect("/")
	const response = await getCart({ headers: { Cookie: `authjs.session-token=${token}` }, credentials: "include" })
	// console.log(response)
	// const response = await getCart({ headers: { Cookie: `authjs.session-token=${token}` } })
	// console.log(response)

	if (response.status === 200) {
		return (
			<div>
				{response.data.cartItems.map(item => (
					<div key={item.id}>{item.pizzaId}</div>
				))}
			</div>
		)
	}
}

export default Cart
