import theme from "@/styles/mantineTheme"
import { MantineProvider } from "@mantine/core"
import QueryProvider from "../QueryProvider/QueryProvider"

interface Props {
	children: React.ReactNode
}

const Providers = ({ children }: Props) => {
	return (
		<MantineProvider
			theme={theme}
			defaultColorScheme="dark"
		>
			{children}
		</MantineProvider>
	)
}

export default Providers
