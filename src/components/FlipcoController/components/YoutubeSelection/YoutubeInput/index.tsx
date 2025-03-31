"use client"

import { useIsClient } from "@design-system/hooks"
import React, { ChangeEvent, KeyboardEventHandler } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Button, Container } from "@design-system/components"
import { PlusIcon } from "@/assets/icons"

type YoutubeInputProps = {
  value?: string
  onChange?: (value: string) => void
  onSendButtonClick?: () => void
  isValid?: boolean
}

const YoutubeInput = ({
                        value,
                        onChange,
                        onSendButtonClick,
                        isValid
                      }: YoutubeInputProps) => {
  const ref = React.createRef<HTMLInputElement>()
  const isClient = useIsClient()

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Enter" && isValid) {
      onSendButtonClick?.()
    }
  }

  const onContainerClick = () => {
    if (!ref) return
    ref.current?.focus()
  }

  if (!isClient) return null

  return <Container
    alignment={"rowCenterLeft"}
    className={clsx(styles.youtubeInputContainer)}
    gap={"small"}
    onClick={onContainerClick}
  >
    <input
      ref={ref}
      value={value}
      onChange={onChangeHandler}
      placeholder={"Enter Youtube URL"}
      className={clsx(styles.youtubeInput)}
      onKeyDown={handleKeyDown}
    />
    <Button
      size={"xxSmall"}
      color={"grayText"}
      onClick={() => onSendButtonClick?.()}
      disabled={!isValid}
    >
      <PlusIcon />
    </Button>
  </Container>
}

export default YoutubeInput