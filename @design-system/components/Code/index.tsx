"use client"

import React, { forwardRef, Ref } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"

type CodeProps = {
  children: React.ReactNode
  className?: string
  size?: keyof typeof styles.codeSizeVariants
  onClick?: () => void
}

const Code = (
  { children, className, size = "xSmall", onClick, ...props }: CodeProps,
  ref: Ref<HTMLElement>,
) => {
  const onClickHandler = () => {
    onClick?.()
  }

  return (
    <code
      ref={ref}
      className={clsx(className, styles.code, styles.codeSizeVariants[size])}
      onClick={onClickHandler}
      {...props}
    >
      {children}
    </code>
  )
}

export type { CodeProps }
export default forwardRef(Code)
