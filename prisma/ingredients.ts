import { Ingredient } from "@prisma/client"

type IngredientSeed = Pick<Ingredient, "name" | "price" | "imageUrl">
const ingredients: IngredientSeed[] = [
	{
		name: "Сырный бортик",
		price: 179,
		imageUrl: "/ingredients/cheesy-border.png",
	},
	{
		name: "Сливочная моцарелла",
		price: 79,
		imageUrl: "/ingredients/creamy-mozzarella.png",
	},
	{
		name: "Сыры чеддер и пармезан",
		price: 79,
		imageUrl: "/ingredients/cheddar-and-parmesan-cheese.png",
	},
	{
		name: "Острый перец халапеньо",
		price: 59,
		imageUrl: "/ingredients/spicy-jalapeno-pepper.png",
	},
	{
		name: "Нежный цыпленок",
		price: 79,
		imageUrl: "/ingredients/tender-chicken.png",
	},
	{
		name: "Шампиньоны",
		price: 59,
		imageUrl: "/ingredients/mushrooms.png",
	},
	{
		name: "Ветчина",
		price: 79,
		imageUrl: "/ingredients/ham.png",
	},
	{
		name: "Пикантная пепперони",
		price: 79,
		imageUrl: "/ingredients/spicy-pepperoni.png",
	},
	{
		name: "Острая чоризо",
		price: 79,
		imageUrl: "/ingredients/spicy-chorizo.png",
	},
	{
		name: "Маринованные огурчики",
		price: 59,
		imageUrl: "/ingredients/pickled-cucumbers.png",
	},
	{
		name: "Свежие томаты",
		price: 59,
		imageUrl: "/ingredients/fresh-tomatoes.png",
	},
	{
		name: "Красный лук",
		price: 59,
		imageUrl: "/ingredients/red-onion.png",
	},
	{
		name: "Сочные ананасы",
		price: 59,
		imageUrl: "/ingredients/juicy-pineapple.png",
	},
	{
		name: "Итальянские травы",
		price: 39,
		imageUrl: "/ingredients/italian-herbs.png",
	},
	{
		name: "Сладкий перец",
		price: 59,
		imageUrl: "/ingredients/sweet-pepper.png",
	},
	{
		name: "Кубики брынзы",
		price: 79,
		imageUrl: "/ingredients/feta-cheese-cubes.png",
	},
	{
		name: "Митболы",
		price: 79,
		imageUrl: "/ingredients/meatballs.png",
	},
	{
		name: "Креветки",
		price: 200,
		imageUrl: "/ingredients/shrimps.png",
	},
]
export default ingredients
