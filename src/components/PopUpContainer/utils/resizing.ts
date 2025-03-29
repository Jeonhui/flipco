"use client"

import { Property } from "csstype"
import { MousePosition, RectCorrection, ResizePosition } from "./types"

export type GetResizePositionProps = {
  rect?: DOMRect
  mousePosition: MousePosition
  edge?: number
}

const getResizePosition = ({
                             rect,
                             mousePosition,
                             edge = 16
                           }: GetResizePositionProps): ResizePosition => {
  if (!rect) return "none"
  const x = mousePosition.x - rect.left
  const y = mousePosition.y - rect.top

  const nearTop = y < edge
  const nearBottom = y > rect.height - edge
  const nearLeft = x < edge
  const nearRight = x > rect.width - edge

  if (nearTop && nearLeft) return "topLeft"
  else if (nearTop && nearRight) return "topRight"
  else if (nearBottom && nearLeft) return "bottomLeft"
  else if (nearBottom && nearRight) return "bottomRight"
  else if (nearTop) return "top"
  else if (nearBottom) return "bottom"
  else if (nearLeft) return "left"
  else if (nearRight) return "right"
  else return "none"
}

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

type OnResizeContainerMouseMoveProps = {
  resizePosition: ResizePosition
  containerRect?: DOMRect | null
  rect?: DOMRect | null
  mousePosition: MousePosition
  currentPosition: { x: number; y: number }
  currentSize: { width: number; height: number }
  minWidth?: number
  minHeight?: number
  correction?: RectCorrection
}

const onResizeContainerMouseMove = ({
                                      resizePosition,
                                      containerRect,
                                      rect,
                                      mousePosition,
                                      currentPosition,
                                      currentSize,
                                      minWidth = 160,
                                      minHeight = 90,
                                      correction = {
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0
                                      }
                                    }: OnResizeContainerMouseMoveProps) => {
  let newX = currentPosition.x
  let newY = currentPosition.y
  let newWidth = currentSize.width
  let newHeight = currentSize.height

  if (!containerRect || !rect) return {
    width: newWidth,
    height: newHeight,
    x: newX,
    y: newY
  }

  const verticalCorrection = (correction.top + correction.bottom)
  const horizontalCorrection = (correction.left + correction.right)

  const applyHorizontal = (direction: "left" | "right") => {
    if (direction === "left") {
      const proposedWidth = rect.right - mousePosition.x - horizontalCorrection
      const proposedX = rect.right - containerRect.left - (proposedWidth + horizontalCorrection)
      const maxWidth = containerRect.width - (containerRect.right - rect.right) - horizontalCorrection
      if (proposedWidth >= minWidth && proposedX >= 0 && proposedWidth <= maxWidth) {
        newWidth = proposedWidth
        newX = proposedX
      }
    }
    if (direction === "right") {
      const proposedWidth = mousePosition.x - rect.left - horizontalCorrection
      const maxWidth = containerRect.width - horizontalCorrection - newX
      if (proposedWidth >= minWidth && proposedWidth <= maxWidth) {
        newWidth = proposedWidth
      }
    }
  }

  const applyVertical = (direction: "top" | "bottom") => {
    if (direction === "top") {
      const proposedHeight = rect.bottom - mousePosition.y - verticalCorrection
      const proposedY = rect.bottom - containerRect.top - (proposedHeight + verticalCorrection)
      const maxHeight = containerRect.height - (containerRect.bottom - rect.bottom) - verticalCorrection
      if (proposedHeight >= minHeight && proposedY >= 0 && proposedHeight <= maxHeight) {
        newHeight = proposedHeight
        newY = proposedY
      }
    }

    if (direction === "bottom") {
      const proposedHeight = mousePosition.y - rect.top - verticalCorrection
      const maxHeight = containerRect.height - verticalCorrection - newY
      if (proposedHeight >= minHeight && proposedHeight <= maxHeight) {
        newHeight = proposedHeight
      }
    }
  }

  if (resizePosition.toLowerCase().includes("left")) applyHorizontal("left")
  if (resizePosition.toLowerCase().includes("right")) applyHorizontal("right")
  if (resizePosition.toLowerCase().includes("top")) applyVertical("top")
  if (resizePosition.toLowerCase().includes("bottom")) applyVertical("bottom")

  return {
    width: newWidth,
    height: newHeight,
    x: newX,
    y: newY
  }
}

export { getResizePosition, resizePositionToCursor, onResizeContainerMouseMove }