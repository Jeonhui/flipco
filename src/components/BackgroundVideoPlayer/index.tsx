"use client"

import React from "react"
import { useIsClient } from "@design-system/hooks"
import { clsx } from "clsx"
import * as styles from "./styles.css"

export default function BackgroundVideoPlayer() {
  const isClient = useIsClient()

  if (!isClient) {
    return null
  }

  return (
    <div className={clsx(styles.videoWrapper)}>
      <video className={clsx(styles.video)}
             preload="metadata" autoPlay loop muted playsInline>
        <source src="/video/beach.mp4" type="video/mp4" />
      </video>
      <div className={clsx(styles.videoBottomEffect)}/>
    </div>
  )
}
