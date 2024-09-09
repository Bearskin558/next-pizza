"use client"

import { motion } from "framer-motion"
import React, { MouseEvent, ReactNode, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import styles from "./Modal.module.scss"

interface Props {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

const Modal = ({ onClose, isOpen, children }: Props) => {
	const overlayRef = useRef<HTMLDivElement>(null)
	const onClickHandler = (event: MouseEvent<HTMLDivElement>) => {
		if (event.target === overlayRef.current) onClose()
	}

	useEffect(() => {
		isOpen ? document?.body.classList.add("modal-open") : document?.body.classList.remove("modal-open")
		return () => document?.body.classList.remove("modal-open")
	}, [isOpen])

	const modal = (
		<motion.div
			ref={overlayRef}
			onClick={e => onClickHandler(e)}
			className={styles.overlay}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			{children}
		</motion.div>
	)

	return isOpen && createPortal(modal, document.body)
}

export default Modal
