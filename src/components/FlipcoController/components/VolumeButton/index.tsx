"use client"

import { useIsClient } from "@design-system/hooks"
import React, { useEffect, useState } from "react"
import { Sound30Icon, Sound60Icon, FullSoundIcon, MuteIcon } from "@/assets/icons"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Button } from "@design-system/components"

type VolumeButtonProps = {
  volume?: number
  onVolumeButtonClick?: () => void
}

type VolumeState = "full" | "medium" | "small" | "mute" | "none"

const VolumeButton = ({ volume, onVolumeButtonClick }: VolumeButtonProps) => {
  const isClient = useIsClient()
  const [volumeState, setVolumeState] = useState<VolumeState>("none")

  useEffect(() => {
    if (!isClient) return
    if (volume === undefined) return
    if (volume > 60) setVolumeState("full")
    else if (60 >= volume && volume > 30) setVolumeState("medium")
    else if (30 >= volume && volume > 0) setVolumeState("small")
    else setVolumeState("mute")
  }, [isClient, volume])

  if (!isClient) return null

  return <div>
    {volume !== undefined && <Button
      color={"grayText"}
      size={"none"}
      className={clsx(styles.volumeButton, styles.nestingIconButton)}
      onClick={onVolumeButtonClick}
    >
      <Sound30Icon
        className={clsx({
          [styles.iconInvisible]: volumeState !== "small",
          [styles.iconVisible]: volumeState === "small"
        })} />
      <Sound60Icon
        className={clsx({
          [styles.iconInvisible]: volumeState !== "medium",
          [styles.iconVisible]: volumeState === "medium"
        })} />
      <FullSoundIcon
        className={clsx({
          [styles.iconInvisible]: volumeState !== "full",
          [styles.iconVisible]: volumeState === "full"
        })} />
      <MuteIcon
        className={clsx({
          [styles.iconInvisible]: volumeState !== "mute",
          [styles.iconVisible]: volumeState === "mute"
        })} />
    </Button>
    }
  </div>
}

export default VolumeButton