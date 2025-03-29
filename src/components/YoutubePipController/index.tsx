"use client"

import { Button, Container } from "@design-system/components"
import { YouTubePlayer } from "react-youtube"
import { useIsClient } from "@design-system/hooks"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { HideIcon, NextIcon, PauseIcon, PlayIcon, PrevIcon, ShowIcon } from "@/assets/icons"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import Slider from "@/components/Slider"

type YoutubePlayerState = "unstarted" | "ended" | "playing" | "paused" | "buffering" | "videoCued"

const youtubePlayerStateMap: { [key in string]: YoutubePlayerState } = {
  "-1": "unstarted",
  "0": "ended",
  "1": "playing",
  "2": "paused",
  "3": "buffering",
  "5": "videoCued"
}

type YoutubePipControllerProps = {
  containerClassName?: string
  youtubeElement?: YouTubePlayer
  setYoutubeVideoId: Dispatch<SetStateAction<string | null>>
  isHidden?: boolean
  onHiddenChange?: (isHidden: boolean) => void
}

type YoutubeAction = "play" | "pause" | "next" | "previous"

const YoutubePipController = ({
                                containerClassName,
                                youtubeElement,
                                isHidden,
                                onHiddenChange
                              }: YoutubePipControllerProps) => {
  const isClient = useIsClient()
  const [youtubeState, setYoutubeState] = useState<YoutubePlayerState>("unstarted")
  const [volume, setVolume] = useState<number>(100)

  const onYoutubeAction = (action: YoutubeAction) => {
    switch (action) {
      case "play":
        setYoutubeState("playing")
        youtubeElement?.playVideo()
        break
      case "pause":
        setYoutubeState("paused")
        youtubeElement?.pauseVideo()
        break
      case "next":
        youtubeElement?.nextVideo()
        break
      case "previous":
        youtubeElement?.previousVideo()
        break
    }
  }

  const onPlayHandler = () => {
    onYoutubeAction("play")
  }

  const onPauseHandler = () => {
    onYoutubeAction("pause")
  }

  const onPrevHandler = () => {
    onYoutubeAction("next")
  }

  const onNextHandler = () => {
    onYoutubeAction("next")
  }

  useEffect(() => {

    const interval = setInterval(async () => {
      if (youtubeElement && youtubeElement.getCurrentTime() > 0) {
        setVolume(youtubeElement.getVolume())
        // const elapsed_seconds = youtubeElement.getCurrentTime()
        // const elapsed_milliseconds = Math.floor(elapsed_seconds * 1000)
        // const ms = elapsed_milliseconds % 1000
        // const min = Math.floor(elapsed_milliseconds / 60000)
        // const seconds = Math.floor((elapsed_milliseconds - min * 60000) / 1000)
        // const formattedCurrentTime =
        //   min.toString().padStart(2, "0") +
        //   ":" +
        //   seconds.toString().padStart(2, "0") +
        //   ":" +
        //   ms.toString().padStart(3, "0")
        const stateNumber = youtubeElement.playerInfo.playerState
        setYoutubeState(youtubePlayerStateMap[stateNumber.toString()])
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [youtubeElement])

  useEffect(() => {
    if (!youtubeElement) return
    if (youtubeElement.getVolume() === volume) return
    youtubeElement.setVolume(volume)
  }, [youtubeElement, volume])

  if (!isClient) return null

  return <Container
    className={clsx(containerClassName,
      styles.controlContainer)}
    alignment={"rowCenter"}
    gap={"medium"}
  >
    <Container
      alignment={"columnTopLeft"}
      className={clsx(styles.controlPanel)}
    >
      <Container alignment={"rowCenterLeft"}>
        <Slider
          min={0}
          max={100}
          value={volume}
          onChange={setVolume} />
      </Container>
      <Container alignment={"rowCenterLeft"}>
        <div className={clsx(styles.nestingButtonWrapper)}>
          <Button color={"grayText"}
                  size={"xxSmall"}
                  onClick={() => onHiddenChange?.(true)}
                  className={clsx({
                    [styles.buttonInvisible]: isHidden,
                    [styles.buttonVisible]: !isHidden
                  })}>
            <HideIcon />
          </Button>
          <Button color={"grayText"}
                  size={"xxSmall"}
                  onClick={() => onHiddenChange?.(false)}
                  className={clsx({
                    [styles.buttonInvisible]: !isHidden,
                    [styles.buttonVisible]: isHidden
                  })}>
            <ShowIcon />
          </Button>
        </div>
      </Container>
    </Container>
    <Button
      className={clsx(styles.controlButton)}
      color={"grayText"}
      size={"none"}
      disabled
      onClick={onPrevHandler}
    >
      <PrevIcon />
    </Button>
    <div className={clsx(styles.nestingButtonWrapper)}>
      <Button
        color={"grayText"}
        size={"none"}
        className={clsx(styles.controlButton,
          {
            [styles.buttonInvisible]: youtubeState !== "playing",
            [styles.buttonVisible]: youtubeState === "playing"
          }
        )}
        onClick={onPauseHandler}
      >
        <PauseIcon />
      </Button>
      <Button
        onClick={onPlayHandler}
        color={"grayText"}
        size={"none"}
        className={clsx(styles.controlButton,
          {
            [styles.buttonInvisible]: youtubeState === "playing",
            [styles.buttonVisible]: youtubeState !== "playing"
          })}
      >
        <PlayIcon />
      </Button>
    </div>

    <Button
      color={"grayText"}
      size={"none"}
      className={clsx(styles.controlButton)}
      onClick={onNextHandler}
    >
      <NextIcon />
    </Button>

  </Container>
}

export default YoutubePipController