import React, {
  useRef,
  useState,
  useEffect,
  MouseEventHandler,
  ChangeEvent
} from "react"
import YouTube, { YouTubeEvent } from "react-youtube"
import clsx from "clsx"
import * as styles from "./styles.css" // 스타일 파일 경로 맞게 수정
import { Button, Container } from "@design-system/components"
import { HideIcon, ShowIcon } from "@/assets/icons"
import { useIsClient } from "@design-system/hooks"
import { Property } from "csstype"

type YoutubePlayerProps = {
  containerClassName?: string
  videoId?: string
}

type ResizePosition =
  | "none"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"

const resizePositionToCursor = (position: ResizePosition): Property.Cursor => {
  switch (position) {
    case "topLeft":
    case "bottomRight":
      return "nwse-resize"
    case "topRight":
    case "bottomLeft":
      return "nesw-resize"
    case "left":
    case "right":
      return "ew-resize"
    case "top":
    case "bottom":
      return "ns-resize"
    default:
      return "default"
  }
}

const YoutubePIP = ({ containerClassName, videoId }: YoutubePlayerProps) => {
  const isClient = useIsClient()
  const containerRef = useRef<HTMLDivElement>(null)
  const dragOverlayRef = useRef<HTMLDivElement>(null)

  const [isReady, setIsReady] = useState(false)
  const [isSetup, setIsSetup] = useState(false)

  const [resizingPosition, setResizingPosition] = useState<ResizePosition>("none")
  const [initialRect, setInitialRect] = useState<DOMRect | null>(null)

  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [isHidden, setIsHidden] = useState(false)
  const [lastPosition, setLastPosition] = useState({ x: 100, y: 100 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 320, height: 180 })
  const [opacity, setOpacity] = useState<number>(100)

  const onDraggingMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    const rect = dragOverlayRef.current?.getBoundingClientRect()
    setOffset({
      x: Math.max(0, e.clientX - (rect?.left || 0)),
      y: Math.max(0, e.clientY - (rect?.top || 0))
    })
  }

  const onResizingMouseDown = () => {
    const rect = dragOverlayRef.current?.getBoundingClientRect()
    if (rect) setInitialRect(rect)
    setResizing(true)
  }

  const onResizingMouseMove: MouseEventHandler = (e) => {
    if (resizing) return
    const rect = dragOverlayRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const EDGE = 16

    const nearTop = y < EDGE
    const nearBottom = y > rect.height - EDGE
    const nearLeft = x < EDGE
    const nearRight = x > rect.width - EDGE

    if (nearTop && nearLeft) setResizingPosition("topLeft")
    else if (nearTop && nearRight) setResizingPosition("topRight")
    else if (nearBottom && nearLeft) setResizingPosition("bottomLeft")
    else if (nearBottom && nearRight) setResizingPosition("bottomRight")
    else if (nearTop) setResizingPosition("top")
    else if (nearBottom) setResizingPosition("bottom")
    else if (nearLeft) setResizingPosition("left")
    else if (nearRight) setResizingPosition("right")
    else setResizingPosition("none")
  }

  useEffect(() => {
    if (!isClient || isSetup) return
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return

    const padding = 25.6
    if (containerRect.width <= 480) {
      const width = containerRect.width - padding
      const height = width * 9 / 16
      const top = containerRect.height - (height + padding + 32)
      setSize({ width, height })
      setPosition({ x: 0, y: top })
    } else {
      const top = containerRect.height - (size.height + padding + 32 + 32)
      setPosition({ x: 20, y: top })
    }
    setIsSetup(true)
  }, [isClient, isSetup, size])

  useEffect(() => {
    if (!isClient) return
    const onMouseMove = (e: MouseEvent) => {
      const containerRect = containerRef.current?.getBoundingClientRect()
      if (!containerRect) return

      if (dragging) {
        const offsetX = e.clientX - offset.x - containerRect.left
        const offsetY = e.clientY - offset.y - containerRect.top
        const boxSize = dragOverlayRef.current?.getBoundingClientRect() ?? {
          width: size.width,
          height: size.height + 32
        }
        const boxSizeWithPadding = {
          width: boxSize.width + 12.8,
          height: boxSize.height + 12.8
        }

        const maxX = containerRect.width - boxSizeWithPadding.width
        const maxY = containerRect.height - boxSizeWithPadding.height

        const newX = Math.min(Math.max(0, offsetX), maxX)
        const newY = Math.min(Math.max(0, offsetY), maxY)
        setPosition({ x: newX, y: newY })
      } else if (resizing) {
        const rect = dragOverlayRef.current?.getBoundingClientRect()
        if (!rect) return

        const minWidth = 200
        const minHeight = 100

        let newX = position.x
        let newY = position.y
        let newWidth = size.width
        let newHeight = size.height

        const applyHorizontal = (direction: "left" | "right") => {
          if (direction === "left" && initialRect) {
            const proposedWidth = initialRect.right - e.clientX
            const proposedX = initialRect.right - (proposedWidth + 12.8) - containerRect.left

            const maxWidth = initialRect.right - containerRect.left // ← 오른쪽 고정
            if (proposedWidth >= minWidth && proposedX >= 0 && proposedWidth <= maxWidth) {
              newWidth = proposedWidth
              newX = proposedX
            }
          }

          if (direction === "right") {
            const proposedWidth = e.clientX - rect.left
            const maxWidth = containerRect.width - newX - 25.6
            if (proposedWidth >= minWidth && proposedWidth <= maxWidth) {
              newWidth = proposedWidth
            }
          }
        }

        const applyVertical = (direction: "top" | "bottom") => {
          if (direction === "top" && initialRect) {
            const proposedHeight = initialRect.bottom - e.clientY - 32
            const proposedY = initialRect.bottom - (proposedHeight + 32 + 12.8) - containerRect.top

            const maxHeight = initialRect.bottom - containerRect.top
            if (proposedHeight >= minHeight && proposedY >= 0 && proposedHeight <= maxHeight) {
              newHeight = proposedHeight
              newY = proposedY
            }
          }

          if (direction === "bottom") {
            const proposedHeight = e.clientY - 32 - rect.top
            const maxHeight = containerRect.height - newY - 25.6 - 32
            if (proposedHeight >= minHeight && proposedHeight <= maxHeight) {
              newHeight = proposedHeight
            }
          }
        }


        if (resizingPosition.toLowerCase().includes("left")) applyHorizontal("left")
        if (resizingPosition.toLowerCase().includes("right")) applyHorizontal("right")
        if (resizingPosition.toLowerCase().includes("top")) applyVertical("top")
        if (resizingPosition.toLowerCase().includes("bottom")) applyVertical("bottom")

        setSize({ width: newWidth, height: newHeight })
        setPosition({ x: newX, y: newY })
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
  }, [dragging, resizing, offset, isClient, size, position, resizingPosition, initialRect])

  const onYoutubeReady = (e: YouTubeEvent) => {
    e.target.playVideo()
    setTimeout(() => {
      setIsReady(true)
    }, 500)
  }

  const onHideButtonClick = () => {
    setPosition((prev) => {
      setIsHidden(true)
      setLastPosition(prev)

      const boxSize = dragOverlayRef.current?.getBoundingClientRect() ?? {
        width: size.width,
        height: size.height + 32
      }
      const boxSizeWithPadding = {
        width: boxSize.width + 12.8,
        height: boxSize.height + 12.8
      }
      const containerLeft = containerRef.current?.getBoundingClientRect().left ?? 0
      return {
        x: -(boxSizeWithPadding.width + containerLeft),
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

  if (!isClient) return null

  return (
    <div
      ref={containerRef}
      className={clsx(styles.container, containerClassName)}>
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
          [styles.youtubePlayerContainerHidden]: isHidden,
          [styles.youtubePlayerContainerMoveTransition]: isReady && !dragging && !resizing
        })}
        style={{
          left: position.x,
          top: position.y
        }}
        onMouseMove={onResizingMouseMove}
      >
        <div
          className={clsx(styles.resizingOverlay, {
            [styles.resizing]: resizing
          })}
          style={{
            cursor: resizePositionToCursor(resizingPosition)
          }}
          onMouseDown={onResizingMouseDown}
        />
        <div
          className={clsx(styles.youtubePlayer)}
        >
          <div
            ref={dragOverlayRef}
            className={clsx(styles.dragOverlay, {
              [styles.dragging]: dragging
            })}
            onMouseDown={onDraggingMouseDown}
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
            <YouTube
              className={clsx(styles.youtubeIframeWrapper, {
                [styles.youtubeIframeWrapperInvisible]: !isReady,
                [styles.youtubeIframeWrapperVisible]: isReady
              })}
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
    </div>
  )
}

export default YoutubePIP
