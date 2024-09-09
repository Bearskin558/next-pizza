import { getAllIngredients } from "@/app/api/fetch/getAllIngredients"
import { queryClient } from "@/shared/components/QueryProvider/QueryProvider"
import { Ingredient } from "@/types/pizzas"
import { useQuery } from "@tanstack/react-query"

export const useGetAllIngredients = () => {
	const { data, isLoading, error, isFetched } = useQuery({
		queryKey: ["ingredients"],
		queryFn: getAllIngredients,
		select: data => data.data,
		refetchInterval: 1000000,
		refetchOnWindowFocus: false,
	})
	return { data, isLoading, error, isFetched }
}
