"use client"

import { Button, TextInput, colorsTuple, createTheme, rem } from "@mantine/core"

const theme = createTheme({
	colors: {
		accent: colorsTuple("#f4511e"),
		secondaryText: colorsTuple("#7b7b7b"),
	},
	fontSizes: {
		xs: rem(14),
		sm: rem(16),
		md: rem(20),
		lg: rem(22),
		xl: rem(36),
	},
	cursorType: "pointer",
	headings: {
		fontFamily: "Nunito, sans-serif",

		sizes: {
			h1: {
				fontWeight: "800",
				fontSize: rem(36),
				lineHeight: "1.4",
			},
			h2: {
				fontWeight: "800",
				fontSize: rem(34),
				lineHeight: "1.1",
			},
			h3: {
				fontWeight: "700",
				fontSize: rem(24),
				lineHeight: "1.4",
			},
			h4: {
				fontWeight: "600",
				fontSize: rem(30),
				lineHeight: "1.4",
			},
			h5: {
				fontWeight: "600",
				fontSize: rem(18),
				lineHeight: "1.4",
			},
		},
	},

	components: {
		Button: Button.extend({
			defaultProps: {
				radius: 15,
				py: rem(12),
				color: "accent",
				fz: rem(22),
			},
		}),
	},
	fontFamily: "Nunito, sans-serif",
})
export default theme
