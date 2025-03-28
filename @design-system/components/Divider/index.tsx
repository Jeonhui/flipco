"use client"

import React, { forwardRef, HTMLProps, Ref } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"

type DividerProps = {
  direction?: "horizontal" | "vertical"
  thickness?: keyof typeof styles.dividerThicknessVariants
  color?: keyof typeof styles.dividerColorVariants
} & HTMLProps<HTMLHRElement>

const Divider = (
  {
    direction = "horizontal",
    thickness = "xxSmall",
    color = "textDim",
    ...props
  }: DividerProps,
  ref: Ref<HTMLHRElement>,
) => {
  return (
    <hr
      ref={ref}
      className={clsx(
        styles.divider,
        styles.dividerThicknessVariants[thickness],
        styles.dividerColorVariants[color],
        {
          [styles.dividerHorizontal]: direction === "horizontal",
          [styles.dividerVertical]: direction === "vertical",
        },
      )}
      {...props}
    />
  )
}

export default forwardRef(Divider)
