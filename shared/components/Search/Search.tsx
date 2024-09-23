"use client"

import { searchPizzas } from "@/app/api/fetch/pizza"
import { Pizza } from "@/types/pizzas"
import { ActionIcon, Button, CloseButton, Loader, TextInput } from "@mantine/core"
import { useToggle } from "@siberiacancode/reactuse"
import clsx from "clsx"
import { Search02Icon } from "hugeicons-react"
import { debounce } from "lodash"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Colors } from "@/constants/colors"
import HeaderButton from "../HeaderButton/HeaderButton"
import SearchPizzaCard from "../SearchPizzaCard/SearchPizzaCard"
import styles from "./Search.module.scss"

const Search = () => {
	const pathname = usePathname()
	const [isFocused, toggleIsFocused] = useToggle([false, true])
	const [searchValue, setSearchValue] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [filteredPizzas, setFilteredPizzas] = useState<Pizza[]>([])
	const [visibleSearchInput, setVisibleSearchInput] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const blurClassName = clsx(styles.blur, { [styles.onFocus]: isFocused })

	useLayoutEffect(() => {
		if (isFocused) document.body.style.marginRight = window.innerWidth - document.documentElement.offsetWidth + "px"
		return () => {
			document.body.style.marginRight = "0px"
		}
	}, [isFocused])

	const debounceSearchPizzas = useCallback(
		debounce(async (searchValue: string) => {
			if (searchValue.length === 0) return setFilteredPizzas([])
			setIsLoading(true)
			const pizzas = (await searchPizzas(searchValue)).data
			setFilteredPizzas(pizzas)
			setIsLoading(false)
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
		setVisibleSearchInput(false)
		setIsLoading(false)
	}

	useEffect(() => {
		isFocused ? document?.body.classList.add("modal-open") : document?.body.classList.remove("modal-open")
	}, [isFocused])

	useEffect(() => {
		visibleSearchInput === true && inputRef.current?.focus()
	}, [visibleSearchInput])

	const onClickSearchButtonHandler = () => {
		toggleIsFocused()
		setVisibleSearchInput(true)
	}

	const classNameSearchInput = clsx(styles.search, {
		[styles.visible]: visibleSearchInput,
	})

	if (pathname === "/")
		return (
			<div className={styles.wrapper}>
				<div className={styles.searchContainer}>
					<HeaderButton
						Icon={Search02Icon}
						onClick={onClickSearchButtonHandler}
						className={styles.searchButton}
					/>
					<TextInput
						className={classNameSearchInput}
						ref={inputRef}
						size="md"
						placeholder="Поиск пиццы..."
						radius={"lg"}
						onFocus={() => toggleIsFocused(true)}
						value={searchValue}
						onChange={e => onChangeHandler(e.target.value)}
						leftSection={
							isLoading ? (
								<Loader
									size={20}
									color={Colors.ACCENT}
								/>
							) : (
								<Search02Icon
									color={Colors.SECONDARY_TEXT}
									size={20}
								/>
							)
						}
						rightSection={
							searchValue.length > 0 && (
								<div className={styles.rightSection}>
									<CloseButton onClick={resetHandler} />
								</div>
							)
						}
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
					onClick={onBlurHandler}
				/>
			</div>
		)
}

export default Search
