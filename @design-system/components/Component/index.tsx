"use client"

import React, { forwardRef, Ref } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"

type ComponentProps = {
  children: React.ReactNode
}

const Component = (
  { children, ...props }: ComponentProps,
  ref: Ref<HTMLDivElement>,
) => {
  return (
    <div ref={ref} className={clsx(styles.components)} {...props}>
      {children}
    </div>
  )
}

export default forwardRef(Component)
