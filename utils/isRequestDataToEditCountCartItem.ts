import { RequestDataToEditCountCartItem } from "@/types/cart"

const isRequestDataToEditCountCartItem = (data: unknown): data is RequestDataToEditCountCartItem => {
	return typeof data === "object" && data !== null && "id" in data && "count" in data
}

export default isRequestDataToEditCountCartItem
