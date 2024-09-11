"use client"

import { searchPizzas } from "@/app/api/fetch/pizza"
import { Pizza } from "@/types/pizzas"
import { CloseButton, TextInput } from "@mantine/core"
import { useToggle } from "@siberiacancode/reactuse"
import clsx from "clsx"
import { Search02Icon } from "hugeicons-react"
import { debounce } from "lodash"
import { useCallback, useEffect, useState } from "react"
import { Colors } from "@/constants/colors"
import SearchPizzaCard from "../../SearchPizzaCard/SearchPizzaCard"
import styles from "./Search.module.scss"

const Search = () => {
	const [isFocused, toggleIsFocused] = useToggle([false, true])
	const [searchValue, setSearchValue] = useState("")
	const [filteredPizzas, setFilteredPizzas] = useState<Pizza[]>([])
	const blurClassName = clsx(styles.blur, { [styles.onFocus]: isFocused })

	const debounceSearchPizzas = useCallback(
		debounce(async (searchValue: string) => {
			if (searchValue.length === 0) return setFilteredPizzas([])
			const pizzas = (await searchPizzas(searchValue)).data
			setFilteredPizzas(pizzas)
		}, 300),
		[],
	)

	const onChangeHandler = (value: string) => {
		setSearchValue(value)
		debounceSearchPizzas(value)
	}

	const resetHandler = () => {
		setSearchValue("")
		setFilteredPizzas([])
	}

	const onBlurHandler = () => {
		toggleIsFocused(false)
		setSearchValue("")
		setFilteredPizzas([])
	}

	useEffect(() => {
		isFocused ? document?.body.classList.add("modal-open") : document?.body.classList.remove("modal-open")
	}, [isFocused])

	return (
		<div className={styles.wrapper}>
			<div className={styles.searchContainer}>
				<TextInput
					className={styles.search}
					size="md"
					placeholder="Поиск пиццы..."
					radius={"lg"}
					onFocus={() => toggleIsFocused(true)}
					value={searchValue}
					onChange={e => onChangeHandler(e.target.value)}
					leftSection={
						<Search02Icon
							color={Colors.SECONDARY_TEXT}
							size={20}
						/>
					}
					rightSection={searchValue.length > 0 && <CloseButton onClick={resetHandler} />}
				/>
				{filteredPizzas.length > 0 && (
					<div className={styles.pizzasCards}>
						{filteredPizzas.map(pizza => (
							<SearchPizzaCard
								pizza={pizza}
								key={pizza.id}
								onClickHandler={onBlurHandler}
							/>
						))}
					</div>
				)}
			</div>
			<div
				className={blurClassName}
				onClick={() => toggleIsFocused(false)}
			/>
		</div>
	)
}

export default Search
