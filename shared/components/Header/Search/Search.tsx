"use client"

import { usePizzasStore } from "@/shared/store/pizzasStore"
import { Pizza } from "@/types/pizzas"
import { toFilterPizzasBySearchValue } from "@/utils/toFilterPizzasBySearchValue"
import { TextInput } from "@mantine/core"
import { useToggle } from "@siberiacancode/reactuse"
import clsx from "clsx"
import { Search02Icon } from "hugeicons-react"
import { debounce } from "lodash"
import { useCallback, useEffect, useState } from "react"
import { Colors } from "@/constants/colors"
import styles from "./Search.module.scss"

const Search = () => {
	const [isFocused, toggleIsFocused] = useToggle([false, true])
	const [searchValue, setSearchValue] = useState("")
	const [filteredPizzas, setFilteredPizzas] = useState<Pizza[]>([])
	const pizzas = usePizzasStore(state => state.pizzas)

	const blurClassName = clsx(styles.blur, { [styles.onFocus]: isFocused })

	useEffect(() => {
		isFocused ? document?.body.classList.add("modal-open") : document?.body.classList.remove("modal-open")
	}, [isFocused])

	const debounceToFilterPizzas = useCallback((pizzas: Pizza[], searchValue: string) => {
		const pizzasFiltered = toFilterPizzasBySearchValue(pizzas, searchValue)
		setFilteredPizzas(pizzasFiltered!)
	}, [])

	const onChangeHandler = (searchValue: string) => {
		setSearchValue(searchValue)
		debounceToFilterPizzas(pizzas, searchValue)
	}

	return (
		<div className={styles.wrapper}>
			<TextInput
				className={styles.search}
				size="md"
				placeholder="Поиск пиццы..."
				radius={"lg"}
				onFocus={() => toggleIsFocused(true)}
				onBlur={() => toggleIsFocused(false)}
				value={searchValue}
				onChange={e => onChangeHandler(e.target.value)}
				leftSection={
					<Search02Icon
						color={Colors.SECONDARY_TEXT}
						size={20}
					/>
				}
			/>
			<div
				className={blurClassName}
				onClick={() => toggleIsFocused(false)}
			></div>
		</div>
	)
}

export default Search
