import Footer from "@/shared/components/Footer/Footer"
import Header from "@/shared/components/Header"
import React, { ReactNode } from "react"

const HomeLayout = ({ children, modal }: { children: ReactNode; modal: ReactNode }) => {
	return (
		<>
			<Header />
			{children}
			{modal}
			<Footer />
		</>
	)
}

export default HomeLayout
