"use client"

import { ActionIcon, Avatar, Button, Menu, MenuDropdown, MenuItem, MenuTarget } from "@mantine/core"
import { BorderFullIcon, LogoutCircle02Icon } from "hugeicons-react"
import { signOut } from "next-auth/react"
import Image from "next/image"
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
					<Image
						className={styles.avatar}
						src={imageUrl || ""}
						alt="img"
						width={50}
						height={50}
					/>
				</ActionIcon>
			</MenuTarget>
			<MenuDropdown>
				<MenuItem leftSection={<BorderFullIcon size={20} />}>Заказы</MenuItem>
				<MenuItem
					leftSection={
						<LogoutCircle02Icon
							size={20}
							type="submit"
						/>
					}
					type="submit"
					onClick={() => signOut()}
				>
					Выйти
				</MenuItem>
			</MenuDropdown>
		</Menu>
	)
}

export default ProfileButton
