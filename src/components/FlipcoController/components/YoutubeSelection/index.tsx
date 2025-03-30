import SelectionContainer from "@/components/FlipcoController/components/SelectionContainer"
import React from "react"
import { Video } from "@/types"
import VideoListItem from "./Youtubeitem"

type VideoSelectionProps = {
  currentVideo?: Video | null
  videos?: Video[]
  onVideoSelect?: (video?: Video) => void
  isVisible?: boolean
}

const VideoSelection = ({ currentVideo, isVisible, videos, onVideoSelect }: VideoSelectionProps) => {
  return <SelectionContainer title={"background video"}
                             isVisible={isVisible} items={
    videos?.map((video, index) =>
      <VideoListItem key={index} video={video} isPlaying={currentVideo?.name == video?.name} onClick={onVideoSelect} />
    )} />
}

export default VideoSelection