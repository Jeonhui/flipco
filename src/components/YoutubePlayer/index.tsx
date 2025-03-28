import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useIsClient } from "@design-system/hooks"
import YouTube, { YouTubeEvent } from "react-youtube"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Button, Container, Text } from "@design-system/components"
import { HideIcon, ShowIcon } from "@/assets/icons"

interface YoutubePlayerProps {
  videoId?: string
}

const YoutubePlayer = ({ videoId }: YoutubePlayerProps) => {
  const isClient = useIsClient()

  const dragOverlayRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [isError, setIsError] = useState(false)

  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [isHidden, setIsHidden] = useState(false)
  const [lastPosition, setLastPosition] = useState({ x: 100, y: 100 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 320, height: 180 })
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
        const offsetX = e.clientX - offset.x
        const offsetY = e.clientY - offset.y
        const boxSize = dragOverlayRef.current?.getBoundingClientRect() ?? {
          width: size.width,
          height: size.height + 32
        }
        const boxSizeWithPadding = {
          width: boxSize.width + 12.8,
          height: boxSize.height + 12.8
        }
        const maxX = window.innerWidth - boxSizeWithPadding.width
        const maxY = window.innerHeight - boxSizeWithPadding.height

        const newX = Math.min(Math.max(0, offsetX), maxX)
        const newY = Math.min(Math.max(0, offsetY), maxY)
        setPosition({
          x: newX,
          y: newY
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

  // MARK: - control
  const onHideButtonClick = () => {
    setPosition((prev) => {
      setIsHidden(true)
      setLastPosition(prev)
      return {
        x: -(dragOverlayRef.current?.clientWidth ?? 300),
        y: prev.y
      }
    })
  }

  const onShowButtonClick = () => {
    setPosition(lastPosition)
    setIsHidden(false)
  }

  const onOpacityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOpacity(Number(e.target.value))
  }

  if (!isClient) {
    return null
  }

  return (
    <>
      <Button
        className={clsx(
          styles.showButton,
          isHidden && styles.showButtonVisible // 스타일 조건부로
        )}
        style={{
          top: position.y + ((dragOverlayRef.current?.clientHeight ?? 0) / 2),
          opacity: isHidden ? 0.6 : 0,
          pointerEvents: isHidden ? "auto" : "none",
          transition: "opacity 0.3s ease"
        }}
        color={"grayText"}
        size={"xxSmall"}
        onClick={onShowButtonClick}
      >
        <ShowIcon preserveAspectRatio={"none"} className={clsx(styles.showButtonIcon)} />
      </Button>
      <div
        className={clsx(styles.youtubePlayerContainer, {
          [styles.youtubePlayerContainerMoveTransition]: !dragging
        })}
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
            <Button color={"grayText"} size={"xxSmall"} onClick={onHideButtonClick}>
              <HideIcon />
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
    </>
  )
}

export default YoutubePlayer
