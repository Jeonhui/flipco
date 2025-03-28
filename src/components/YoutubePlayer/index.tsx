import { ChangeEvent, MouseEventHandler, useEffect, useRef, useState } from "react"
import { useIsClient } from "@design-system/hooks"
import YouTube, { YouTubeEvent } from "react-youtube"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { Button, Container } from "@design-system/components"
import { HideIcon, ShowIcon } from "@/assets/icons"
import { Property } from "csstype"

type YoutubePlayerProps = {
  videoId?: string
}

type ResizePosition =
  "topLeft"
  | "top"
  | "topRight"
  | "right"
  | "bottomRight"
  | "bottom"
  | "bottomLeft"
  | "left"
  | "none"

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

const YoutubePlayer = ({ videoId }: YoutubePlayerProps) => {
  const isClient = useIsClient()

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

  // MARK: - Dragging Event Handlers
  const onDraggingMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    const rect = dragOverlayRef.current?.getBoundingClientRect()
    setOffset({
      x: Math.max(0, e.clientX - (rect?.left || 0)),
      y: Math.max(0, e.clientY - (rect?.top || 0))
    })
  }

  // MARK: - Resizing Event Handlers
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

    if (nearTop) setResizingPosition("top")
    if (nearBottom) setResizingPosition("bottom")
    if (nearLeft) setResizingPosition("left")
    if (nearRight) setResizingPosition("right")
    if (nearTop && nearLeft) setResizingPosition("topLeft")
    if (nearTop && nearRight) setResizingPosition("topRight")
    if (nearBottom && nearLeft) setResizingPosition("bottomLeft")
    if (nearBottom && nearRight) setResizingPosition("bottomRight")
  }

  useEffect(() => {
    if (!isClient || isSetup) return
    if (window.innerWidth <= 480) {
      const width = window.innerWidth - 25.6
      const height = width * 9 / 16
      const top = window.innerHeight - (height + 25.6 + 32)
      setSize({ width: width, height: height })
      setPosition({ x: 0, y: top })
    } else {
      const top = window.innerHeight - (size.height + 25.6 + 32)
      setPosition({ x: 20, y: top })
    }
    setIsSetup(true)
  }, [isClient, isSetup, size])

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
        if (!rect) return

        const minWidth = 200
        const minHeight = 100

        let newX = position.x
        let newY = position.y
        let newWidth = size.width
        let newHeight = size.height

        const applyHorizontal = (direction: "left" | "right") => {
          if (direction === "left") {
            if (initialRect) {
              newWidth = initialRect.right - e.clientX
              newX = initialRect.right - (newWidth + 12.8)
            }
          } else {
            newWidth = e.clientX - rect.left
          }
        }

        const applyVertical = (direction: "top" | "bottom") => {
          if (direction === "top") {
            if (initialRect) {
              newHeight = initialRect.bottom - e.clientY - 32
              newY = initialRect.bottom - (newHeight + 32 + 12.8)
            }
          } else {
            newHeight = e.clientY - 32 - rect.top
          }
        }

        if (resizingPosition.toLowerCase().includes("left")) applyHorizontal("left")
        if (resizingPosition.toLowerCase().includes("right")) applyHorizontal("right")
        if (resizingPosition.toLowerCase().includes("top")) applyVertical("top")
        if (resizingPosition.toLowerCase().includes("bottom")) applyVertical("bottom")
        const maxWidth = window.innerWidth - newX - 25.6
        const maxHeight = window.innerHeight - newY - 25.6 - 32
        const maxX = window.innerWidth - newWidth - 25.6
        const maxY = window.innerHeight - newHeight - 32 - 25.6

        if (minWidth > newWidth || newWidth > maxWidth) {
          return
        }
        if (minHeight > newHeight || newHeight > maxHeight) {
          return
        }
        if (newX < 0 || newX > maxX) {
          return
        }
        if (newY < 0 || newY > maxY) {
          return
        }
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
  }, [dragging, resizing, offset, isClient, size, position.x, position.y, resizingPosition, initialRect])

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
      return {
        x: -(boxSizeWithPadding.width),
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
    </>
  )
}

export default YoutubePlayer
