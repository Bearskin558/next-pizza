"use client"

import { ActionIcon, Avatar, Button, Menu, MenuDropdown, MenuItem, MenuTarget } from "@mantine/core"
import { BorderFullIcon, LogoutCircle02Icon } from "hugeicons-react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import styles from "./ProfileButton.module.scss"

interface Props {
	imageUrl: string | undefined | null
}

const ProfileButton = ({ imageUrl }: Props) => {
	const router = useRouter()

	const onClickOrdersHanlder = () => {
		router.refresh()
		router.push("/orders")
	}

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
				<MenuItem
					leftSection={<BorderFullIcon size={20} />}
					onClick={onClickOrdersHanlder}
				>
					Заказы
				</MenuItem>
				<MenuItem
					leftSection={<LogoutCircle02Icon size={20} />}
					onClick={() => signOut()}
				>
					Выйти
				</MenuItem>
			</MenuDropdown>
		</Menu>
	)
}

export default ProfileButton
