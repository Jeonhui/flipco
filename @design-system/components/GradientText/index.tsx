"use client"

import React, { forwardRef, Ref, useState } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Property } from "csstype"
import { useIsClient } from "../../hooks"
import { theme } from "../../theme/theme.css"
import Color = Property.Color

type GradientTextProps = {
  children: React.ReactNode
  colors?: Color[]
  deg?: number
  font?: keyof typeof styles.gradientTextFontVariants
  typography?: keyof typeof styles.gradientTextTypographyVariants
}

const GradientText = (
  {
    children,
    colors = [theme.colors.gradient.start, theme.colors.gradient.end],
    deg = 120,
    font = "base",
    typography = "body1",
    ...props
  }: GradientTextProps,
  ref: Ref<HTMLSpanElement>,
) => {
  const isClient = useIsClient()

  const [effect, setEffect] = useState(false)

  const onMouseOverHandler = () => {
    setEffect(true)
    setTimeout(() => {
      setEffect(false)
    }, 1000)
  }

  const colorString = colors
    .map((color, index) => `${color} ${index * (100 / (colors.length - 1))}%`)
    .join(", ")

  return (
    <span
      ref={ref}
      style={{
        backgroundImage: `linear-gradient(${deg ?? 0}deg, ${colorString})`,
      }}
      className={clsx(
        styles.gradientText,
        {
          [styles.gradientTextInvisible]: !isClient,
          [styles.gradientTextVisible]: isClient && !effect,
          [styles.gradientTextEffect]: isClient && effect,
        },
        styles.gradientTextFontVariants[font],
        styles.gradientTextTypographyVariants[typography],
      )}
      onMouseOver={onMouseOverHandler}
      {...props}
    >
      {children}
    </span>
  )
}

export type { GradientTextProps }
export default forwardRef(GradientText)
