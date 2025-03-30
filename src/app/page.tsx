"use client"

import React, { useEffect, useState } from "react"
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

const templateVideos: { [key in string]: Video } = {
  "beach": {
    src: "/video/beach.mp4",
    name: "beach",
    type: "video/mp4"
  },
  "fire": {
    src: "/video/fire.mp4",
    name: "fire",
    type: "video/mp4"
  }
}

export default function Home() {
  const [backgroundVideo, setBackgroundVideo] = useState<Video>(templateVideos["beach"])
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null)
  const [youtubeVideoHide, setYoutubeVideoHide] = useState<boolean>(false)
  const [youtubeElement, setYoutubeElement] = useState<YouTubePlayer | null>(null)


  useEffect(() => {
    setBackgroundVideo(templateVideos["beach"])
  }, [])

  const onYoutubeHiddenChange = (isHidden: boolean) => {
    if (youtubeVideoHide === isHidden) return
    setYoutubeVideoHide(isHidden)
  }

  return (
    <Layout
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
            setYoutubeVideoId={setYoutubeVideoId} />
        </Container>
      </Section>
    </Layout>
  )
}
