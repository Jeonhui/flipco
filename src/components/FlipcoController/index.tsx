"use client"

import { Button, Container, Text } from "@design-system/components"
import { YouTubePlayer } from "react-youtube"
import { useIsClient } from "@design-system/hooks"
import React, { useEffect, useState } from "react"
import { FoldPlayListIcon, HideIcon, PlayListIcon, ShowIcon, VideoListIcon, FoldVideoListIcon } from "@/assets/icons"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import Slider from "@/components/Slider"
import Volume from "./components/VolumeButton"
import { YoutubeAction, YoutubePlayerState } from "./types"
import YoutubeControl from "./components/YoutubeControl"
import { Video } from "@/types"
import VideoSelection from "@/components/FlipcoController/components/VideoSelection"
import YoutubeSelection from "@/components/FlipcoController/components/YoutubeSelection"

const youtubePlayerStateMap: { [key in string]: YoutubePlayerState } = {
  "-1": "unstarted",
  "0": "ended",
  "1": "playing",
  "2": "paused",
  "3": "buffering",
  "5": "videoCued"
}

type FlipcoControllerProps = {
  containerClassName?: string
  youtubeElement?: YouTubePlayer
  currentYoutubeVideoId?: string | null
  youtubeVideoIdList?: string[]
  setYoutubeVideoId?: (videoId: string) => void
  setYoutubeVideoIdList?: (videoIdList: string[]) => void
  isHidden?: boolean
  onHiddenChange?: (isHidden: boolean) => void
  currentVideo?: Video | null
  videos?: Video[]
  onVideoSelect?: (video?: Video | null) => void
}

const FlipcoController = ({
                            containerClassName,
                            youtubeElement,
                            currentYoutubeVideoId,
                            youtubeVideoIdList,
                            setYoutubeVideoId,
                            setYoutubeVideoIdList,
                            isHidden,
                            onHiddenChange,
                            currentVideo,
                            videos,
                            onVideoSelect
                          }: FlipcoControllerProps) => {
  const isClient = useIsClient()
  const [youtubeState, setYoutubeState] = useState<YoutubePlayerState>("unstarted")
  const [title, setTitle] = useState<string>("")
  const [volume, setVolume] = useState<number>(100)
  const [lastVolume, setLastVolume] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [endTime, setEndTime] = useState<number>(0)
  const [showYoutubeList, setShowYoutubeList] = useState(false)
  const [showBackgroundVideos, setShowBackgroundVideos] = useState(false)

  const clearYoutubeInfo = () => {
    setTitle("")
    setEndTime(0)
  }

  const moveYoutubeVideo = (videoId: string) => {
    if (setYoutubeVideoId) {
      clearYoutubeInfo()
      setYoutubeVideoId(videoId)
    }
  }

  const onYoutubeAction = (action: YoutubeAction) => {
    if (!youtubeElement) return
    switch (action) {
      case "play":
        setYoutubeState("playing")
        youtubeElement.playVideo()
        break
      case "pause":
        setYoutubeState("paused")
        youtubeElement.pauseVideo()
        break
      case "next":
        if (youtubeVideoIdList
          && currentYoutubeVideoId) {
          const currentVideoIndex = youtubeVideoIdList.indexOf(currentYoutubeVideoId)
          moveYoutubeVideo(youtubeVideoIdList[currentVideoIndex < youtubeVideoIdList.length - 1 ? currentVideoIndex + 1 : 0])
        }
        break
      case "prev":
        if (youtubeVideoIdList
          && currentYoutubeVideoId) {
          const currentVideoIndex = youtubeVideoIdList.indexOf(currentYoutubeVideoId)
          moveYoutubeVideo(youtubeVideoIdList[currentVideoIndex > 0 ? currentVideoIndex - 1 : youtubeVideoIdList.length - 1])
        }
        break
      case "mute":
        setVolume((prev) => {
          youtubeElement.mute()
          setLastVolume(prev)
          return 0
        })
        break
      case "unmute":
        setVolume(({}) => {
          youtubeElement.unMute()
          return lastVolume
        })
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
    onYoutubeAction("prev")
  }

  const onNextHandler = () => {
    onYoutubeAction("next")
  }

  const togglePlaylist = () => {
    setShowYoutubeList(!showYoutubeList)
  }

  const toggleBackgroundVideos = () => {
    setShowBackgroundVideos(!showBackgroundVideos)
  }

  const onVolumeButtonClickHandler = () => {
    if (volume === 0) {
      onYoutubeAction("unmute")
    } else {
      onYoutubeAction("mute")
    }
  }

  const getTimeString = (seconds: number, addHour: boolean): string => {
    const hours = Math.floor(seconds / 3600)
    const min = Math.floor((seconds - (hours * 3600)) / 60)
    const hoursString = hours.toString().padStart(2, "0")
    const minString = min.toString().padStart(2, "0")
    const secondsString = Math.floor(seconds % 60).toString().padStart(2, "0")
    if (!addHour && hours == 0) {
      return `${minString}:${secondsString}`
    }
    return `${hoursString}:${minString}:${secondsString}`
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      if (youtubeElement && youtubeElement.getCurrentTime() >= 0) {
        setVolume(youtubeElement.getVolume())
        setTitle(youtubeElement.videoTitle)
        setEndTime(youtubeElement.getDuration())
        setTime(youtubeElement.getCurrentTime())

        const stateNumber = youtubeElement.playerInfo.playerState
        setYoutubeState(youtubePlayerStateMap[stateNumber.toString()])
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [youtubeElement])

  useEffect(() => {
    if (!isClient || !youtubeElement) return
    if (youtubeElement.getVolume() === volume) return
    youtubeElement.setVolume(volume)
  }, [youtubeElement, volume, isClient])

  const onYoutubeSelectionOnPlay = (youtubeVideoId: string) => {
    if (currentYoutubeVideoId === youtubeVideoId) {
      onYoutubeAction("play")
    } else {
      if (!setYoutubeVideoId) return
      clearYoutubeInfo()
      setYoutubeVideoId(youtubeVideoId)
    }
  }

  const onYoutubeSelectionOnPause = (youtubeVideoId: string) => {
    if (currentYoutubeVideoId === youtubeVideoId) {
      onYoutubeAction("pause")
    }
  }

  const onYoutubeSelectionOnAdd = (youtubeVideoId: string) => {
    if (!isClient) return
    if (!youtubeVideoIdList) return
    if (youtubeVideoIdList.includes(youtubeVideoId)) return
    if (setYoutubeVideoIdList) {
      setYoutubeVideoIdList([...youtubeVideoIdList, youtubeVideoId])
    }
  }

  const onYoutubeSelectionOnDelete = (youtubeVideoId: string) => {
    if (currentYoutubeVideoId === youtubeVideoId) {
      onYoutubeAction("next")
      setYoutubeVideoIdList?.(youtubeVideoIdList?.filter((id) => id !== youtubeVideoId) ?? [])
    } else {
      setYoutubeVideoIdList?.(youtubeVideoIdList?.filter((id) => id !== youtubeVideoId) ?? [])
    }
  }

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
      gap={"small"}
    >
      <Container
        alignment={"columnTopLeft"}
        className={clsx(styles.mainControlPanel)}
        layout={"fullWidth"}
        gap={"small"}
      >
        <Text
          isLoading={title.length == 0}
          className={clsx(styles.mainControlPanelTitle)}
          lineClamp={1}
          typography={"body2"}>{title}</Text>

        <Container className={clsx(styles.timeContainer)}
                   alignment={"rowCenterLeft"}
                   layout={"fullWidth"}
                   gap={"xSmall"}
        >
          <Text typography={"body5"} color={"textDim"} minWidth={"2rem"} isLoading={endTime == 0}>
            {getTimeString(time, endTime >= 3600)}
          </Text>
          <Text typography={"body6"} color={"textDim2"}>
            /
          </Text>
          <Text typography={"body5"} color={"textDim"} minWidth={"3.2rem"} isLoading={endTime == 0}>
            {getTimeString(endTime, false)}
          </Text>
        </Container>
        <YoutubeControl
          className={styles.youtubeControls}
          youtubeState={youtubeState}
          onPlay={onPlayHandler}
          onPause={onPauseHandler}
          onNext={onNextHandler}
          onPrev={onPrevHandler}
          isMoveable={(youtubeVideoIdList?.length ?? 0) > 1}
        />
      </Container>
      <Container className={clsx(styles.itemContainer)}
                 alignment={"rowCenterLeft"}
                 layout={"fullWidth"}
                 gap={"medium"}>
        <Container className={clsx(styles.volumeControl)}
                   alignment={"rowCenterLeft"}
                   gap={"xSmall"}>
          <Volume volume={volume} onVolumeButtonClick={onVolumeButtonClickHandler} />
          <Slider
            className={clsx(styles.volumeSlider)}
            min={0}
            max={100}
            value={volume}
            onChange={setVolume} />
        </Container>
        <Container
          alignment={"rowCenterLeft"}
          gap={"small"}>
          <Button color={"grayText"}
                  size={"none"}
                  className={clsx(styles.controlItemLargeButton, styles.nestingIconButton)}
                  onClick={togglePlaylist}
          >
            <PlayListIcon className={clsx({
              [styles.iconInvisible]: showYoutubeList,
              [styles.iconVisible]: !showYoutubeList
            })} />
            <FoldPlayListIcon className={clsx({
              [styles.iconInvisible]: !showYoutubeList,
              [styles.iconVisible]: showYoutubeList
            })} />
          </Button>
          <Button color={"grayText"}
                  size={"none"}
                  className={clsx(styles.controlItemLargeButton, styles.nestingIconButton)}
                  onClick={toggleBackgroundVideos}
          >
            <VideoListIcon className={clsx({
              [styles.iconInvisible]: showBackgroundVideos,
              [styles.iconVisible]: !showBackgroundVideos
            })} />
            <FoldVideoListIcon className={clsx({
              [styles.iconInvisible]: !showBackgroundVideos,
              [styles.iconVisible]: showBackgroundVideos
            })} />
          </Button>
        </Container>
      </Container>
      <YoutubeSelection
        currentYoutubeVideoId={currentYoutubeVideoId}
        youtubeState={youtubeState}
        youtubeVideoIdList={youtubeVideoIdList}
        onYoutubeVideoPlay={onYoutubeSelectionOnPlay}
        onYoutubeVideoPause={onYoutubeSelectionOnPause}
        onYoutubeVideoAdd={onYoutubeSelectionOnAdd}
        onYoutubeVideoDelete={onYoutubeSelectionOnDelete}
        isVisible={showYoutubeList}
      />
      <VideoSelection
        videos={videos}
        isVisible={showBackgroundVideos}
        currentVideo={currentVideo}
        onVideoSelect={onVideoSelect} />
      <div className={clsx(styles.divider)} />
      <Container className={clsx(styles.itemContainer)} alignment={"rowCenterLeft"} layout={"fullWidth"}>
        <Button color={"grayText"}
                size={"none"}
                className={clsx(styles.controlItemButton, styles.nestingIconButton)}
                onClick={() => onHiddenChange?.(!isHidden)}
        >
          <HideIcon className={clsx({
            [styles.iconInvisible]: isHidden,
            [styles.iconVisible]: !isHidden
          })} />
          <ShowIcon className={clsx({
            [styles.iconInvisible]: !isHidden,
            [styles.iconVisible]: isHidden
          })} />
        </Button>
      </Container>
    </Container>
    <YoutubeControl youtubeState={youtubeState}
                    onPlay={onPlayHandler}
                    onPause={onPauseHandler}
                    onNext={onNextHandler}
                    onPrev={onPrevHandler}
                    isMoveable={(youtubeVideoIdList?.length ?? 0) > 1}
    />
  </Container>
}

export default FlipcoController