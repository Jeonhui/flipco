"use client"

import React, { forwardRef, Ref } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { motion } from "framer-motion"

type SectionProps = {
  id?: string
  children: React.ReactNode
  className?: string
  animate?: boolean
  hasHeaderPadding?: boolean
  alignment?: keyof typeof styles.sectionAlignmentVariants
  gap?: keyof typeof styles.sectionGapVariants
  verticalPadding?: keyof typeof styles.sectionVerticalPaddingVariants
  horizontalPadding?: keyof typeof styles.sectionHorizontalPaddingVariants
}

const Section = (
  {
    id,
    children,
    className,
    animate = true,
    hasHeaderPadding = true,
    alignment = "columnTopLeft",
    gap = "medium",
    verticalPadding = "medium",
    horizontalPadding = "none",
    ...props
  }: SectionProps,
  ref: Ref<HTMLDivElement>,
) => {

  return (
    <motion.div
      id={id}
      ref={ref}
      className={clsx(
        "section",
        className,
        styles.section,
        styles.sectionGapVariants[gap],
        styles.sectionAlignmentVariants[alignment],
        styles.sectionVerticalPaddingVariants[verticalPadding],
        styles.sectionHorizontalPaddingVariants[horizontalPadding],
      )}
      {...props}
      data-animate={animate}
      data-has-header-padding={hasHeaderPadding}
    >
      {children}
    </motion.div>
  )
}

export default forwardRef(Section)
