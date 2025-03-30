"use client"

import { useIsClient } from "@design-system/hooks"
import React from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Container, Text } from "@design-system/components"

type SelectionContainerProps = {
  title?: string
  isVisible?: boolean
}

const SelectionContainer = ({ title, isVisible }: SelectionContainerProps) => {
  const isClient = useIsClient()

  if (!isClient) return null

  return <Container
    alignment={"columnTopLeft"}
    className={clsx(styles.selectionContainer, {
      [styles.selectionContainerInvisible]: !isVisible,
      [styles.selectionContainerVisible]: isVisible
    })}>
    <div className={clsx(styles.divider)} />
    <Text className={clsx(styles.selectionContainerTitle)} typography={"body5"} color={"textDim"}>{title}</Text>
    <Container className={clsx(styles.itemContainer)}
               alignment={"rowTopCenter"}>
      <div> xxxx</div>
      <div> xxxx</div>
      <div> xxxx</div>
      <div> xxxx</div>
      <div> xxxx</div>
      <div> xxxx</div>
      <div> xxxx</div>
      <div> xxxx</div>
      <div> xxxx</div>
      <div> xxxx</div>
      <div> xxxx</div>


    </Container>


  </Container>
}

export default SelectionContainer