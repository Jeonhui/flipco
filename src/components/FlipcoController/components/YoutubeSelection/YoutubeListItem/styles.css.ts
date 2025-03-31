import { globalStyle, style } from "@vanilla-extract/css"
import { Color } from "@design-system/theme/themes/colors/colorSetVars.css"
import { theme } from "@design-system/theme/theme.css"

const withAlpha = (color: Color, alpha: number): string => {
  return `rgb(from ${color} r g b / ${alpha})`
}

export const videoItemContainer = style({
  position: "relative",
  width: "10.5rem",
  height: "6.75rem",
  scrollSnapAlign: "center",
  borderRadius: theme.spaces.small,
  overflow: "hidden",
  opacity: 1,
  "@media": {
    "screen and (max-width: 480px)": {
      width: "60svw"
    }
  }
})


export const videoItemThumbnail = style({
  transition: "opacity 0.3s ease",
  width: "100%",
  height: "100%",
  objectFit: "cover"
})

export const videoItemThumbnailInvisible = style({
  opacity: 0
})

export const videoItemThumbnailVisible = style({
  opacity: 1
})

export const videoItemBottomEffect = style({
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "50%",
  padding: `${theme.spaces.small} ${theme.spaces.small}`,
  background: `linear-gradient(to top, ${theme.colors.background}, ${withAlpha(theme.colors.background, 0)})`
})

export const videoThumbnailOverlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: theme.colors.background,
  opacity: 0.2
})

export const videoItemPlayButton = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  transition: "opacity 0.3s ease",
  borderRadius: theme.spaces.xSmall,
  padding: theme.spaces.xSmall,
  zIndex: theme.zIndices.overlay
})

globalStyle(`${videoItemPlayButton} svg`, {
  width: "2rem",
  height: "2rem"
})

export const nestingIconButton = style({
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

export const videoItemDeleteButton = style({
  position: "absolute",
  top: "0.2rem",
  right: "0.2rem",
  transition: "opacity 0.3s ease",
  borderRadius: theme.spaces.xSmall,
  padding: theme.spaces.xSmall,
  zIndex: theme.zIndices.overlay
})

globalStyle(`${videoItemPlayButton} svg`, {
  width: "2rem",
  height: "2rem"
})