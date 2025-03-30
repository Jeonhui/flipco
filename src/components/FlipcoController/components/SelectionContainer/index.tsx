"use client"

import { useIsClient } from "@design-system/hooks"
import React, { ReactNode } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Container, Text } from "@design-system/components"

type SelectionContainerProps = {
  title?: string
  isVisible?: boolean
  items?: ReactNode[]
}

const SelectionContainer = ({ title, isVisible, items }: SelectionContainerProps) => {
  const isClient = useIsClient()

  if (!isClient) return null

  return <Container
    alignment={"columnTopLeft"}
    className={clsx(styles.selectionContainer, {
      [styles.selectionContainerInvisible]: !isVisible,
      [styles.selectionContainerVisible]: isVisible
    })}>
    <div className={clsx(styles.divider)} />
    <Container
      className={clsx(styles.selectionItemContainer)}
      alignment={"columnTopLeft"}
      gap={"small"}>
      <Text className={clsx(styles.selectionItemContainerTitle)} typography={"body5"} color={"textDim"}>{title}</Text>
      <Container className={clsx(styles.itemContainer)}
                 alignment={"rowTopLeft"}>
        <Container className={clsx(styles.itemScrollContainer)}
                   alignment={"rowTopLeft"} gap={"large"}>
          <div className={clsx(styles.itemSpacer)} />
          {items?.map((item) => item)}
          <div className={clsx(styles.itemSpacer)} />
        </Container>
      </Container>
    </Container>
  </Container>
}

export default SelectionContainer