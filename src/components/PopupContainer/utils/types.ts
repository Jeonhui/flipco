export type ResizePosition =
  | "none"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"

export type Position = {
  x: number
  y: number
}

export type MousePosition = Position

export type ContentSize = {
  width: number
  height: number
}

export type RectCorrection = {
  top: number
  left: number
  right: number
  bottom: number
}
