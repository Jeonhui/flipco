"use client"

import React, { forwardRef, Ref } from "react"
import { clsx } from "clsx"
import Button, { ButtonProps } from "../Button"
import { DarkModeIcon, LightModeIcon } from "../../assets/icon"
import * as styles from "./styles.css"
import { useIsClient, useTheme } from "../../hooks"
import { AnimatePresence, motion } from "framer-motion"

type ThemeToggleButtonProps = Omit<ButtonProps, "children">
const ThemeToggleButton = (
  { className, onClick, ...props }: ThemeToggleButtonProps,
  ref: Ref<HTMLButtonElement>,
) => {
  const isClient = useIsClient()
  const { theme, toggleTheme } = useTheme()

  const onClickHandler = () => {
    toggleTheme()
    onClick?.()
  }

  return (
    <Button
      ref={ref}
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
          ) : theme === "dark" ? (
            <motion.div
              key="dark"
              initial={{ opacity: 0, scale: 0.8, pointsAtX: -90 }}
              animate={{ opacity: 1, scale: 1, pointsAtX: 0 }}
              exit={{ opacity: 0, scale: 0.8, pointsAtX: 90 }}
              transition={{ duration: 0.3 }}
            >
              <DarkModeIcon
                className={clsx(styles.icon, styles.darkModeIcon)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="light"
              initial={{ opacity: 0, scale: 0.8, pointsAtX: -90 }}
              animate={{ opacity: 1, scale: 1, pointsAtX: 0 }}
              exit={{ opacity: 0, scale: 0.8, pointsAtX: 90 }}
              transition={{ duration: 0.3 }}
            >
              <LightModeIcon
                className={clsx(styles.icon, styles.lightModeIcon)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Button>
  )
}

export default forwardRef(ThemeToggleButton)
