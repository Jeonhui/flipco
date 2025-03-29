"use client"

import YouTube, { YouTubeEvent } from "react-youtube"
import clsx from "clsx"
import React, { useState } from "react"
import * as styles from "./styles.css"
import { useIsClient } from "@design-system/hooks"
import PopUpContainer from "@/components/PopupContainer"

type YoutubePlayerProps = {
  videoId?: string
  containerClassName?: string
}

const YoutubePlayer = ({ videoId, containerClassName }: YoutubePlayerProps) => {
  const isClient = useIsClient()
  const [isReady, setIsReady] = useState(false)

  const onYoutubeReady = (e: YouTubeEvent) => {
    e.target.playVideo()
    setTimeout(() => {
      setIsReady(true)
    }, 500)
  }

  if (!isClient) return null

  return <PopUpContainer
    containerClassName={containerClassName}
    isReady={isReady}>
    <YouTube
      className={clsx(styles.youtubeIframeWrapper, {
        [styles.youtubeIframeWrapperInvisible]: !isReady,
        [styles.youtubeIframeWrapperVisible]: isReady
      })}
      videoId={videoId ?? "HfaIcB4Ogxk"}
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
      onEnd={(e) => {
        e.target.stop(0)
      }}
    />
  </PopUpContainer>
}

export default YoutubePlayer