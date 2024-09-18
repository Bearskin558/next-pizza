import theme from "@/styles/mantineTheme"
import { MantineProvider } from "@mantine/core"
import { SessionProvider } from "next-auth/react"

interface Props {
	children: React.ReactNode
}

const Providers = ({ children }: Props) => {
	return (
		<MantineProvider
			theme={theme}
			defaultColorScheme="dark"
		>
			<SessionProvider>{children}</SessionProvider>
		</MantineProvider>
	)
}

export default Providers
