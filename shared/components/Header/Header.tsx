import { auth } from "@/lib/auth/auth"
import clsx from "clsx"
import ProfileButton from "../ProfileButton/ProfileButton"
import SignInBtn from "../SignInBtn/SignInBtn"
import CartButton from "./CartButton/CartButton"
import styles from "./Header.module.css"
import Logo from "./Logo/Logo"
import Search from "./Search/Search"

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
