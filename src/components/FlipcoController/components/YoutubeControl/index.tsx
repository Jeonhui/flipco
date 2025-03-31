"use client"

import { useIsClient } from "@design-system/hooks"
import React from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Button, Container } from "@design-system/components"
import { YoutubePlayerState } from "../../types"
import { NextIcon, PauseIcon, PlayIcon, PrevIcon } from "@/assets/icons"

type YoutubeControlProps = {
  className?: string
  youtubeState: YoutubePlayerState
  onPlay?: () => void
  onPause?: () => void
  onNext?: () => void
  onPrev?: () => void
  isMoveable?: boolean
}

const YoutubeControl = ({ className, youtubeState, onPlay, onPause, onNext, onPrev, isMoveable }: YoutubeControlProps) => {
  const isClient = useIsClient()

  if (!isClient) return null

  return <Container className={className} alignment={"rowCenter"} gap={"medium"}>
    <Button
      className={clsx(styles.controlButton)}
      color={"grayText"}
      size={"none"}
      onClick={onPrev}
      disabled={!isMoveable}
    >
      <PrevIcon />
    </Button>
    <Button color={"grayText"}
            size={"xxSmall"}
            className={clsx(styles.controlButton, styles.nestingIconButton)}
            onClick={() => {
              if (youtubeState === "playing") {
                onPause?.()
              } else {
                onPlay?.()
              }
            }}
    >
      <PauseIcon className={clsx({
        [styles.iconInvisible]: youtubeState !== "playing",
        [styles.iconVisible]: youtubeState === "playing"
      })} />
      <PlayIcon className={clsx({
        [styles.iconInvisible]: youtubeState === "playing",
        [styles.iconVisible]: youtubeState !== "playing"
      })} />
    </Button>
    <Button
      color={"grayText"}
      size={"none"}
      className={clsx(styles.controlButton)}
      onClick={onNext}
      disabled={!isMoveable}
    >
      <NextIcon />
    </Button>
  </Container>
}

export default YoutubeControl