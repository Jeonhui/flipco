"use client"

import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube"
import clsx from "clsx"
import React, { Dispatch, useEffect, useState } from "react"
import * as styles from "./styles.css"
import { useIsClient } from "@design-system/hooks"
import PopUpContainer from "../PopUpContainer"

type YoutubePipPlayerProps = {
  videoId?: string | null
  isHidden?: boolean
  onHiddenChange?: (isHidden: boolean) => void
  autoPlay?: boolean
  containerClassName?: string
  setYoutubeElement?: Dispatch<YouTubePlayer | null>
}

const YoutubePipPlayer = ({
                            videoId,
                            autoPlay = false,
                            isHidden,
                            onHiddenChange,
                            containerClassName,
                            setYoutubeElement
                          }: YoutubePipPlayerProps) => {
  const isClient = useIsClient()
  const [isReady, setIsReady] = useState(false)
  const [isChange, setIsChange] = useState(false)


  const onYoutubeReady = (e: YouTubeEvent) => {
    setYoutubeElement?.(e.target)
    setTimeout(() => {
      if (autoPlay) e.target.playVideo()
      setIsReady(true)
    }, 500)
  }

  useEffect(() => {
    if (!videoId) return
    setIsChange(true)
    setTimeout(() => {
      setIsChange(false)
    }, 600)
  }, [videoId])

  if (!isClient) return null

  return <PopUpContainer
    containerClassName={containerClassName}
    isHidden={isHidden}
    onHiddenChange={onHiddenChange}
    isReady={isReady}>
    <YouTube
      className={clsx(styles.youtubeIframeWrapper, {
        [styles.youtubeIframeWrapperInvisible]: !isReady || isChange,
        [styles.youtubeIframeWrapperVisible]: isReady && !isChange
      })}
      videoId={videoId ?? ""}
      onReady={onYoutubeReady}
      opts={{
        width: "100%",
        height: "100%",
        playerVars: {
          controls: 0,
          autoplay: 1,
          rel: 0,
          modestbranding: 1
        }
      }}
    />
  </PopUpContainer>
}

export default YoutubePipPlayer