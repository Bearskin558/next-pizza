import { auth } from "@/lib/auth/auth"
import clsx from "clsx"
import CartButton from "../CartButton/CartButton"
import Logo from "../Logo/Logo"
import ProfileButton from "../ProfileButton/ProfileButton"
import Search from "../Search/Search"
import SignInBtn from "../SignInBtn/SignInBtn"
import styles from "./Header.module.css"

async function Header() {
	const headerClassName = clsx("container", styles.headerContainer)
	const session = await auth()

	return (
		<header className={styles.header}>
			<div className={headerClassName}>
				<Logo />
				<Search />
				<div className={styles.btnBlock}>
					{session && <ProfileButton imageUrl={session.user?.image} />}
					{session === null && <SignInBtn />}
					<CartButton />
				</div>
			</div>
		</header>
	)
}

export default Header
