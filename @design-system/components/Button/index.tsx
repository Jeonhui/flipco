"use client"

import React, { forwardRef, Ref } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"

type ButtonProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  alignment?: keyof typeof styles.buttonAlignmentVariants
  color?: keyof typeof styles.buttonColorVariants
  size?: keyof typeof styles.buttonSizeVariants
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClick?: () => void
  onMouseDown?: () => void
  disabled?: boolean
}

const Button = (
  {
    children,
    className,
    style,
    leftIcon,
    rightIcon,
    alignment = "rowCenter",
    color = "default",
    size = "medium",
    onClick,
    onMouseDown,
    ...props
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) => {
  const onClickHandler = () => {
    onClick?.()
  }

  return (
    <button
      ref={ref}
      style={style}
      className={clsx(
        className,
        styles.button,
        styles.buttonAlignmentVariants[alignment],
        styles.buttonColorVariants[color],
        styles.buttonSizeVariants[size],
      )}
      {...props}
      onClick={onClickHandler}
      onMouseDown={onMouseDown}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}

export type { ButtonProps }
export default forwardRef(Button)
