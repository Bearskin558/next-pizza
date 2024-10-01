import { TelegramIcon } from "hugeicons-react"
import styles from "./Footer.module.scss"

const Footer = () => {
	return (
		<div className={styles.footer}>
			<div className="container">
				<div className={styles.wrapper}>
					<p>Контакты разработчика сайта:</p>
					<a
						href="https://t.me/bearskin558"
						target="_blank"
					>
						<div className={styles.linkContainer}>
							<TelegramIcon size={20} />
							<p>telegram</p>
						</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default Footer
