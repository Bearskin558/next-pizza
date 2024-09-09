export const toCompareFilterStores = (
	minPrice: number,
	minPriceStore: number,
	maxPrice: number,
	maxPriceStore: number,
	ingredients: string[],
	ingredientsStore: string[],
): boolean => {
	const isEqualPrices = minPrice === minPriceStore && maxPrice === maxPriceStore
	const isEqualIngredients =
		ingredients.length === ingredientsStore.length &&
		ingredients.every((item, index) => item === ingredientsStore[index])
	return isEqualIngredients && isEqualPrices
}
