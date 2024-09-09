import clsx from "clsx"
import CartButton from "./CartButton/CartButton"
import styles from "./Header.module.css"
import Logo from "./Logo/Logo"
import Search from "./Search/Search"
import SignInBtn from "./SignInBtn/SignInBtn"

const Header = async () => {
	const headerClassName = clsx("container", styles.headerContainer)
	return (
		<header className={styles.header}>
			<div className={headerClassName}>
				<Logo />
				<Search />
				<div className={styles.btnBlock}>
					<SignInBtn />
					<CartButton />
				</div>
			</div>
		</header>
	)
}

export default Header
