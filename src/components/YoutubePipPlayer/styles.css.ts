import { globalStyle, style } from "@vanilla-extract/css"
import { theme } from "@design-system/theme/theme.css"

export const youtubeIframeWrapper = style({
  position: "absolute",
  display: "flex",
  width: "100%",
  height: "100%",
  borderRadius: theme.spaces.small,
  overflow: "hidden",
  zIndex: `calc(${theme.zIndices.overlay} + 1)`,
  transition: "opacity 0.8s ease"
})

export const youtubeIframeWrapperInvisible = style({
  opacity: 0
})

export const youtubeIframeWrapperVisible = style({
  opacity: 1
})

globalStyle(`${youtubeIframeWrapper} > *`, {
  zIndex: `calc(${theme.zIndices.overlay} + 1)`
})