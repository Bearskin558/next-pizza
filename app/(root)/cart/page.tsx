import { getCart } from "@/app/api/fetch/cart"
import CartPage from "@/shared/components/CartPage/CartPage"
import { cookies } from "next/headers"

export const generateMetadata = async () => {
	return {
		title: "Next Pizza | Корзина",
	}
}

const Cart = async () => {
	return (
		<div className="container">
			<CartPage />
		</div>
	)
}

export default Cart
