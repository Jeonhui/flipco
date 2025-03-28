"use client"

import React, { Dispatch, SetStateAction } from "react"
import { clsx } from "clsx"
import Button, { ButtonProps } from "../../../Button"
import { CloseIcon, HamburgerMenuIcon } from "../../../../assets/icon"
import * as styles from "./styles.css"
import { useIsClient } from "../../../../hooks"
import { AnimatePresence, motion } from "framer-motion"

type HamburgerMenuButtonProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
} & Omit<ButtonProps, "children" | "onClick">

const HamburgerMenuButton = ({
  className,
  isOpen,
  setIsOpen,
  ...props
}: HamburgerMenuButtonProps) => {
  const isClient = useIsClient()

  const onClickHandler = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <Button
      className={clsx(className, styles.themeToggleButton)}
      color={"text"}
      onClick={onClickHandler}
      {...props}
    >
      <div className={styles.iconContainer}>
        <AnimatePresence mode="wait">
          {!isClient ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8, pointsAtX: -90 }}
              animate={{ opacity: 1, scale: 1, pointsAtX: 0 }}
              exit={{ opacity: 0, scale: 0.8, pointsAtX: 90 }}
              transition={{ duration: 0.3 }}
            >
              <svg style={{ aspectRatio: "1" }} />
            </motion.div>
          ) : isOpen ? (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.8, pointsAtX: -90 }}
              animate={{ opacity: 1, scale: 1, pointsAtX: 0 }}
              exit={{ opacity: 0, scale: 0.8, pointsAtX: 90 }}
              transition={{ duration: 0.3 }}
            >
              <CloseIcon className={clsx(styles.icon, styles.darkModeIcon)} />
            </motion.div>
          ) : (
            <motion.div
              key="close"
              initial={{ opacity: 0, scale: 0.8, pointsAtX: -90 }}
              animate={{ opacity: 1, scale: 1, pointsAtX: 0 }}
              exit={{ opacity: 0, scale: 0.8, pointsAtX: 90 }}
              transition={{ duration: 0.3 }}
            >
              <HamburgerMenuIcon
                className={clsx(styles.icon, styles.lightModeIcon)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Button>
  )
}

export default HamburgerMenuButton
