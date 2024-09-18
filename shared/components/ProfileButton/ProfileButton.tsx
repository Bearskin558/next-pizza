import { signOut } from "@/lib/auth/auth"
import { ActionIcon, Avatar, Button, Menu, MenuDropdown, MenuItem, MenuTarget } from "@mantine/core"
import { BorderFullIcon, LogoutCircle02Icon } from "hugeicons-react"
import styles from "./ProfileButton.module.scss"

interface Props {
	imageUrl: string | undefined | null
}

const ProfileButton = ({ imageUrl }: Props) => {
	return (
		<Menu>
			<MenuTarget>
				<ActionIcon
					variant="transparent"
					className={styles.button}
				>
					<Avatar
						src={imageUrl}
						size={50}
					/>
				</ActionIcon>
			</MenuTarget>
			<MenuDropdown>
				<MenuItem leftSection={<BorderFullIcon size={20} />}>Заказы</MenuItem>
				<form
					action={async () => {
						"use server"
						await signOut()
					}}
				>
					<MenuItem
						leftSection={
							<LogoutCircle02Icon
								size={20}
								type="submit"
							/>
						}
						type="submit"
					>
						Выйти
					</MenuItem>
				</form>
			</MenuDropdown>
		</Menu>
	)
}

export default ProfileButton
