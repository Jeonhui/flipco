"use client"

import React, { forwardRef, HTMLProps, Ref } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Property } from "csstype"
import Height = Property.Height

type ContainerProps = {
  children?: React.ReactNode
  className?: string
  minHeight?: Height
  box?: boolean
  flexGrow?: boolean
  layout?: keyof typeof styles.containerLayoutVariants
  alignment?: keyof typeof styles.containerAlignmentVariants
  padding?: keyof typeof styles.containerPaddingVariants
  gap?: keyof typeof styles.containerGapVariants
} & HTMLProps<HTMLDivElement>

const Container = (
  {
    children,
    className,
    minHeight,
    box = false,
    flexGrow = false,
    layout,
    alignment = "columnCenter",
    padding = "none",
    gap = "none",
    ...props
  }: ContainerProps,
  ref: Ref<HTMLDivElement>,
) => {
  return (
    <div
      ref={ref}
      style={{ ...(minHeight ? { height: minHeight } : {}) }}
      className={clsx(
        className,
        "container",
        styles.container,
        {
          [styles.box]: box,
          [styles.flexGrow]: flexGrow,
        },
        layout && styles.containerLayoutVariants[layout],
        styles.containerAlignmentVariants[alignment],
        styles.containerPaddingVariants[padding],
        styles.containerGapVariants[gap],
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default forwardRef(Container)
