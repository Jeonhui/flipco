"use client"

import React, { JSX } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"

type MainLayoutProps = {
  children: JSX.Element
}

const MainLayout = ({ children, ...props }: MainLayoutProps) => {
  return (
    <div className={clsx(styles.mainLayout)} {...props}>
      {children}
    </div>
  )
}

export default MainLayout
