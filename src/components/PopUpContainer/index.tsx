import React, {
  useRef,
  useState,
  useEffect,
  MouseEventHandler,
  ReactNode
} from "react"
import clsx from "clsx"
import * as styles from "./styles.css"
import { Button, Container } from "@design-system/components"
import { HideIcon, ShowIcon } from "@/assets/icons"
import { useIsClient } from "@design-system/hooks"
import {
  getResizePosition,
  resizePositionToCursor,
  onResizeContainerMouseMove
} from "./utils/resizing"
import { Position, ResizePosition } from "./utils/types"
import { onDragContainerMouseDown, onDragContainerMouseMove } from "./utils/dragging"
import Slider from "@/components/Slider"

const contentSizeCorrection = {
  top: 32,
  left: 12.8,
  right: 12.8,
  bottom: 12.8
}

type PopUpContainerControlMode = "Default" | "Drag" | "Resize"

type PopUpContainerProps = {
  children?: ReactNode
  isHidden?: boolean
  onHiddenChange?: (isHidden: boolean) => void
  containerClassName?: string
  popupContainerClassName?: string
  isReady?: boolean
}

const PopUpContainer = ({
                          children,
                          isHidden,
                          onHiddenChange,
                          containerClassName,
                          popupContainerClassName,
                          isReady = true
                        }: PopUpContainerProps) => {
  const isClient = useIsClient()
  const containerRef = useRef<HTMLDivElement>(null)
  const dragOverlayRef = useRef<HTMLDivElement>(null)

  const [isSetup, setIsSetup] = useState(false)

  const [resizingPosition, setResizingPosition] = useState<ResizePosition>("none")
  const [initialRect, setInitialRect] = useState<DOMRect | null>(null)

  const [mode, setMode] = useState<PopUpContainerControlMode>("Default")

  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [lastPosition, setLastPosition] = useState({ x: 100, y: 100 })
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 })

  const [isHiddenSelf, setIsHiddenSelf] = useState(isHidden ?? false)
  const [isInnerHidden, setIsInnerHidden] = useState(false)

  const [contentSize, setContentSize] = useState({ width: 320, height: 180 })

  const [opacity, setOpacity] = useState<number>(100)

  const onDragOverlayMouseDown = (e: React.MouseEvent) => {
    const rect = dragOverlayRef.current?.getBoundingClientRect()
    if (rect) setInitialRect(rect)
    setMode("Drag")
    setDragOffset(onDragContainerMouseDown({
      mousePosition: {
        x: e.clientX,
        y: e.clientY
      },
      rect: rect
    }))
  }

  const onResizeOverlayMouseDown = () => {
    if (mode != "Default") return
    const rect = dragOverlayRef.current?.getBoundingClientRect()
    if (rect) setInitialRect(rect)
    setMode("Resize")
  }

  const onPopupContainerMouseMoveForResizeCursor: MouseEventHandler = (e) => {
    if (mode != "Default") return
    const rect = dragOverlayRef.current?.getBoundingClientRect()
    setResizingPosition(getResizePosition({
      rect: rect,
      mousePosition: {
        x: e.clientX,
        y: e.clientY
      },
      edge: 16
    }))
  }

  const setIsHiddenWithInnerButton = (value: boolean) => {
    setIsHiddenSelf(({}) => {
      setIsInnerHidden(true)
      return value
    })
  }

  useEffect(() => {
    if (!isClient || isSetup) return
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return
    const initialLeftSpacing = 20
    const initialBottomSpacing = 64
    const horizontalCorrection = contentSizeCorrection.left + contentSizeCorrection.right
    const verticalCorrection = contentSizeCorrection.top + contentSizeCorrection.bottom
    if (containerRect.width <= 480) {
      const width = containerRect.width - horizontalCorrection
      const height = width * 9 / 16
      const top = containerRect.height - (height + verticalCorrection)
      setContentSize({ width, height })
      setPosition({ x: 0, y: top - initialBottomSpacing })
    } else {
      const top = containerRect.height - (contentSize.height + verticalCorrection)
      setPosition({ x: initialLeftSpacing, y: top - initialBottomSpacing })
    }
    setIsSetup(true)
  }, [isClient, isSetup, contentSize])

  useEffect(() => {
    if (!isClient) return
    const onMouseMove = (e: MouseEvent) => {
      const containerRect = containerRef.current?.getBoundingClientRect()
      if (!containerRect) return

      if (mode == "Drag") {
        const { x, y } = onDragContainerMouseMove({
          containerRect: containerRect,
          rect: initialRect,
          dragOffset: dragOffset,
          mousePosition: {
            x: e.clientX,
            y: e.clientY
          },
          currentPosition: {
            x: position.x,
            y: position.y
          },
          correction: contentSizeCorrection
        })
        setPosition({ x: x, y: y })
      } else if (mode == "Resize") {
        const {
          width,
          height,
          x,
          y
        } = onResizeContainerMouseMove({
          resizePosition: resizingPosition,
          containerRect: containerRect,
          rect: initialRect,
          mousePosition: {
            x: e.clientX,
            y: e.clientY
          },
          currentPosition: {
            x: position.x,
            y: position.y
          },
          currentSize: {
            width: contentSize.width,
            height: contentSize.height
          },
          correction: contentSizeCorrection
        })
        setContentSize({ width: width, height: height })
        setPosition({ x: x, y: y })
      }
    }

    const onMouseUp = () => {
      setMode("Default")
    }
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, dragOffset, isClient, contentSize, position, resizingPosition, initialRect])


  const hide = (withHiddenChange: boolean) => {
    setPosition((prev) => {
      if (withHiddenChange) {
        setIsHiddenWithInnerButton(true)
      }
      setLastPosition(prev)
      const boxSize = dragOverlayRef.current?.getBoundingClientRect() ?? {
        width: contentSize.width,
        height: contentSize.height + 32
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

  const onHideButtonClick = () => {
    hide(true)
  }

  const onShowButtonClick = () => {
    setPosition(lastPosition)
    setIsHiddenWithInnerButton(false)
  }

  useEffect(() => {
    if (!isClient) return
    if (isHidden === undefined || isHidden === isHiddenSelf) return
    if (isInnerHidden) {
      onHiddenChange?.(isHiddenSelf)
      setIsInnerHidden(false)
    } else {
      setIsHiddenSelf(isHidden)
      if (isHidden) {
        hide(false)
      } else {
        setPosition(lastPosition)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, isHidden, isHiddenSelf, isInnerHidden, lastPosition, onHiddenChange])

  const onOpacityChange = (value: number) => {
    setOpacity(value)
  }

  if (!isClient) return null

  return (
    <div
      ref={containerRef}
      className={clsx(styles.mainContainer, containerClassName)}>
      <Button
        className={clsx(
          styles.showButton,
          { [styles.showButtonVisible]: isHiddenSelf }
        )}
        style={{
          top: position.y + ((dragOverlayRef.current?.clientHeight ?? 0) / 2),
          transition: "opacity 0.3s ease"
        }}
        color={"text"}
        size={"none"}
        onClick={onShowButtonClick}
      >
        <ShowIcon preserveAspectRatio={"none"} className={clsx(styles.showButtonIcon)} />
      </Button>
      <div
        className={clsx(popupContainerClassName,
          styles.popupContainer,
          {
            [styles.popupContainerHidden]: isHiddenSelf,
            [styles.popupContainerHiddenMoveTransition]: isReady && mode == "Default"
          })}
        style={{
          left: position.x,
          top: position.y
        }}
        onMouseMove={onPopupContainerMouseMoveForResizeCursor}
      >
        <div
          className={clsx(styles.popupContainerResizeOverlay, {
            [styles.resizing]: mode == "Resize"
          })}
          style={{
            cursor: resizePositionToCursor(resizingPosition)
          }}
          onMouseDown={onResizeOverlayMouseDown}
        />
        <div
          className={clsx(styles.popupContentContainer)}
        >
          <div
            ref={dragOverlayRef}
            className={clsx(styles.popupContainerDrayOverlay, {
              [styles.dragging]: mode == "Drag"
            })}
            onMouseDown={onDragOverlayMouseDown}
          />
          <Container alignment={"rowTopCenter"} className={clsx(styles.statusBarContainer)}>
            <Button color={"grayText"} size={"xxSmall"} onClick={onHideButtonClick}>
              <HideIcon />
            </Button>
            <div className={clsx(styles.spacer)} />
            <Slider min={40}
                    max={100}
                    value={opacity}
                    onChange={onOpacityChange} />
          </Container>
          <div
            className={clsx(styles.contentWrapper)}
            style={{
              width: contentSize.width,
              height: contentSize.height,
              opacity: opacity / 100
            }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopUpContainer
