import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useIsClient } from "@design-system/hooks"
import YouTube, { YouTubeEvent } from "react-youtube"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Button, Container, Text } from "@design-system/components"

interface YoutubePlayerProps {
  videoId: string
}

const YoutubePlayer = ({ videoId }: YoutubePlayerProps) => {
  const isClient = useIsClient()

  const dragOverlayRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [isError, setIsError] = useState(false)

  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 560, height: 315 })
  const [opacity, setOpacity] = useState<number>(100)

  const onMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.classList.contains("resize-handle")) {
      setResizing(true)
    } else {
      setDragging(true)
      const rect = dragOverlayRef.current?.getBoundingClientRect()
      setOffset({
        x: Math.max(0, e.clientX - (rect?.left || 0)),
        y: Math.max(0, e.clientY - (rect?.top || 0))
      })
    }
  }

  useEffect(() => {
    if (!isClient) return

    const onMouseMove = (e: MouseEvent) => {
      if (dragging) {
        setPosition({
          x: Math.max(0, e.clientX - offset.x),
          y: Math.max(0, e.clientY - offset.y)
        })
      } else if (resizing) {
        const rect = dragOverlayRef.current?.getBoundingClientRect()
        const newWidth = e.clientX - (rect?.left || 0)
        const newHeight = e.clientY - (rect?.top || 0)
        setSize({
          width: Math.max(200, newWidth),
          height: Math.max(100, newHeight)
        })
      }
    }

    const onMouseUp = () => {
      setDragging(false)
      setResizing(false)
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [dragging, resizing, offset, isClient])

  const onYoutubeReady = (e: YouTubeEvent) => {
    e.target.playVideo()
    setTimeout(() => {
      setIsReady(true)
    }, 500)
  }

  const onYoutubeError = ({}: YouTubeEvent) => {
    setIsError(true)
  }

  const onOpacityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value < 20) {
      return
    }
    setOpacity(value)
  }

  if (!isClient) {
    return null
  }

  return (
    <div
      className={clsx(styles.youtubePlayerContainer)}
      style={{
        left: position.x,
        top: position.y
      }}>
      <div
        className={clsx(styles.youtubePlayer)}
      >
        <div
          ref={dragOverlayRef}
          className={clsx(styles.dragOverlay, {
            [styles.dragging]: dragging
          })}
          onMouseDown={onMouseDown}
        />
        <Container alignment={"rowTopCenter"} className={clsx(styles.statusContainer)}>
          <Button color={"grayText"} size={"xxSmall"}>
            hide
          </Button>
          <div className={clsx(styles.spacer)} />
          <input
            className={clsx(styles.opacitySlider)}
            type="range"
            min={40}
            max={100}
            value={opacity}
            onChange={onOpacityChange}
          />
          {/*<div*/}
          {/*  className={clsx("resize-handle", styles.resizeButton)}*/}
          {/*  onMouseDown={onMouseDown}*/}
          {/*/>*/}
        </Container>
        <div
          className={clsx(styles.youtubeWrapper)}
          style={{
            width: size.width,
            height: size.height,
            opacity: opacity / 100
          }}>
          {isError && <div
            className={clsx(
              styles.youtubeErrorContainer,
              styles.youtubeIframeWrapper, {
                [styles.youtubeIframeWrapperInvisible]: !isError,
                [styles.youtubeIframeWrapperVisible]: isError
              })}>
            <Text typography={"display6_bold"} color={"textDim2"}>
              ERROR
            </Text>
            <Text typography={"header6"} color={"textDim2"}>
              There was a problem fetching the youtube data. 😢
            </Text>
          </div>}
          <YouTube
            className={clsx(styles.youtubeIframeWrapper, {
              [styles.youtubeIframeWrapperInvisible]: !isReady || isError,
              [styles.youtubeIframeWrapperVisible]: isReady && !isError
            })}
            onError={onYoutubeError}
            videoId={videoId ?? "FSa4tVouRIc"}
            onReady={onYoutubeReady}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 1,
                rel: 0,
                modestbranding: 1
              }
            }}
            onEnd={(e) => {
              e.target.stop(0)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default YoutubePlayer
