"use client"

import React, { forwardRef, Ref } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { gradientIcon } from "./styles.css"
import { Property } from "csstype"
import { useIsClient } from "../../hooks"
import { theme } from "../../theme/theme.css"
import Color = Property.Color

type GradientIconLinkProps = {
  children?: React.ReactNode
  clipPathId: string
  colors?: Color[]
  deg?: number
  href?: string
  className?: string
  size?: keyof typeof styles.linkSizeVariants
}

const GradientIconLink = (
  {
    children,
    colors = [theme.colors.gradient.start, theme.colors.gradient.end],
    deg = 120,
    clipPathId,
    href,
    className,
    size = "medium",
    ...props
  }: GradientIconLinkProps,
  ref: Ref<HTMLAnchorElement>,
) => {
  const isClient = useIsClient()

  const colorString = colors
    .map((color, index) => {
      return `${color} ${index * (100 / (colors.length - 1))}%`
    })
    .join(", ")

  return (
    <a
      ref={ref}
      href={href}
      className={clsx(
        className,
        styles.gradientLink,
        styles.linkSizeVariants[size],
      )}
    >
      <div
        style={{
          backgroundImage: `linear-gradient(${deg ?? 0}deg, ${colorString})`,
          clipPath: `url(#${clipPathId})`,
        }}
        className={clsx(gradientIcon, {
          [styles.gradientIconInvisible]: !isClient,
          [styles.gradientIconVisible]: isClient,
        })}
        {...props}
      />
      {children}
    </a>
  )
}

export type { GradientIconLinkProps }
export default forwardRef(GradientIconLink)
