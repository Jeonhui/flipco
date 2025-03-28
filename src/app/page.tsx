"use client"

import React from "react"
import {
  Container,
  Layout,
  Section,
} from "@design-system/components"
import BackgroundVideoPlayer from "../components/BackgroundVideoPlayer"
import FlipDateClock from "../components/FlipDateClock"
import * as styles from "./styles.css"
import YoutubePlayer from "@/components/YoutubePlayer"

export default function Home() {
  return (
    <Layout
      background={
      <BackgroundVideoPlayer/>
    }>
      <Section alignment={"columnTopCenter"} animate={false}>
          <FlipDateClock className={styles.flipDateClock}/>
        <YoutubePlayer/>
      </Section>
    </Layout>
  )
}
