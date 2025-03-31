"use client"

import React, { useState } from "react"
import {
  Container,
  Layout,
  Section
} from "@design-system/components"
import BackgroundVideoPlayer from "../components/BackgroundVideoPlayer"
import FlipDateClock from "../components/FlipDateClock"
import * as styles from "./styles.css"
import YoutubePipPlayer from "../components/YoutubePipPlayer"
import { Video } from "@/types"
import { YouTubePlayer } from "react-youtube"
import FlipcoController from "../components/FlipcoController"
import { getCookie, setCookie } from "@/hooks/cookie"
import { useIsClient } from "@design-system/hooks"

const templateVideos: { [key in string]: Video } = {
  "beach": {
    src: "/video/beach.mp4",
    name: "beach",
    thumbnail: "/video/thumbnail/beach.png",
    type: "video/mp4"
  },
  "fire": {
    src: "/video/fire.mp4",
    name: "fire",
    thumbnail: "/video/thumbnail/fire.png",
    type: "video/mp4"
  }
}

const defaultYoutubeVideoIdList: string[] = [
  "phRZKH1tQsQ",
  "SJ_AqcH1OUQ"
]

export default function Home() {
  const isClient = useIsClient()
  const [backgroundVideo, setBackgroundVideo] = useState<Video | null>(templateVideos["beach"])
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null)
  const [youtubeVideoHide, setYoutubeVideoHide] = useState<boolean>(false)
  const [youtubeElement, setYoutubeElement] = useState<YouTubePlayer | null>(null)

  const [youtubeVideoIdList, setYoutubeVideoIdList] = useState<string[]>([])

  const onYoutubeHiddenChange = (isHidden: boolean) => {
    if (youtubeVideoHide === isHidden) return
    setYoutubeVideoHide(isHidden)
  }

  const getYoutubeVideoIdListFromCookie = () => {
    if (!isClient) return
    const cookieVideoList = getCookie<string[]>("youtubeVideoIdList") ?? []
    if (cookieVideoList.length === 0) {
      setYoutubeVideoIdList(defaultYoutubeVideoIdList)
      setYoutubeVideoId(defaultYoutubeVideoIdList[0])
      setCookie<string[]>("youtubeVideoIdList", defaultYoutubeVideoIdList, 14)
    } else {
      setYoutubeVideoIdList(cookieVideoList)
      setYoutubeVideoId(cookieVideoList[0])
    }
  }

  const setYoutubeVideoIdListWithCookie = (videoIdList: string[]) => {
    setYoutubeVideoIdList(videoIdList)
    setCookie<string[]>("youtubeVideoIdList", videoIdList, 14)
  }

  const onSetYoutubeVideoId = (videoId: string) => {
    setYoutubeVideoId(videoId)
    setTimeout(() => {
      youtubeElement.loadVideoById(videoId)
    }, 400)
  }

  const onLoad = () => {
    getYoutubeVideoIdListFromCookie()
  }

  return (
    <Layout
      onLoad={onLoad}
      background={
        <BackgroundVideoPlayer video={backgroundVideo} />
      }>
      <Section alignment={"columnTopCenter"} animate={false} fixedHeight>
        <FlipDateClock className={styles.flipDateClock} />
        <YoutubePipPlayer
          videoId={youtubeVideoId}
          isHidden={youtubeVideoHide}
          onHiddenChange={onYoutubeHiddenChange}
          containerClassName={styles.pipPlayerContainer}
          setYoutubeElement={setYoutubeElement}
        />
        <Container className={styles.controlContainer} alignment={"rowCenter"} layout={"fullWidth"}>
          <FlipcoController
            isHidden={youtubeVideoHide}
            onHiddenChange={onYoutubeHiddenChange}
            youtubeElement={youtubeElement}
            currentYoutubeVideoId={youtubeVideoId}
            setYoutubeVideoId={onSetYoutubeVideoId}
            youtubeVideoIdList={youtubeVideoIdList}
            setYoutubeVideoIdList={setYoutubeVideoIdListWithCookie}
            currentVideo={backgroundVideo}
            videos={Object.keys(templateVideos).map(key => templateVideos[key])}
            onVideoSelect={(video) => {
              setBackgroundVideo(video ?? null)
            }}
          />
        </Container>
      </Section>
    </Layout>
  )
}
