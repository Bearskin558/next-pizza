import { Pizza, PizzaSize } from "@prisma/client"

export type PizzaSizeSeed = Pick<PizzaSize, "size" | "price">

interface PizzaSeed extends Omit<Pizza, "id" | "createdAt" | "updatedAt"> {
	ingredients: string[]
	sizes: PizzaSizeSeed[]
}

const pizzas: PizzaSeed[] = [
	{
		name: "Сырная",
		description: "Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо",
		ingredients: ["Сливочная моцарелла", "Сыры чеддер и пармезан"],
		imageUrl: "/pizzas/cheese.avif",
		sizes: [
			{
				size: "SMALL",
				price: 500,
			},
			{
				size: "MEDIUM",
				price: 700,
			},
			{
				size: "LARGE",
				price: 850,
			},
		],
		categories: ["VEGAN"],
	},
	{
		name: "Пепперони фреш",
		description: "Пикантная пепперони , увеличенная порция моцареллы, томаты , фирменный томатный соус",
		ingredients: ["Пикантная пепперони", "Сливочная моцарелла", "Свежие томаты"],
		imageUrl: "/pizzas/pepperoni.avif",
		sizes: [
			{
				size: "SMALL",
				price: 520,
			},
			{
				size: "MEDIUM",
				price: 730,
			},
			{
				size: "LARGE",
				price: 900,
			},
		],
		categories: ["MEAT"],
	},
	{
		name: "Двойной цыпленок",
		description: "Цыпленок , моцарелла, фирменный соус альфредо",
		ingredients: ["Нежный цыпленок", "Сливочная моцарелла"],
		imageUrl: "/pizzas/double-chicken.avif",
		sizes: [
			{
				size: "SMALL",
				price: 450,
			},
			{
				size: "MEDIUM",
				price: 690,
			},
			{
				size: "LARGE",
				price: 870,
			},
		],
		categories: ["MEAT", "CHICKEN"],
	},
	{
		name: "Ветчина и сыр",
		description: "Ветчина , моцарелла, фирменный соус альфредо",
		ingredients: ["Ветчина", "Сливочная моцарелла"],
		imageUrl: "/pizzas/ham-cheese.avif",
		sizes: [
			{
				size: "SMALL",
				price: 450,
			},
			{
				size: "MEDIUM",
				price: 690,
			},
			{
				size: "LARGE",
				price: 870,
			},
		],
		categories: ["MEAT"],
	},
	{
		name: "Пицца Жюльен",
		description:
			"Цыпленок , шампиньоны , ароматный грибной соус, красный лук , чеснок , моцарелла, смесь сыров чеддер и пармезан , фирменный соус альфредо",
		ingredients: ["Нежный цыпленок", "Шампиньоны", "Красный лук", "Сливочная моцарелла", "Сыры чеддер и пармезан"],
		imageUrl: "/pizzas/julien.avif",
		sizes: [
			{
				size: "SMALL",
				price: 539,
			},
			{
				size: "MEDIUM",
				price: 799,
			},
			{
				size: "LARGE",
				price: 969,
			},
		],
		categories: ["MEAT", "CHICKEN"],
	},
	{
		name: "Песто",
		description: "Цыпленок , соус песто, кубики брынзы , томаты , моцарелла, фирменный соус альфредо",
		ingredients: ["Нежный цыпленок", "Кубики брынзы", "Свежие томаты", "Сливочная моцарелла"],
		imageUrl: "/pizzas/pesto.avif",
		sizes: [
			{
				size: "SMALL",
				price: 539,
			},
			{
				size: "MEDIUM",
				price: 799,
			},
			{
				size: "LARGE",
				price: 969,
			},
		],
		categories: ["MEAT", "CHICKEN"],
	},
	{
		name: "Мясная",
		description:
			"Цыпленок , ветчина , пикантная пепперони , острые колбаски чоризо , моцарелла, фирменный томатный соус",
		ingredients: ["Нежный цыпленок", "Ветчина", "Пикантная пепперони", "Острая чоризо", "Сливочная моцарелла"],
		imageUrl: "/pizzas/meat.avif",
		sizes: [
			{
				size: "SMALL",
				price: 539,
			},
			{
				size: "MEDIUM",
				price: 799,
			},
			{
				size: "LARGE",
				price: 969,
			},
		],
		categories: ["MEAT", "CHICKEN", "SPICY"],
	},
	{
		name: "Бургер-пицца",
		description:
			"Ветчина , маринованные огурчики , томаты , красный лук , чеснок , соус бургер, моцарелла, фирменный томатный соус",
		ingredients: ["Ветчина", "Маринованные огурчики", "Свежие томаты", "Красный лук", "Сливочная моцарелла"],
		imageUrl: "/pizzas/burger.avif",
		sizes: [
			{
				size: "SMALL",
				price: 489,
			},
			{
				size: "MEDIUM",
				price: 729,
			},
			{
				size: "LARGE",
				price: 899,
			},
		],
		categories: ["MEAT"],
	},
	{
		name: "Гавайская",
		description: "Цыпленок , ананасы , моцарелла, фирменный соус альфредо",
		ingredients: ["Сочные ананасы", "Нежный цыпленок", "Сливочная моцарелла"],
		imageUrl: "/pizzas/hawaiian.avif",
		sizes: [
			{
				size: "SMALL",
				price: 489,
			},
			{
				size: "MEDIUM",
				price: 729,
			},
			{
				size: "LARGE",
				price: 899,
			},
		],
		categories: ["MEAT", "CHICKEN", "SWEET"],
	},
	{
		name: "Овощи и грибы",
		description:
			"Шампиньоны , томаты , сладкий перец , красный лук , кубики брынзы , моцарелла, фирменный томатный соус, итальянские травы ",
		ingredients: [
			"Шампиньоны",
			"Свежие томаты",
			"Сладкий перец",
			"Красный лук",
			"Кубики брынзы",
			"Сливочная моцарелла",
			"Итальянские травы",
		],
		imageUrl: "/pizzas/vegetables.avif",
		sizes: [
			{
				size: "SMALL",
				price: 539,
			},
			{
				size: "MEDIUM",
				price: 799,
			},
			{
				size: "LARGE",
				price: 969,
			},
		],
		categories: ["VEGAN"],
	},
	{
		name: "Диабло",
		description:
			"Острые колбаски чоризо , острый перец халапеньо , соус барбекю, митболы из говядины , томаты , сладкий перец , красный лук , моцарелла, фирменный томатный соус",
		ingredients: [
			"Острая чоризо",
			"Острый перец халапеньо",
			"Митболы",
			"Свежие томаты",
			"Сладкий перец",
			"Красный лук",
			"Сливочная моцарелла",
		],
		imageUrl: "/pizzas/diablo.avif",
		sizes: [
			{
				size: "SMALL",
				price: 589,
			},
			{
				size: "MEDIUM",
				price: 899,
			},
			{
				size: "LARGE",
				price: 999,
			},
		],
		categories: ["MEAT", "SPICY"],
	},
	{
		name: "Креветки со сладким чили",
		description: "Креветки , ананасы , соус сладкий чили, сладкий перец , моцарелла, фирменный соус альфредо",
		ingredients: ["Креветки", "Сочные ананасы", "Сладкий перец", "Сливочная моцарелла"],
		imageUrl: "/pizzas/shrimp-pizza.avif",
		sizes: [
			{
				size: "SMALL",
				price: 589,
			},
			{
				size: "MEDIUM",
				price: 899,
			},
			{
				size: "LARGE",
				price: 999,
			},
		],
		categories: ["SWEET"],
	},
]
export default pizzas
