"use client"

import React, { useEffect, useState } from "react"
import { useIsClient } from "@design-system/hooks"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Video } from "@/types"

type BackgroundVideoPlayerProps = {
  video?: Video | null
}

export default function BackgroundVideoPlayer({
                                                video
                                              }: BackgroundVideoPlayerProps) {
  const isClient = useIsClient()
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null)

  const onLoadedDataHandler = () => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 500)
  }

  useEffect(() => {
    setIsLoaded(false)
    setTimeout(() => {
      setCurrentVideo(video ?? null)
    }, 500)
  }, [video])

  if (!isClient) return null

  return (
    <div className={clsx(styles.videoWrapper)}>
      <video className={clsx(styles.video, {
        [styles.videoInvisible]: !isLoaded,
        [styles.videoVisible]: isLoaded
      })}
             preload="metadata" autoPlay loop muted playsInline
             onLoadedData={onLoadedDataHandler}
             key={currentVideo?.src}
      >
        <source src={currentVideo?.src} type={currentVideo?.type} />
      </video>
      <div className={clsx(styles.videoBottomEffect)} />
    </div>
  )
}
