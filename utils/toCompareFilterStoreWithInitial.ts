export const toCompareFilterStoreWithInitial = (minPrice: number, maxPrice: number, ingredients: string[]): boolean => {
	return minPrice === 0 && maxPrice === 2000 && ingredients.length === 0
}
