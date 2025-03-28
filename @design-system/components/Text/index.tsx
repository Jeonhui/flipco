"use client"

import React, { forwardRef, Ref } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Property } from "csstype"
import { AnimatePresence, motion } from "framer-motion"
import Width = Property.Width
import WhiteSpace = Property.WhiteSpace

type TextProps = {
  children: React.ReactNode
  className?: string
  minWidth?: Width
  isLoading?: boolean
  whiteSpace?: WhiteSpace
  lineClamp?: number
  color?: keyof typeof styles.textColorVariants
  font?: keyof typeof styles.textFontVariants
  typography?: keyof typeof styles.textTypographyVariants
}

const Text = (
  {
    children,
    className,
    minWidth,
    whiteSpace = "pre-wrap",
    lineClamp,
    isLoading = undefined,
    color = "text",
    font = "base",
    typography = "body1",
    ...props
  }: TextProps,
  ref: Ref<HTMLSpanElement>,
) => {
  return (
    <AnimatePresence mode={"wait"}>
      {isLoading ? (
        <motion.span
          key={"skelton"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
          style={{
            minWidth: minWidth,
          }}
          className={clsx(
            className,
            styles.text,
            styles.textColorVariants[color],
            styles.textFontVariants[font],
            styles.textTypographyVariants[typography],
            {
              [styles.skeleton]: isLoading,
            },
          )}
        />
      ) : (
        <motion.span
          ref={ref}
          key={"text"}
          initial={{ opacity: isLoading != undefined ? 0 : 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            minWidth: minWidth,
            whiteSpace: whiteSpace,
            ...(lineClamp
              ? {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  lineClamp: lineClamp,
                  WebkitLineClamp: lineClamp,
                  WebkitBoxOrient: "vertical",
                }
              : {}),
          }}
          className={clsx(
            className,
            styles.text,
            styles.textColorVariants[color],
            styles.textFontVariants[font],
            styles.textTypographyVariants[typography],
          )}
          {...props}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

export type { TextProps }
export default forwardRef(Text)
