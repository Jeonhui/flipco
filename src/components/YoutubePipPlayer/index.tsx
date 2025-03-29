"use client"

import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube"
import clsx from "clsx"
import React, { Dispatch, useState } from "react"
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

  const onYoutubeReady = (e: YouTubeEvent) => {
    setYoutubeElement?.(e.target)
    setTimeout(() => {
      if (autoPlay) e.target.playVideo()
      setIsReady(true)
    }, 500)
  }

  if (!isClient) return null

  return <PopUpContainer
    containerClassName={containerClassName}
    isHidden={isHidden}
    onHiddenChange={onHiddenChange}
    isReady={isReady}>
    <YouTube
      className={clsx(styles.youtubeIframeWrapper, {
        [styles.youtubeIframeWrapperInvisible]: !isReady,
        [styles.youtubeIframeWrapperVisible]: isReady
      })}
      videoId={videoId ?? "o-CoIJ2lmHc"}
      onReady={onYoutubeReady}
      opts={{
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1
        }

      }}
    />
  </PopUpContainer>
}

export default YoutubePipPlayer