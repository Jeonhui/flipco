"use client"

import React, { forwardRef, HTMLAttributeAnchorTarget, Ref } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"

type LinkProps = {
  children: React.ReactNode
  className?: string
  target?: HTMLAttributeAnchorTarget
  download?: string
  href?: string
  alignment?: keyof typeof styles.linkAlignmentVariants
  color?: keyof typeof styles.linkColorVariants
  size?: keyof typeof styles.linkSizeVariants
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClick?: () => void
}

const Link = (
  {
    children,
    className,
    href,
    target = "_self",
    download,
    leftIcon,
    rightIcon,
    alignment = "rowCenter",
    color = "default",
    size = "medium",
    onClick,
    ...props
  }: LinkProps,
  ref: Ref<HTMLAnchorElement>,
) => {
  const onClickHandler = () => {
    onClick?.()
  }

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      download={download}
      className={clsx(
        className,
        styles.link,
        styles.linkAlignmentVariants[alignment],
        styles.linkColorVariants[color],
        styles.linkSizeVariants[size],
      )}
      onClick={onClickHandler}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </a>
  )
}

export type { LinkProps }
export default forwardRef(Link)
