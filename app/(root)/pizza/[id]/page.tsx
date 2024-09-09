import React from "react"

const PizzaPage = ({ params: { id } }: { params: { id: string } }) => {
	return <div>Пицца с id {id}</div>
}

export default PizzaPage
