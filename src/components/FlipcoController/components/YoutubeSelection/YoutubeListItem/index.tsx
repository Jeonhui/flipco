"use client"

import { useIsClient } from "@design-system/hooks"
import React, { useState } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Button, Container } from "@design-system/components"
import Image from "next/image"
import { CloseIcon, PauseIcon, PlayIcon } from "@/assets/icons"

type YoutubeListItemProps = {
  youtubeVideoId: string
  isPlaying?: boolean
  canDelete?: boolean
  onPlay?: (youtubeVideoId: string) => void
  onPause?: (youtubeVideoId: string) => void
  onDelete?: (youtubeVideoId: string) => void
}

const YoutubeListItem = ({ youtubeVideoId, isPlaying, onPlay, onPause, onDelete, canDelete }: YoutubeListItemProps) => {
  const isClient = useIsClient()
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false)

  if (!isClient) return null

  return <Container
    alignment={"columnTopLeft"}
    className={clsx(styles.videoItemContainer)}>
    <Image width={100} height={100} className={clsx(styles.videoItemThumbnail, {
      [styles.videoItemThumbnailVisible]: isThumbnailLoaded,
      [styles.videoItemThumbnailInvisible]: !isThumbnailLoaded
    })}
           onLoadingComplete={() => setIsThumbnailLoaded(true)}
           src={`https://img.youtube.com/vi/${youtubeVideoId}/0.jpg`}
           alt={youtubeVideoId} />

    <div className={clsx(styles.videoThumbnailOverlay)} />

    <Button color={"grayText"}
            size={"xxSmall"}
            className={clsx(styles.videoItemPlayButton, styles.nestingIconButton)}
            onClick={() => {
              if (isPlaying) {
                onPause?.(youtubeVideoId)
              } else {
                onPlay?.(youtubeVideoId)
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

    <Button color={"grayText"}
            size={"none"}
            className={clsx(styles.videoItemDeleteButton, styles.nestingIconButton)}
            disabled={!canDelete}
            onClick={() => onDelete?.(youtubeVideoId)}
    >
      <CloseIcon />
    </Button>

    <Container
      className={clsx(styles.videoItemBottomEffect)}
      alignment={"rowBottomLeft"}
    />
  </Container>
}

export default YoutubeListItem