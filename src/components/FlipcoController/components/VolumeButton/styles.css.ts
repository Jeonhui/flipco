import { globalStyle, style } from "@vanilla-extract/css"
import { theme } from "@design-system/theme/theme.css"

export const volumeButton = style({
  transition: "opacity 0.3s ease",
  borderRadius: theme.spaces.xSmall,
  padding: theme.spaces.xSmall
})

globalStyle(`${volumeButton} svg`, {
  width: "1.6rem",
  height: "1.6rem",
})

export const nestingIconButton = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})

globalStyle(`${nestingIconButton} > *:not(:nth-child(1))`, {
  position: "absolute"
})

export const iconInvisible = style({
  opacity: 0,
  zIndex: 0
})

export const iconVisible = style({
  opacity: 1
})
