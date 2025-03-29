import { MousePosition, Position, RectCorrection } from "./types"

type OnDragContainerMouseDownProps = {
  mousePosition: MousePosition
  rect?: DOMRect
}

const onDragContainerMouseDown = ({
                                    mousePosition,
                                    rect
                                  }: OnDragContainerMouseDownProps): Position => {
  return {
    x: Math.max(0, mousePosition.x - (rect?.left ?? 0)),
    y: Math.max(0, mousePosition.y - (rect?.top ?? 0))
  }
}

type OnDragContainerMouseMoveProps = {
  containerRect?: DOMRect | null
  rect?: DOMRect | null
  mousePosition: MousePosition
  dragOffset: MousePosition
  currentPosition: Position
  correction?: RectCorrection
}

const onDragContainerMouseMove = ({
                                    containerRect,
                                    rect,
                                    mousePosition,
                                    dragOffset,
                                    currentPosition,
                                    correction = {
                                      top: 0,
                                      left: 0,
                                      right: 0,
                                      bottom: 0
                                    }
                                  }: OnDragContainerMouseMoveProps): Position => {
  if (!containerRect || !rect) return currentPosition

  const offsetX = mousePosition.x - dragOffset.x - containerRect.left
  const offsetY = mousePosition.y - dragOffset.y - containerRect.top

  const verticalCorrection = (correction.top + correction.bottom)
  const horizontalCorrection = (correction.left + correction.right)

  const maxX = containerRect.width - (rect.width + horizontalCorrection)
  const maxY = containerRect.height - (rect.height + verticalCorrection)

  const newX = Math.min(Math.max(0, offsetX), maxX)
  const newY = Math.min(Math.max(0, offsetY), maxY)

  return {
    x: newX,
    y: newY
  }
}

export { onDragContainerMouseDown, onDragContainerMouseMove }