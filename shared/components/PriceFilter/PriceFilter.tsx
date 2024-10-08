"use client"

import { Input, RangeSlider, RangeSliderValue, Text } from "@mantine/core"
import { ChangeEvent } from "react"
import styles from "./PriceFilter.module.css"

interface Props {
	minPrice: number
	maxPrice: number
	setMinPrice: (value: number) => void
	setMaxPrice: (value: number) => void
}

const PriceFilter = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }: Props) => {
	const onChangeInputMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (+e.currentTarget.value >= maxPrice) return setMinPrice(maxPrice - 10)
		setMinPrice(+e.target.value)
		e.currentTarget.value = +e.target.value + ""
	}

	const onChangeInputMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setMaxPrice(+e.target.value)
		e.currentTarget.value = +e.target.value + ""
	}

	const onChangeInputSlider = (values: RangeSliderValue) => {
		setMinPrice(values[0])
		setMaxPrice(values[1])
	}

	return (
		<div className={styles.priceFilters}>
			<Text
				fz={16}
				fw={700}
			>
				Цена от и до:
			</Text>
			<div className={styles.inputsBlock}>
				<Input
					value={minPrice}
					rightSection={"₽"}
					type="number"
					radius="md"
					onChange={onChangeInputMinValueHandler}
				/>
				<Input
					value={maxPrice}
					rightSection={"₽"}
					type="number"
					radius="md"
					onChange={onChangeInputMaxValueHandler}
				/>
			</div>
			<RangeSlider
				color="accent"
				min={0}
				max={2000}
				label={null}
				value={[minPrice, maxPrice]}
				minRange={100}
				onChange={e => onChangeInputSlider(e)}
				step={10}
			/>
		</div>
	)
}

export default PriceFilter
