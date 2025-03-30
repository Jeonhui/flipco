"use client"

import { useIsClient } from "@design-system/hooks"
import React from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Button, Container } from "@design-system/components"
import { Video } from "@/types"
import Image from "next/image"
import { PauseIcon, PlayIcon } from "@/assets/icons"

type VideoListItemProps = {
  video: Video
  isPlaying?: boolean
  onClick?: (video?: Video) => void
}

const VideoListItem = ({ video, isPlaying, onClick }: VideoListItemProps) => {
  const isClient = useIsClient()

  if (!isClient) return null

  return <Container
    alignment={"columnTopLeft"}
    className={clsx(styles.videoItemContainer)}>
    {video.thumbnail ? <Image width={100} height={100} className={clsx(styles.videoItemThumbnail)} src={video.thumbnail}
                              alt={video.name} />
      : <Image width={100} height={100} className={clsx(styles.videoItemThumbnail)} src={"/video/default.png"}
               alt={video.name} />
    }

    <div className={clsx(styles.videoThumbnailOverlay)} />

    <Button color={"grayText"}
            size={"xxSmall"}
            className={clsx(styles.videoItemPlayButton, styles.nestingIconButton)}
            onClick={() => {
              if (isPlaying) {
                onClick?.(undefined)
              } else {
                onClick?.(video)
              }
            }}
    >
      <PauseIcon className={clsx({
        [styles.iconInvisible]: !isPlaying,
        [styles.iconVisible]: isPlaying
      })} />
      <PlayIcon className={clsx({
        [styles.iconInvisible]: isPlaying,
        [styles.iconVisible]: !isPlaying
      })} />
    </Button>

    <Container
      className={clsx(styles.videoItemBottomEffect)}
      alignment={"rowBottomLeft"}
    />
  </Container>
}

export default VideoListItem