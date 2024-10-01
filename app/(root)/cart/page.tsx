import CartPage from "@/shared/components/CartPage/CartPage"

export const generateMetadata = async () => {
	return {
		title: "Next Pizza | Корзина",
	}
}

const Cart = () => {
	return (
		<main>
			{" "}
			<div className="container">
				<CartPage />
			</div>
		</main>
	)
}

export default Cart
