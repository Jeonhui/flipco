"use client"

import SelectionContainer from "@/components/FlipcoController/components/SelectionContainer"
import React from "react"
import YoutubeListItem from "./YoutubeListItem"
import { YoutubePlayerState } from "@/components/FlipcoController/types"
import YoutubeInput from "@/components/FlipcoController/components/YoutubeSelection/YoutubeInput"
import { useIsClient } from "@design-system/hooks"

type YoutubeSelectionProps = {
  currentYoutubeVideoId?: string | null
  youtubeState?: YoutubePlayerState
  youtubeVideoIdList?: string[]
  onYoutubeVideoPlay?: (youtubeVideoId: string) => void
  onYoutubeVideoPause?: (youtubeVideoId: string) => void
  onYoutubeVideoAdd?: (youtubeVideoId: string) => void
  onYoutubeVideoDelete?: (youtubeVideoId: string) => void
  isVisible?: boolean
}

const YoutubeSelection = ({
                            currentYoutubeVideoId,
                            youtubeState,
                            isVisible,
                            youtubeVideoIdList,
                            onYoutubeVideoPlay,
                            onYoutubeVideoPause,
                            onYoutubeVideoAdd,
                            onYoutubeVideoDelete
                          }: YoutubeSelectionProps) => {
  const isClient = useIsClient()
  const [url, setUrl] = React.useState<string>("")

  const getVideoId = (): string | null => {
    if (!url.startsWith("https://www.youtube.com/watch?v=")) return null
    let videoId = url.replace("https://www.youtube.com/watch?v=", "")
    const idx = videoId.indexOf("&")
    if (idx !== -1) videoId = videoId.slice(0, idx)
    if (videoId.length == 0) return null
    return videoId
  }

  const onSend = () => {
    if (!isClient) return
    if (!isValid()) return
    const videoId = getVideoId()
    setUrl("")
    if (videoId === null) return
    onYoutubeVideoAdd?.(videoId)
  }

  const isValid = (): boolean => {
    return getVideoId() !== null
  }

  if (!isClient) return null


  return <SelectionContainer title={"Youtube"}
                             isVisible={isVisible}
                             bottomItem={<YoutubeInput value={url} onChange={setUrl} onSendButtonClick={onSend}
                                                       isValid={isValid()} />}
                             items={
                               youtubeVideoIdList?.map((youtubeVideoId, index) =>
                                 <YoutubeListItem key={index}
                                                  youtubeVideoId={youtubeVideoId}
                                                  isPlaying={currentYoutubeVideoId == youtubeVideoId && youtubeState == "playing"}
                                                  onPlay={onYoutubeVideoPlay}
                                                  onPause={onYoutubeVideoPause}
                                                  onDelete={onYoutubeVideoDelete}
                                                  canDelete={(youtubeVideoIdList?.length ?? 0) > 1}
                                 />
                               )}
  />
}

export default YoutubeSelection